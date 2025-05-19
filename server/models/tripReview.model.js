const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  const TripReview = sequelize.define("TripReview", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    }
  });

  TripReview.associate = models => {
    TripReview.belongsTo(models.Trip, { foreignKey: "tripId" });
  };

  return TripReview;
};
