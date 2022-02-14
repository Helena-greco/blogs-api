/** Ref: https://sequelize.org/master/manual/validations-and-constraints.html  */
const User = (sequelize, DataTypes) => {
  const Users = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: { type: DataTypes.STRING, validate: { notEmpty: true, len: [8, 200] } },
    email: { type: DataTypes.STRING, unique: true, validate: { notEmpty: true, isEmail: true } },
    password: { type: DataTypes.STRING, validate: { notEmpty: true, len: [6, 6] } },
    image: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'Users',
  });

  Users.associate = (models) => {
    Users.hasMany(models.BlogPost, { foreignKey: 'userId', as: 'BlogPost' });
  };

  return Users;
};

module.exports = User;