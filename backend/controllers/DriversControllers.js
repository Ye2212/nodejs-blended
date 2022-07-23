const asyncHandler = require("express-async-handler");
const Driver = require("../models/driver");

class DriversController {
  save = asyncHandler(async (req, res) => {
    // zapros na bd
    // console.log("req.body",req.body)
    console.log(req.user);
    const { email } = req.body;
    const isExists = await Driver.findOne({ email });
    if (isExists) {
      res.status(400);
      throw new Error("User already exist");
    }

    const newDriver = await Driver({ ...req.body });
    if (!newDriver) {
      res.status(400);
      throw new Error("BAD REQUEST");
    }
    // console.log(newDriver)
    await newDriver.save();
    res.status(201).json({ code: 201, data: newDriver });
  });

  getAll = asyncHandler(async (req, res) => {
    const data = await Driver.find({});
    if (!data) {
      res.status(400);
      throw new Error("DRIVERS NOT FOUND");
    }
    res.status(200).json({
      code: 200,
      data,
      count: data.length,
    });
  });

  getOne = asyncHandler(async (req, res) => {
    const { ID } = req.params;
    const data = await Driver.findById(ID);
    if (!data) {
      res.status(404);
      throw new Error("DRIVER NOT FOUND");
    }
    res.status(200).json({
      code: 200,
      data,
    });
  });

  update = asyncHandler(async (req, res) => {
    const { ID } = req.params;
    // let data = await Driver.findById(ID);
    // data = { ...data, ...req.body };
    // data = { ...data, ...req.body };
    // console.log(data);
    // await data.save();

    const data = await Driver.findByIdAndUpdate(ID, req.body, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      res.status(404);
      throw new Error(`DRIVER WHITH ${ID} NOT FOUND`);
    }
    res.status(200).json({
      code: 200,
      data,
    });
  });

  remove = asyncHandler(async (req, res) => {
    const { ID } = req.params;
    const data = await Driver.findById(ID);
    if (!data) {
      res.status(404);
      throw new Error(`DRIVER WHITH ${ID} NOT FOUND`);
    }
    data.remove();
    res.status(200).json({
      code: 200,
      data: data._id,
    });
  });
}

module.exports = new DriversController();
