const { Snowflake } = require("@theinternetfolks/snowflake");
const Role = require("../models/roleModel");

// Create Role

const createRole = async (req, res) => {

  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const data = {
      id: Snowflake.generate(),
      name: name,
      owner: req.user.id,
    };

    const role = await Role.create(data);

    if (role) {
      res.status(200).json({
        status: true,
        content: {
          data: role,
        },
      });
    }
  } catch (error) {
    console.log("error--->", error);
  }
};

const getAllRole = async (req, res) => {
  try {
    const data = await Role.find({ owner: req.user.id });

    if (!data) {
      return res.status(404).json({ message: "No roles found" });
    }

    const length = Math.floor(data.length / 5);

    res.status(200).json({
      status: true,
      content: {
        meta: {
          total: data.length,
          pages: length,
        },
        data: data,
      },
    });

  } catch (error) {
    console.log(error);
  }
};

const deleteRole = async (req, res) => {
  try {
    const roleId = req.params.id;

    const role = await Role.findOneAndDelete({ id: roleId, owner: req.user.id });

    if (!role) {
      return res.status(404).json({ status: false, message: "Role not found" });
    }

    res.status(200).json({ status: true, message: "Role deleted successfully" });
  } catch (error) {
    console.error("Error deleting role:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

module.exports = { createRole, getAllRole, deleteRole };
