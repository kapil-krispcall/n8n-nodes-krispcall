export enum Action {
	NEW_CONTACT = 'new_contact',
	NEW_VOICEMAIL = 'new_voicemail',
	NEW_SMS_OR_MMS = 'new_sms_or_mms',
	NEW_CALL_LOG = 'new_call_log',
	OUTBOUND_SMS_OR_MMS = 'outbound_sms_or_mms',
}
export const webhookEventOptions = [
	{ name: 'New Contact', value: Action.NEW_CONTACT },
	{ name: 'New Voicemail', value: Action.NEW_VOICEMAIL },
	{ name: 'New SMS or MMS', value: Action.NEW_SMS_OR_MMS },
	// { name: 'New Call Log', value: Action.NEW_CALL_LOG },
	// { name: 'Outbound SMS or MMS', value: Action.OUTBOUND_SMS_OR_MMS },
];
