const PostsCategory = (sequelize, DataTypes) => {
  const PostsCategories = sequelize.define('PostsCategory',
    { postId: DataTypes.INTEGER, categoryId: DataTypes.INTEGER,
  }, { timestamps: false, tableName: 'PostsCategories' });

  PostsCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'Categories',
      through: PostsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });

    models.Category.belongsToMany(models.BlogPost, {
      as: 'BlogPosts',
      through: PostsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return PostsCategories;
};

module.exports = PostsCategory;