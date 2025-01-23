import { type RouteConfig, route, index } from "@react-router/dev/routes";
import { Routes } from "react-router";

export default [
    index("routes/login.tsx"),
    route("register", "routes/register.tsx"),
    route("reset", "routes/reset.tsx"),
    route("form-social","routes/form-social.tsx"),

] satisfies RouteConfig;
