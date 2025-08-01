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
		description: 'New contact created in KrispCall',
		action: Action.NEW_CONTACT,
	},
	{
		name: 'New SMS or MMS',
		value: Action.NEW_SMS_OR_MMS,
		description: 'New SMS or MMS received in KrispCall',
		action: Action.NEW_SMS_OR_MMS,
	},
	{
		name: 'New Voicemail',
		value: Action.NEW_VOICEMAIL,
		description: 'New voicemail received in KrispCall',
		action: Action.NEW_VOICEMAIL,
	},
	{
		name: 'New Call Log',
		value: Action.NEW_CALL_LOG,
		description: 'New call log entry created in KrispCall',
		action: Action.NEW_CALL_LOG,
	},
	{
		name: 'Incoming Call',
		value: Action.INCOMING_CALL,
		description: 'Incoming call event in KrispCall',
		action: Action.INCOMING_CALL,
	},
	{
		name: 'Outbound SMS or MMS',
		value: Action.OUTBOUND_SMS_OR_MMS,
		description: 'Outbound SMS or MMS sent from KrispCall',
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
