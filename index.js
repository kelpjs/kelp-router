const { METHODS } = require('http');
const routing = require('routing2');

function Router() {
  const routes = [];
  async function run(req, res, next) {
    const { status, route } = routing.find(routes, req);
    res.statusCode = status;
    if (!route) return next();
    req.params = route.params;
    return route.action(req, res, next);
  }
  run.route = (method, path, action) => {
    routes.push(routing.create({ method, path, action }));
    return run;
  };
  for (const method of METHODS) {
    run[method.toLowerCase()] = (path, action) => {
      return run.route(method, path, action);
    };
  }
  return run;
};

module.exports = Router;
