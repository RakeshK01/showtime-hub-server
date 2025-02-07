var express = require("express");
var router = express.Router();
const Login = require("../src/Login/login.controller");
const Admin = require("../src/admin/admin.controller");
const JWT = require("./jwtAuth/jwtAuth");
const RoleMgmnt = require("./RoleAuth/roleAuthorization");
const Roles = RoleMgmnt.Roles

// router.post("/adminSignup", Login.adminSignup);
router.post('/login', Login.adminLogin);
router.post("/refresh_token", JWT.NewAccessToken);
// router.post("/getAdminList", JWT.VerifyToken, Admin.getAdminList);
module.exports = router;