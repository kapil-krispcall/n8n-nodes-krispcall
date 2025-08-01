import { IExecuteFunctions } from 'n8n-workflow';
import { makeApiRequest } from '../utils/apiRequest';
import { WEBHOOK } from '../constants/core';

export async function createWebhook(this: IExecuteFunctions, itemIndex: number): Promise<any> {
	const eventType = this.getNodeParameter('eventType', itemIndex) as string;

	// Prepare the request body
	const body = {
		hookUrl: WEBHOOK.URL,
		action: eventType,
	};

	// Make the API request to create the webhook
	const response = await makeApiRequest.call(this, {
		method: 'POST',
		endpoint: WEBHOOK.CREATE,
		body,
	});

	return response;
}
