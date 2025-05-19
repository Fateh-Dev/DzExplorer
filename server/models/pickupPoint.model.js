const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  const PickupPoint = sequelize.define("PickupPoint", {
    location: DataTypes.STRING,
    time: DataTypes.STRING
  });

  PickupPoint.associate = models => {
    PickupPoint.belongsTo(models.Trip, { foreignKey: "tripId" });
  };

  return PickupPoint;
};
