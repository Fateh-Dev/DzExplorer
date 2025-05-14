const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  const Trip = sequelize.define("Trip", {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    rating: { type: DataTypes.FLOAT, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false }, // main image
    thumbnail: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false, defaultValue: DataTypes.NOW },
    views: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
  });

  Trip.associate = models => {
    Trip.belongsTo(models.User, { foreignKey: "userId" }); // agency
    Trip.hasMany(models.Image, { foreignKey: "tripId", as: "images" });
    Trip.hasMany(models.Comment, { foreignKey: "tripId", as: "comments" });
    // Wishlist relationship
    Trip.belongsToMany(models.User, {
      through: models.Wishlist,
      as: "wishlistedBy",
      foreignKey: "tripId",
      otherKey: "userId"
    });
  };

  return Trip;
};
