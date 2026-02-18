import { Router } from "express";
import userRoute from "../modules/user/index.js";
import adminRoute from "../modules/admin/index.js";
import RoleRoute from "../modules/role/index.js";
import PermissionRoute from "../modules/permission/index.js";
import SchoolRouter from "../modules/school/index.js";
import ClassroomRouter from "../modules/classroom/index.js";
import StudentRouter from "../modules/student/index.js";



const USER = `/v1/auth`;
const ADMIN = `/v1/admin/auth`;
const ROLE = `/v1/role`;
const PERMISSION = `/v1/permission`;
const SCHOOL = `/v1/school`;
const CLASSROOM = `/v1/classroom`;
const STUDENT = `/v1/student`;

 const route = Router();

route.use(USER, userRoute);
route.use(ADMIN, adminRoute);
route.use(ROLE, RoleRoute);
route.use(PERMISSION, PermissionRoute);
route.use(SCHOOL, SchoolRouter);
route.use(CLASSROOM, ClassroomRouter);
route.use(STUDENT, StudentRouter);



export default route;
