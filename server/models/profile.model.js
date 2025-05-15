const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  const Profile = sequelize.define("Profile", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contactNumber1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contactNumber2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    areaOfWork: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT, // can store large base64 strings or URLs
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true // one-to-one relationship with User
    }
  });

  Profile.associate = models => {
    Profile.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  };

  return Profile;
};
