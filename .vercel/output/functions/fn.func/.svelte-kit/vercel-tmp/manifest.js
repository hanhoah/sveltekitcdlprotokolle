export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","images/Intentional Health Color Palette - color-hex.com.png","images/books/11/Download (1).jpeg","images/books/12/41HNtcZrJIL._AC_SY780_.jpg","images/books/13/vitaminum_buch-adipositas.jpg","images/books/14/Download.jpeg","images/books/15/61ttNVVSNGL._SL1200_.jpg","images/books/16/615bfp88qmL._AC_UF1000,1000_QL80_.jpg","images/books/19/81PGdHerZ7L._AC_UF1000,1000_QL80_.jpg","images/books/20/61IZVC4ae7L._AC_UF894,1000_QL80_.jpg","images/books/21/130877.jpg","images/books/22/9783384006486.jpg","images/books/23/LP_Desktop_Der-grosse-Cholesterin-Schwindel_968200.jpg","images/books/24/134140.jpg","images/books/3/Codex-Humanus_Band-400x400.png.webp","images/books/4/48311634z.jpg","images/books/6/csm_Bluthochdruck_sf_739bfc2751.png","images/books/7/vitaminum_buch-alzheimer.png","images/books/8/Download.jpeg","images/books/9/61-3sI2vGcL.jpg","images/books/no_cover.jpeg","images/health color palette hex code.png"]),
	mimeTypes: {".png":"image/png",".jpeg":"image/jpeg",".jpg":"image/jpeg",".webp":"image/webp"},
	_: {
		client: {"start":"_app/immutable/entry/start.BBeAwVL4.js","app":"_app/immutable/entry/app.C3HLXW2Z.js","imports":["_app/immutable/entry/start.BBeAwVL4.js","_app/immutable/chunks/entry.CmYwrCBr.js","_app/immutable/chunks/scheduler.C4ZYsLN4.js","_app/immutable/chunks/index.DTw5nWgH.js","_app/immutable/entry/app.C3HLXW2Z.js","_app/immutable/chunks/preload-helper.BQ24v_F8.js","_app/immutable/chunks/scheduler.C4ZYsLN4.js","_app/immutable/chunks/index.DI9pZrS9.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
