const asyncHandler = require("express-async-handler");
const Driver = require("../models/driver");
const Role = require("../models/role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {
  signUp = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Enter all fields");
    }

    const candidate = await Driver.findOne({ email });

    if (candidate) {
      res.status(400);
      throw new Error("User already in DB");
    }

    const driver = await Driver(req.body);
    const hashPassword = bcrypt.hashSync(password, 5);
    driver.password = hashPassword;

    const userRole = await Role.findOne({ value: "USER" });
    driver.roles = [userRole.value];
    await driver.save();

    if (driver) {
      res.status(201).json({ code: 200, data: driver });
    }
  });

  signIn = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Enter login and password");
    }

    const candidate = await Driver.findOne({ email });
    if (!candidate) {
      res.status(404);
      throw new Error("User not found");
    }

    const validPassword = bcrypt.compareSync(password, candidate.password);
    if (!validPassword) {
      res.status(400);
      throw new Error("Wrong login or password");
    }

    candidate.token = this.generateToken(candidate._id, candidate.roles);
    await candidate.save();
    res.status(200).json({
      code: 200,
      data: candidate,
    });
  });

  logOut = asyncHandler(async (req, res) => {
    const token = req.headers.authorization;
    const splitToken = token.split(" ")[1];

    if (!token.startsWith("Bearer") || !splitToken) {
      res.status(403);
      throw new Error("User is not login");
    }

    const { id } = jwt.verify(splitToken, process.env.JWT_SECRET_KEY);

    const driver = await Driver.findById(id);
    if (!driver) {
      res.status(404);
      throw new Error(`User with ${id} not authorized`);
    }
    driver.token = null;

    await driver.save();

    res.status(200).json({
      code: 200,
      message: "logout success",
    });
  });

  generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET_KEY, {
      expiresIn: "2h",
    });
  };
}

module.exports = new AuthController();
