const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  const TripDay = sequelize.define("TripDay", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    dayTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    activities: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dayOrder: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  TripDay.associate = models => {
    TripDay.belongsTo(models.Trip, { foreignKey: "tripId" });
  };

  return TripDay;
};
