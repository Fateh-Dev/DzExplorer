const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  const User = sequelize.define("User", {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      // 'Agency', 'SimpleUser', 'Admin'
      type: DataTypes.ENUM("Agency", "SimpleUser", "Admin"),
      allowNull: false
    }
  });

  User.associate = models => {
    User.hasOne(models.Profile, { foreignKey: "userId", as: "profile" });

    User.hasMany(models.Trip, { foreignKey: "userId" }); // if agency

    User.hasMany(models.Comment, { foreignKey: "userId" }); // if simple user

    // Wishlist relationship
    User.belongsToMany(models.Trip, {
      through: models.Wishlist,
      as: "wishlist",
      foreignKey: "userId",
      otherKey: "tripId"
    });
  };

  return User;
};
