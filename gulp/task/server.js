export const server = (done) => {
	app.plugins.browsersync.init({
		server: {
			baseDir: `${app.path.build.html}`
		},
		notyfy: false, //сщщбщения в браузере отключены
		port: 3000,
	});
}