import { INodeProperties } from 'n8n-workflow';
import { OPERATION } from '../constants/operations';
import { RESOURCE } from '../constants/resource';

export const contactResource = {
	name: 'Contact',
	value: RESOURCE.CONTACT,
	description: 'Manage contacts in KrispCall',
};

export const contactOptions = [
	{
		name: 'Create',
		value: OPERATION.CREATE,
		description: 'Create a new contact in KrispCall',
		action: 'Create a contact',
	},
	{
		name: 'Delete',
		value: OPERATION.DELETE,
		description: 'Delete contacts in KrispCall',
		action: 'Delete contacts',
	},
	{
		name: 'Get Voicemail',
		value: OPERATION.GET_VOICEMAIL,
		description: 'Retrieve voicemails from KrispCall',
		action: 'Get many voicemails',
	},
];

export const contactOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [RESOURCE.CONTACT],
			},
		},
		options: contactOptions,
		default: 'create',
		noDataExpression: true,
	},
];

export const contactFields: INodeProperties[] = [
	{
		displayName: 'Phone Number',
		name: 'number',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: [OPERATION.CREATE],
				resource: [RESOURCE.CONTACT],
			},
		},
		default: '',
		placeholder: 'e.g. +1234567890',
		description:
			'The phone number of the contact to create. Must include country code (e.g., +1 for USA).',
	},
	{
		displayName: 'Phone Numbers',
		name: 'numbers',
		type: 'fixedCollection',
		displayOptions: {
			show: {
				resource: [RESOURCE.CONTACT],
				operation: [OPERATION.DELETE],
			},
		},
		placeholder: 'Add Phone Numbers',
		description:
			'The phone numbers of the contact to create. Must include country code (e.g., +1 for USA).',
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				displayName: 'Phone Number',
				name: 'contactGroup',
				values: [
					{
						displayName: 'Phone Number',
						name: RESOURCE.CONTACT,
						type: 'string',
						default: '',
						placeholder: 'eg: +1234567890',
						description: 'Individual Phone number',
					},
				],
			},
		],
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				operation: [OPERATION.CREATE],
				resource: [RESOURCE.CONTACT],
			},
		},
		default: '',
		placeholder: 'e.g. Kapil Bhandari',
		description: 'The name of the contact to create',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		displayOptions: {
			show: {
				operation: [OPERATION.CREATE],
				resource: [RESOURCE.CONTACT],
			},
		},
		default: '',
		placeholder: 'e.g. kapil@example.com',
		description: 'The email address of the contact to create',
	},
	{
		displayName: 'Company',
		name: 'company',
		type: 'string',

		displayOptions: {
			show: {
				operation: [OPERATION.CREATE],
				resource: [RESOURCE.CONTACT],
			},
		},
		default: '',
		placeholder: 'e.g. KrispCall',
		description: 'The company of the contact',
	},
	{
		displayName: 'Address',
		name: 'address',
		type: 'string',

		displayOptions: {
			show: {
				operation: [OPERATION.CREATE],
				resource: [RESOURCE.CONTACT],
			},
		},
		default: '',
		placeholder: 'e.g Pokhara, Nepal',
		description: 'The address of the contact',
	},
];
