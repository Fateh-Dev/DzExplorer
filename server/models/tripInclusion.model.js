const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  const TripInclusion = sequelize.define("TripInclusion", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  TripInclusion.associate = models => {
    TripInclusion.belongsTo(models.Trip, { foreignKey: "tripId" });
  };

  return TripInclusion;
};
