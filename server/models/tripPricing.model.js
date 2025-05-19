const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  const TripPricing = sequelize.define("TripPricing", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });

  TripPricing.associate = models => {
    TripPricing.belongsTo(models.Trip, { foreignKey: "tripId" });
  };

  return TripPricing;
};
