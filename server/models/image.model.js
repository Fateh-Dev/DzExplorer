const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  const Image = sequelize.define("Image", {
    url: { type: DataTypes.STRING, allowNull: false },
    caption: { type: DataTypes.STRING, allowNull: true },
    isMain: { type: DataTypes.BOOLEAN, defaultValue: false }
  });

  Image.associate = models => {
    Image.belongsTo(models.Trip, { foreignKey: "tripId" });
  };

  return Image;
};
