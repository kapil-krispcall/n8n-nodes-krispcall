import {
	IWebhookFunctions,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	IWebhookResponseData,
	IHookFunctions,
} from 'n8n-workflow';
import { webhookOperations, webhookFields } from './descriptions/webhookDescription';
import { createWebhook, deleteWebhook } from './webhooks/handler';
import { RESOURCE } from './constants/resource';

export class KrispcallTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Krispcall Trigger',
		name: 'krispcallTrigger',
		icon: 'file:Krispcall.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		description: 'Triggers workflow on KrispCall webhook events',
		defaults: {
			name: 'Krispcall Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'krispcallApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'krispcall',
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{ name: 'Webhook', value: RESOURCE.WEBHOOK, description: 'Manage webhooks in KrispCall' },
				],
				default: 'webhook',
				noDataExpression: true,
				required: true,
			},
			...webhookOperations,
			...webhookFields,
		],
	};
	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const body = this.getBodyData();
		return {
			workflowData: [this.helpers.returnJsonArray(body)],
		};
	}

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				return false;
			},

			async create(this: IHookFunctions): Promise<boolean> {
				// const eventType = this.getNodeParameter('eventType', 0) as string;
				const operation = this.getNodeParameter('operation', 0) as string;
				const response = await createWebhook.call(this, operation);

				const staticData = this.getWorkflowStaticData('node');
				staticData.webhookId = response.id;

				return true;
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const staticData = this.getWorkflowStaticData('node');

				if (!staticData.webhookId) {
					return true;
				}

				const webhookId = staticData.webhookId;

				await deleteWebhook.call(this, String(webhookId));

				// Always clean up static data
				delete staticData.webhookId;

				return true;
			},
		},
	};
}
