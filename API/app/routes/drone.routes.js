import controller from '../controllers/drone.controller.js'

const DroneRoutes = (app) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/drone/location/:id", controller.sendLocation);
  app.get("/api/project/drones/:project", controller.sendDrones);
  app.get("/api/project/:project", controller.getProject);
  app.get("/api/drone/type/:type", controller.getType);

};

export default DroneRoutes;