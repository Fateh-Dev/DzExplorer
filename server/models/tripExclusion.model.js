const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  const TripExclusion = sequelize.define("TripExclusion", {
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

  TripExclusion.associate = models => {
    TripExclusion.belongsTo(models.Trip, { foreignKey: "tripId" });
  };

  return TripExclusion;
};
