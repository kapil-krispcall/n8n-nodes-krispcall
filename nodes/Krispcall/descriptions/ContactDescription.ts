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
		name: 'Get Many',
		value: OPERATION.GET_ALL,
		description: 'Retrieve many contacts from KrispCall',
		action: 'Get many contacts',
	},
	{
		name: 'Delete',
		value: OPERATION.DELETE,
		description: 'Delete a contact in KrispCall',
		action: 'Delete a contact',
	},
	{
		name: 'Get Voicemail',
		value: OPERATION.GET_VOICEMAIL,
		description: 'Retrieve a contact from KrispCall',
		action: 'Get a contact',
	},
	{
		name: 'Get Numbers',
		value: OPERATION.GET_NUMBERS,
		description: 'Retrieve numbers associated with a contact in KrispCall',
		action: 'Get numbers for a contact',
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
		default: 'getAll',
		noDataExpression: true,
	},
];

export const contactFields: INodeProperties[] = [
	{
		displayName: 'Phone Number',
		name: 'number', // Changed name to camelCase for consistency
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
			'The phone number of the contact to create. Must include country code (e.g., +1 for USA).', // Added more detail to placeholder/description
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
		placeholder: 'e.g. John Doe',
		description:
			'The name of the contact to create. Optional but recommended for better identification.',
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
		placeholder: 'e.g. john.doe@example.com',
		description:
			'The email address of the contact to create. Optional but recommended for better identification.',
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
		placeholder: 'e.g. Acme Corp',
		description: 'The company of the contact (optional)',
	},
];
