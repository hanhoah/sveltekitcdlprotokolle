import { createClient } from '@supabase/supabase-js';

let supabase;

if (process.env.NODE_ENV === 'production') {
	// Konfiguration für die Produktionsumgebung
	supabase = createClient(
		'https://noejjknzqcfnwzgrpfdi.supabase.co',
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vZWpqa256cWNmbnd6Z3JwZmRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0ODMyNDQsImV4cCI6MjAyMzA1OTI0NH0.pEqKPgopedqGbawDnrNssT_RjZBhr-IJoUx_9uWWv1c'
	);
} else {
	// Konfiguration für die lokale Entwicklungsumgebung
	supabase = createClient(
		'http://127.0.0.1:54321',
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
	);
}

export default supabase;
