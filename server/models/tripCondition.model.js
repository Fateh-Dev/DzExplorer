const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  const TripCondition = sequelize.define("TripCondition", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  TripCondition.associate = models => {
    TripCondition.belongsTo(models.Trip, { foreignKey: "tripId" });
  };

  return TripCondition;
};
