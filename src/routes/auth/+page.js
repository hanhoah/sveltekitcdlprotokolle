import { getSession } from '$lib/functions/auth.ts';

export async function load({ session }) {
    // Initialisiere die Session vor dem Rendern der Komponente
    const sessiondata = await getSession();
    console.log('server session: ', sessiondata);
    return sessiondata
}