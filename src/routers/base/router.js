class RouterBase {
    constructor(app, path, controller) {
        this.initRouters(app, path, controller);
    }
    
    initRouters(app, path, controller) {
        app.route(`/${path}`).get((req, res) => controller.index(req, res));
        app.route(`/${path}/find`).get((req, res) => controller.search(req, res));
        app.route(`/${path}/:id`).get((req, res) => controller.show(req, res));
        app.route(`/${path}`).post((req, res) => controller.create(req, res));
        app.route(`/${path}/:id`).put((req, res) => controller.update(req, res));
        app.route(`/${path}/:id`).delete((req, res) => controller.destroy(req, res));
    }
}

module.exports = RouterBase;