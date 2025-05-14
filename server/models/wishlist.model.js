// models/wishlist.model.js
const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  const Wishlist = sequelize.define("Wishlist", {
    // Optional: createdAt field to track when user added a trip
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  return Wishlist;
};
