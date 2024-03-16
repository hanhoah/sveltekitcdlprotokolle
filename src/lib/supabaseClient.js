import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(
// 	'https://noejjknzqcfnwzgrpfdi.supabase.co',
// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vZWpqa256cWNmbnd6Z3JwZmRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0ODMyNDQsImV4cCI6MjAyMzA1OTI0NH0.pEqKPgopedqGbawDnrNssT_RjZBhr-IJoUx_9uWWv1c'
// );


if (process.env.NODE_ENV === 'production') {
	// Konfiguration für die Produktionsumgebung
	const supabase = createClient(
		process.env.SUPABASE_URL,
		process.env.SUPABASE_KEY
	);
	} else {
	// Konfiguration für die lokale Entwicklungsumgebung
	supabase = createClient(
		process.env.DEV_SUPABASE_URL,
		process.env.DEV_SUPABASE_KEY
	);
}

export default supabase;
