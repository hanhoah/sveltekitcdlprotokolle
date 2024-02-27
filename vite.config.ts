import { sveltekit } from '@sveltejs/kit/vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { defineConfig } from 'vite';
import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit(),
		ViteImageOptimizer({
			svg: {
				multipass: true,
				plugins: [
					{
						name: 'preset-default',
						params: {
							overrides: {
								cleanupNumericValues: false,
								removeViewBox: false // https://github.com/svg/svgo/issues/1128
							},
							cleanupIDs: {
								minify: false,
								remove: false
							},
							convertPathData: false
						}
					},
					'sortAttrs',
					{
						name: 'addAttributesToSVGElement',
						params: {
							attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }]
						}
					}
				]
			},
			png: {
				// https://sharp.pixelplumbing.com/api-output#png
				quality: 80
			},
			jpeg: {
				// https://sharp.pixelplumbing.com/api-output#jpeg
				quality: 80
			},
			jpg: {
				// https://sharp.pixelplumbing.com/api-output#jpeg
				quality: 80
			}
		})
	]
});
