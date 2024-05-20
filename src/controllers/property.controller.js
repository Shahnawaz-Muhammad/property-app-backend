import User from "../models/userModel.js";
import Property from "../models/propertyModel.js";

const getAllProperties = async (req, res) => {
  res.send("hellow world");
};
const getPropertyDetail = async (req, res) => {};
const createProperty = async (req, res) => {};
const updateProperty = async (req, res) => {};
const deleteProperty = async (req, res) => {};

export {
  getAllProperties,
  getPropertyDetail,
  createProperty,
  updateProperty,
  deleteProperty,
};
