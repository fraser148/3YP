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
  app.get("/api/clients", controller.getClients);
  app.get("/api/client/:client", controller.getClient);
  app.get("/api/client/projects/:client", controller.getClientProjects);
  app.post("/api/project/create", controller.createProject);
  app.post("/api/project2/route", controller.getRoute);
  app.post("/api/project/start/:project", controller.startProject);

};

export default ProjectRoutes;