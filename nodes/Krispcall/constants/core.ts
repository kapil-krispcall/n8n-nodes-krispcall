
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
