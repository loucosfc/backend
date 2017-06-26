const loadModules = (app, modules) => {
  modules.forEach((v) => {
    const router = v.router;
    app.use(router.routes());
    app.use(router.allowedMethods());
  });
};

module.exports = loadModules;
