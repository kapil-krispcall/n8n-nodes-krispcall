import { INodeProperties } from 'n8n-workflow';
import { Action, webhookEventOptions } from '../webhooks/events';
import { RESOURCE } from '../constants/resource';

export const webhookResource: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		options: [
			{
				name: 'Webhook',
				value: RESOURCE.WEBHOOK,
				description: 'Manage webhooks in KrispCall',
			},
		],
		default: 'webhook',
		noDataExpression: true,
		required: true,
	},
];

export const webhookOptions = [
	{
		name: 'New Contact',
		value: Action.NEW_CONTACT,
		description: 'Triggers when a new contact is added in your Workspace',
		action: Action.NEW_CONTACT,
	},
	{
		name: 'New SMS_MMS',
		value: Action.NEW_SMS_OR_MMS,
		description: 'Triggers when a new SMS or MMS is received in your Workspace',
		action: Action.NEW_SMS_OR_MMS,
	},
	{
		name: 'New Voicemail',
		value: Action.NEW_VOICEMAIL,
		description: 'Triggers when a new voicemail is received in your Workspace',
		action: Action.NEW_VOICEMAIL,
	},
	{
		name: 'Call Event',
		value: Action.NEW_CALL_LOG,
		description: 'Triggers when a new call related activity is created in your Workspace',
		action: Action.NEW_CALL_LOG,
	},
	{
		name: 'New SMS/MMS Sent',
		value: Action.OUTBOUND_SMS_OR_MMS,
		description: 'Triggers when a new SMS or MMS is sent from your Workspace',
		action: Action.OUTBOUND_SMS_OR_MMS,
	},
];

export const webhookOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [RESOURCE.WEBHOOK],
			},
		},
		options: webhookOptions,
		default: 'new_contact',
		noDataExpression: true,
	},
];

export const webhookFields: INodeProperties[] = [
	// 	{
	// 		displayName: 'Event Type',
	// 		name: 'eventType',
	// 		type: 'string',
	// 		default: 'new_contact',
	// 		required: true,
	// 		displayOptions: {
	// 			show: {
	// 				resource: [RESOURCE.WEBHOOK],
	// 				operation: [
	// 					'new_contact',
	// 					'new_sms_or_mms',
	// 					'new_voicemail',
	// 					'new_call_log',
	// 					'incoming_call',
	// 					'outbound_sms_or_mms',
	// 				],
	// 			},
	// 		},
	// 		description: 'The type of event for which the webhook will be triggered',
	// 	},
];

export const webhookProperties: INodeProperties[] = [
	{
		displayName: 'Event Type',
		name: 'eventType',
		type: 'options',
		default: '',
		options: webhookEventOptions,
		required: true,
		description: 'Type of KrispCall event to trigger on',
	},
];
