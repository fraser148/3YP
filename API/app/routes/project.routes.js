import controller from '../controllers/project.controller.js'

const ProjectRoutes = (app) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/setup", controller.getSetup);
  app.get("/api/available", controller.getAvailable);

};

export default ProjectRoutes;