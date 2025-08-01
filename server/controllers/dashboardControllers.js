const Community = require("../models/communityModel");
const Role = require("../models/roleModel");
const User = require("../models/userModel");

const getDashboardStats = async (req, res) => {
  try {
    // Get today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      communityCount,
      roleCount,
      userCount,
      recentCommunities,
      recentRoles,
      recentUsers,
      todayCommunityCount,
      todayRoleCount,
      todayUserCount,
    ] = await Promise.all([
      Community.countDocuments(),
      Role.countDocuments(),
      User.countDocuments(),
      Community.find().sort({ createdAt: -1 }).limit(5),
      Role.find().sort({ createdAt: -1 }).limit(5),
      User.find({}, "-password").sort({ createdAt: -1 }).limit(5),
      Community.countDocuments({ createdAt: { $gte: today } }),
      Role.countDocuments({ createdAt: { $gte: today } }),
      User.countDocuments({ createdAt: { $gte: today } }),
    ]);

    res.status(200).json({
      status: true,
      content: {
        communities: communityCount,
        roles: roleCount,
        users: userCount,
        todaysActivity: {
          communities: todayCommunityCount,
          roles: todayRoleCount,
          users: todayUserCount,
        },
        recentActivities: {
          communities: recentCommunities,
          roles: recentRoles,
          users: recentUsers,
        },
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

module.exports = { getDashboardStats };
