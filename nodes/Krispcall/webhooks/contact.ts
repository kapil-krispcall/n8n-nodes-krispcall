export async function handleContactCreateWebhook(body: any) {
	return {
		event: 'contact.created',
		contact: {
			name: body.name,
			email: body.email,
			contact: body.contact,
			company: body.company,
			address: body.address,
		},
	};
}
