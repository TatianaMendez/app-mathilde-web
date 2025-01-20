import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
    index("routes/login.tsx"),
    route("register", "routes/register.tsx"),
    route("reset", "routes/reset.tsx"),

] satisfies RouteConfig;
