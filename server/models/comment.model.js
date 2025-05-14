const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  const Comment = sequelize.define("Comment", {
    description: { type: DataTypes.TEXT, allowNull: false },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 }
    },
    date: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
    time: { type: DataTypes.TIME, defaultValue: DataTypes.NOW }
  });

  Comment.associate = models => {
    Comment.belongsTo(models.User, { foreignKey: "userId" });
    Comment.belongsTo(models.Trip, { foreignKey: "tripId" });
  };

  return Comment;
};
