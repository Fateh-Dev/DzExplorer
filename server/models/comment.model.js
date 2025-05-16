const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  const Comment = sequelize.define("Comment", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: { type: DataTypes.TEXT, allowNull: false },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 }
    }
    // Removed date and time fields
  });

  Comment.associate = models => {
    Comment.belongsTo(models.User, { foreignKey: "userId" });
    Comment.belongsTo(models.Trip, { foreignKey: "tripId" });
  };

  return Comment;
};
