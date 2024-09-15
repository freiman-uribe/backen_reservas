const express = require("express");
const AuthService = require("../application/auth");
const MongoUserRepository = require("../adapters/outbound/user.repository");
const responseHandler = require("../utils/responseHandler");

const router = express.Router();
const userRepository = new MongoUserRepository();
const authService = new AuthService(userRepository);

router.get("/users", async (req, res) => {
  try {
    const users = await authService.getAllItems();
    await responseHandler.success(req, res, users, 201);
  } catch (error) {
    await responseHandler.error(req, res, "Error al obtener los usuarios", 500);
  }
});

router.post("/register", async (req, res) => {
  try {
    const user = await authService.register(req.body);
    responseHandler.success(
      req,
      res,
      { message: "User registered", user },
      201
    );
  } catch (err) {
    responseHandler.error(req, res, err.message, 400);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.login(email, password);
    responseHandler.success(req, res, { token, user }, 200);
  } catch (err) {
    responseHandler.error(req, res, err.message, 400);
  }
});

module.exports = router;
