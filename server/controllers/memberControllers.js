const express = require("express");
const Member = require("../models/memberModel");
const { Snowflake } = require("@theinternetfolks/snowflake");
const Community = require("../models/communityModel");
const Role = require("../models/roleModel");
const User = require("../models/userModel");

const createMember = async (req, res) => {
  try {
    const { community, user, role } = req.body;

    if (!community || !user || !role) {
      res.status({
        status: 400,
        message: "Community, user and role are required",
      });
      console.log("community, user and role required");
      return;
    }

    const communityId = await Community.findOne({ id: community });
    console.log("communityId--->", communityId);

    if (!communityId) {
      console.log("community not found");
      res.status(200);
    }
    const roleData = await Role.findOne({ id: role });
    if (!roleData) {
      console.log("role not found");
      res.status(200);
    }
    const userId = await User.findOne({ id: user });
    if (!userId) {
      console.log("user not found");
      res.status(200);
    }

    const data = {
      id: Snowflake.generate(),
      community,
      user,
      role,
    };

    const member = await Member.create(data);
    if (!member) {
      res.status(400);
      throw new Error("error in creating member");
    }

    // Add member to community's members array with id and name
    await Community.findOneAndUpdate(
      { id: community },
      { $push: { members: { id: member.id, name: userId.name } } }
    );

    console.log("data", data);
    res.status(200).json({ status: true, content: { data: { member } } });
  } catch (error) {
    console.log("error", error);
    res.status(400);
  }
};

module.exports = { createMember };
