const Users = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING, // tem quer ser único
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'Users',
  });

  return User;
};

module.exports = Users;