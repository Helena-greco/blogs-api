const Categorie = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categorie', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  }, {
    timestamps: false,
    tableName: 'Categories',
  });

  return Categories;
};

module.exports = Categorie;