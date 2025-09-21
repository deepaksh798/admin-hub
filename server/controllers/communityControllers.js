const express = require("express");
const { Snowflake } = require("@theinternetfolks/snowflake");
const Community = require("../models/communityModel");
const Members = require("../models/memberModel");

// Create Community

const createCommunity = async (req, res) => {

  try {
    const { name } = req.body;
    if (!name) {
      console.log("ALL FIELDS ARE MENDATORY");
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const data = {
      id: Snowflake.generate(),
      name: name,
      owner: req.user.id,
      slug: name,
    };

    const community = await Community.create(data);
    if (community) {
      res.status(200).json({
        status: true,
        content: { data: community },
      });
    }
  } catch (error) {
    console.log("error-->", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteCommunity = async (req, res) => {
  try {
    const communityId = req.params.id;
    const community = await Community.findOneAndDelete({ id: communityId });
    if (!community) {
      return res
        .status(404)
        .json({ status: false, message: "Community not found" });
    }
    res
      .status(200)
      .json({ status: true, message: "Community deleted successfully" });
  } catch (error) {
    console.log("error-->", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

const getAllCommunity = async (req, res) => {
  try {
    data = await Community.find();

    if (!data) {
      res.status(200).json({ status: 400, message: "No communities found" });
    }
    if (data.length === 0) {
      res.status(200).json({ status: 400, message: "No communities found" });
      return;
    }

    const length = Math.floor(data.length / 5);

    res.status(200).json({
      status: true,
      content: {
        meta: { total: data.length, pages: length },
        data: data,
      },
    });
  } catch (error) {
    console.log("error--->", error);
  }
};

const getAllMembers = async (req, res) => {
  try {
    const slug = req.params.id;

    const community = await Community.find({ slug: slug });

    if (!community) {
      res.status(200).json({ status: 400, message: "Community not found" });
    }

    const members = await Members.find({ community: community[0].id })
      .populate("user", "name")
      .populate("role", "name");

    if (!members) {
      res.statue(400).json({ message: "No members found" });
    }

    res.status(200).json({ statue: true, content: { data: members } });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

const getMyOwnedCommunity = async (req, res) => {
  try {
    const communities = await Community.find({ owner: req.user.id });
    if (!communities) {
      res.status(200).json({ status: 400, message: "No communities found" });
    }

    res.status(200).json({
      status: true,
      content: {
        meta: { total: communities.length, pages: 1, page: 1 },
        data: communities,
      },
    });
  } catch (error) {
    console.log("error", error);
    res.status(400);
    throw new Error(`Error in create communtity api`);
  }
};

const getMyJoinedCommunity = async (req, res) => {
  try {
    const data = await Members.find({ user: req.user.id }).populate(
      "community"
    );
    res.status(200).json({ statue: true, content: { data: data } });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createCommunity,
  deleteCommunity,
  getAllCommunity,
  getAllMembers,
  getMyOwnedCommunity,
  getMyJoinedCommunity,
};
