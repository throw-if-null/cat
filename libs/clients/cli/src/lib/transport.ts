const URL = "https://d6d03ebf-d5bc-46cf-ab03-69205269a55e.mock.pstmn.io/configuration/";

export async function getConfiguration(configurationId: string): Promise<any> {
	const response = await fetch(`${ URL }/${ configurationId }`);
	return response.json();
}
