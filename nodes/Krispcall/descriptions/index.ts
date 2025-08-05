import { INodeProperties } from 'n8n-workflow';
import { contactFields, contactOperations, contactResource } from './ContactDescription';
import { webhookOperations, webhookFields } from './webhookDescription';
import { smsFields, smsOperations, smsResource } from './SmsDescription';

export const resource: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		options: [contactResource, smsResource],
		default: '',
		noDataExpression: true,
		required: true,
	},
];

export const operations: INodeProperties[] = [
	...contactOperations,
	...webhookOperations,
	...smsOperations,
];

export const fields: INodeProperties[] = [...contactFields, ...webhookFields, ...smsFields];
