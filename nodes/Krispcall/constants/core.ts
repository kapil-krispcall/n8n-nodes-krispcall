// export const API_BASE_URL = 'https://app.krispcall.com/api/v3/platform/n8n';
export const API_BASE_URL = 'https://dev.safefamilyapp.com/api/v3/platform/n8n';

export const WEBHOOK = {
	// URL: 'https://app.krispcall.com',
	CREATE: '/subscribe',
	DELETE: '/unsubscribe',
	ACTION: {
		NEW_SMS_OR_MMS: 'new_sms_or_mms',
	},
};

export const CORE = {
	NAME: 'krispcall',
	DISPLAY_NAME: 'KrispCall',
	DESCRIPTION: 'Interact with KrispCall API to manage contacts.',

	CREDENTIALS: {
		NAME: 'krispcallApi',
		DISPLAY_NAME: 'KrispCall API',
	},
};
