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
      return;
    }

    const communityDoc = await Community.findOne({ id: community });
    if (!communityDoc) {
      return res
        .status(404)
        .json({ status: false, message: "Community not found" });
    }

    // Check if user already exists in community
    const userExists = communityDoc.members.some(
      (member) => member.user && member.user.id === user
    );
    if (userExists) {
      return res
        .status(400)
        .json({ status: false, message: "User already exists in community" });
    }

    const roleDoc = await Role.findOne({ id: role });
    if (!roleDoc) {
      return res.status(404).json({ status: false, message: "Role not found" });
    }

    const userDoc = await User.findOne({ id: user });
    if (!userDoc) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

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

const deleteMember = async (req, res) => {
  try {
    const memberId = req.params.id;
    const member = await Member.findOneAndDelete({ id: memberId });
    if (!member) {
      return res
        .status(404)
        .json({ status: false, message: "Member not found" });
    }
    // Also remove member from community's members array
    await Community.updateOne(
      { name: member.community },
      { $pull: { members: { "user.id": member.user } } }
    );
    res.status(200).json({ status: true, message: "Member deleted successfully" });
  } catch (error) {
    console.log("error-->", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

module.exports = { createMember, deleteMember };
