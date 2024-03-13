import adapter from '@sveltejs/adapter-vercel';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	alias: {
		$img: 'src/lib/images'
	},

};
export default config;
