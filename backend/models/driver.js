const { Schema, model } = require("mongoose");

const driverSchema = Schema(
  {
    name: { type: String, default: "Stig" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: String,
    team: String,
    country: String,
    podiums: Number,
    points: Number,
    worldChampionships: Number,
    token: {
      type: String,
      default: null,
    },
    roles: [{ type: String, ref: "role" }],
  },
  { versionKey: false, timestamps: true }
);

const Driver = model("driver", driverSchema);

module.exports = Driver;
