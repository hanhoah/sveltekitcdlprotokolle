import adapter from '@sveltejs/adapter-vercel';
// import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	kit: {
		adapter: adapter({
			runtime: 'nodejs18.x'
		})
	},
	alias: {
		$img: 'src/lib/images'
	}
};
export default config;
