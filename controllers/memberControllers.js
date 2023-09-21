const express = require("express");
const Member = require("../models/memberModel");
const { Snowflake } = require("@theinternetfolks/snowflake");

const createMember = async (req, res) => {
  try {
    const { community, user, role } = req.body;

    if (!community || !user || !role) {
      res.status(400);
      throw new Error("comunity, user and role required");
    }

    const data = {
      _id: Snowflake.generate(),
      community,
      user,
      role,
    };

    const member = await Member.create(data);
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
