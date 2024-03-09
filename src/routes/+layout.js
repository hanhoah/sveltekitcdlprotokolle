import { dev } from '$app/environment';
import { inject } from '@vercel/analytics';

inject({ mode: dev ? 'development' : 'production' });

// This can be false if you're using a fallback (i.e. SPA mode)
export const prerender = true;
