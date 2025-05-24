const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  const Trip = sequelize.define("Trip", {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    durationHours: { type: DataTypes.FLOAT, allowNull: true },
    language: { type: DataTypes.STRING, allowNull: true },
    meetingPoint: { type: DataTypes.STRING, allowNull: true },
    cancellationPolicy: { type: DataTypes.TEXT, allowNull: true },

    rating: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
    image: { type: DataTypes.STRING, allowNull: true }, // main image
    thumbnail: { type: DataTypes.STRING, allowNull: true },
    price: { type: DataTypes.FLOAT, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false, defaultValue: DataTypes.NOW },
    views: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
  });

  Trip.associate = models => {
    Trip.belongsTo(models.User, { foreignKey: "userId" }); // agency
    Trip.hasMany(models.Image, { foreignKey: "tripId", as: "images" });
    Trip.hasMany(models.Comment, { foreignKey: "tripId", as: "comments" });
    Trip.hasMany(models.TripInclusion, { foreignKey: "tripId", as: "inclusions" });
    Trip.hasMany(models.TripExclusion, { foreignKey: "tripId", as: "exclusions" });
    Trip.hasMany(models.TripReview, { foreignKey: "tripId", as: "reviews" });

    // ADD THESE MISSING ASSOCIATIONS:
    Trip.hasMany(models.TripDay, { foreignKey: "tripId", as: "days" });
    Trip.hasMany(models.Accommodation, { foreignKey: "tripId", as: "accommodations" });
    Trip.hasMany(models.PickupPoint, { foreignKey: "tripId", as: "pickupPoints" });

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
