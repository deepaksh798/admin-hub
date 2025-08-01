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
      res.status(400).json({
        status: false,
        message: "Community, user and role are required",
      });
      console.log("community, user and role required");
      return;
    }

    const communityDoc = await Community.findOne({ id: community });
    if (!communityDoc) {
      console.log("community not found");
      return res
        .status(404)
        .json({ status: false, message: "Community not found" });
    }

    const roleDoc = await Role.findOne({ id: role });
    if (!roleDoc) {
      console.log("role not found");
      return res.status(404).json({ status: false, message: "Role not found" });
    }

    const userDoc = await User.findOne({ id: user });
    if (!userDoc) {
      console.log("user not found");
      return res.status(404).json({ status: false, message: "User not found" });
    }

    console.log("Creating member for community:", communityDoc);
    console.log("User:", userDoc, "Role:", roleDoc);

    // Create member object
    const memberData = {
      id: Snowflake.generate(),
      community: communityDoc.name,
      user: userDoc.name,
      userEmail: userDoc.email,
      role: roleDoc.name,
    };

    const member = await Member.create(memberData);
    if (!member) {
      return res
        .status(400)
        .json({ status: false, message: "Error in creating member" });
    }

    // Prepare user and role info for community members array
    const memberInfo = {
      user: { id: userDoc.id, name: userDoc.name },
      role: { id: roleDoc.id, name: roleDoc.name },
    };

    // Push member info to community's members array
    communityDoc.members.push(memberInfo);
    await communityDoc.save();

    res.status(200).json({ status: true, content: { data: { member } } });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ status: false, message: "Error occurred" });
  }
};

module.exports = { createMember };
