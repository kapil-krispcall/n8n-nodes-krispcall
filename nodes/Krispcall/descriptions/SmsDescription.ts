import { INodeProperties } from 'n8n-workflow';
import { OPERATION } from '../constants/operations';
import { RESOURCE } from '../constants/resource';

export const smsResource = {
	name: RESOURCE.SMS,
	value: RESOURCE.SMS,
	description: 'Manage SMS in KrispCall',
};

export const smsOptions = [
	{
		name: 'Send SMS',
		value: OPERATION.SEND,
		description: 'Send an SMS in KrispCall',
		action: 'Send an SMS',
	},
	{
		name: 'Send MMS',
		value: OPERATION.SEND_MMS,
		description: 'Send an MMS in KrispCall',
		action: 'Send an MMS',
	},
	{
		name: 'Get Many',
		value: OPERATION.GET_ALL,
		description: 'Retrieve an SMS in KrispCall',
		action: 'Get an SMS',
	},
];

export const smsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [RESOURCE.SMS],
			},
		},

		options: smsOptions,
		default: 'getAll',
		noDataExpression: true,
	},
];

export const smsFields: INodeProperties[] = [
	{
		displayName: 'From Number Name or ID',
		name: 'fromNumber',
		type: 'options',
		default: '',
		required: true,
		placeholder: 'Select the sender phone number',
		description:
			'The phone number from which the SMS or MMS will be sent. Choose from the list of available numbers. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		typeOptions: {
			loadOptionsMethod: 'getFromNumbers',
		},
		displayOptions: {
			show: {
				operation: [OPERATION.SEND, OPERATION.SEND_MMS],
				resource: [RESOURCE.SMS],
			},
		},
	},
	{
		displayName: 'To Number',
		name: 'toNumber',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'Enter the recipient phone number',
		description: 'The phone number to which the SMS or MMS will be sent',
		displayOptions: {
			show: {
				operation: [OPERATION.SEND, OPERATION.SEND_MMS],
				resource: [RESOURCE.SMS],
			},
		},
	},
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'Enter the message content here',
		description: 'The content of the SMS or MMS message',
		displayOptions: {
			show: {
				operation: [OPERATION.SEND, OPERATION.SEND_MMS],
				resource: [RESOURCE.SMS],
			},
		},
	},
	{
		displayName: 'Medias URL',
		name: 'medias',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		placeholder: 'https://example.com/image.jpg',
		description: 'Publicly accessible URL of the image to send with the MMS message',
		displayOptions: {
			show: {
				operation: ['mms'],
				resource: [RESOURCE.SMS],
			},
		},
		options: [
			{
				displayName: 'Media',
				name: 'media',
				values: [
					{
						displayName: 'Media URL',
						name: 'url',
						type: 'string',
						default: '',
						placeholder: 'https://example.com/image.jpg',
						description:
							'Publicly accessible URL of the image to send with the MMS message. Must be a valid URL.',
					},
				],
			},
		],
	},
];
