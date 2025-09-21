const Community = require("../models/communityModel");
const Role = require("../models/roleModel");
const User = require("../models/userModel");

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id; // Get current user's ID

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
      Community.countDocuments({ owner: userId }),
      Role.countDocuments({ owner: userId }),
      User.countDocuments({}), // Total users in the system
      Community.find({ owner: userId }).sort({ createdAt: -1 }).limit(5),
      Role.find({ owner: userId }).sort({ createdAt: -1 }).limit(5),
      User.find({ id: userId }, "-password").sort({ createdAt: -1 }).limit(1),
      Community.countDocuments({ owner: userId, createdAt: { $gte: today } }),
      Role.countDocuments({ owner: userId, createdAt: { $gte: today } }),
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
