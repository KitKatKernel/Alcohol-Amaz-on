const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  // Checks the password against the encrypted password in the database.
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// function to calculate age from date of birth
const calculateAge = (dob) => {
  const diff = Date.now() - new Date(dob).getTime();
  const age = new Date(diff).getUTCFullYear() - 1970;
  return age;
};

User.init(
  {
    // User ID
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // User's name
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Saved recipes 
    saved_recipes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // User's age
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // User's date of birth
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // Submitted reviews
    submitted_reviews: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // User's email
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    // User's password
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    // Hooks to encrypt the password before storing it and to calculate age
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        newUserData.age = calculateAge(newUserData.date_of_birth);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        if (updatedUserData.password) {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        }
        if (updatedUserData.date_of_birth) {
          updatedUserData.age = calculateAge(updatedUserData.date_of_birth);
        }
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
