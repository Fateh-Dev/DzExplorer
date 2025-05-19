const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  const Accommodation = sequelize.define("Accommodation", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    nights: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hasPool: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    includesBreakfast: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  Accommodation.associate = models => {
    Accommodation.belongsTo(models.Trip, { foreignKey: "tripId" });
  };

  return Accommodation;
};
