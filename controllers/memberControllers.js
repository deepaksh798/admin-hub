const express = require("express");
const Member = require("../models/memberModel");
const { Snowflake } = require("@theinternetfolks/snowflake");
const Community = require("../models/communityModel");
const Role = require("../models/roleModel");
const User = require("../models/userModel")


const createMember = async (req, res) => {
  try {
    const { community, user, role } = req.body;

    if (!community || !user || !role) {
      res.status(400);
      throw new Error("community, user and role required");
    }

    
    const communityId = await Community.findOne({_id: community});
    console.log("communityId--->",communityId);
    
    if (!communityId) {
      console.log("community not found");
      res.status(200);
      throw new Error("community not found");
    }
    const roleData = await Role.findOne({id: role})
    if (!roleData) {
      console.log("role not found");
      res.status(200);
      throw new Error("role not found");
    }
    const userId = await User.findOne({id:user})
    if(!userId){
      console.log("user not found");
      res.status(200);
      throw new Error("user not found");
    }

    const data = {
      _id: Snowflake.generate(),
      community,
      user,
      role
    };


    const member = await Member.create(data)
    if (!member) {
      res.status(400);
      throw new Error("error in creating member");
    }
    console.log("data", data);
    res.status(200).json({ status: true, content: { data: { member } } });
  } catch (error) {
    console.log("error", error);
    res.status(400);
    throw new Error(`Error in create communtity api`);
  }
};

module.exports = { createMember };
