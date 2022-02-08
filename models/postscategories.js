const PostsCategorie = (sequelize, DataTypes) => {
  const PostsCategories = sequelize.define('PostsCategorie', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  }, {
    timestamps: false,
    tableName: 'PostsCategories',
  });

  return PostsCategories;
};

module.exports = PostsCategorie;