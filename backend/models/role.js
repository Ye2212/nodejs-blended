const { Schema, model } = require("mongoose");

const roleSchema = Schema(
  { value: { type: String, unique: true, default: "USER" } },
  { versionKey: false, timestamps: true }
);

module.exports = model("role", roleSchema);
