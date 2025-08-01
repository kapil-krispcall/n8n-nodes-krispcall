// export const API_BASE_URL = 'https://app.krispcall.com/api/v3/platform/n8n';
// export const API_BASE_URL = 'https://dev.safefamilyapp.com/api/v3/platform/n8n';
export const API_BASE_URL = 'https://cuddly-similarly-raptor.ngrok-free.app/api/v3/platform/n8n';

export const WEBHOOK = {
	CREATE: '/subscribe',
	DELETE: '/unsubscribe',
} as const;

export const CORE = {
	NAME: 'krispcall',
	DISPLAY_NAME: 'KrispCall',
	DESCRIPTION: 'Interact with KrispCall API to manage contacts.',

	CREDENTIALS: {
		NAME: 'krispcallApi',
		DISPLAY_NAME: 'KrispCall API',
	},
} as const;
