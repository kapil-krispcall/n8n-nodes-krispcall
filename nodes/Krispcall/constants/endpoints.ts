export const ENDPOINTS = {
	// Authentication
	ME: '/me',

	// Contact operations
	ADD_CONTACT: '/add-contact',
	GET_CONTACTS: '/get-contacts',
	DELETE_CONTACT: '/delete-contacts',
	GET_VOICEMAIL: '/get-voicemails',
	GET_NUMBERS: '/get-numbers',

	// SMS operations
	GET_SMS: '/get-sms-mms',
	SEND_SMS: '/send-sms',
	SEND_MMS: '/send-mms',
} as const;

export const PROPERTIES = {
	RESOURCE: 'resource',
	OPERATION: 'operation',
} as const;
