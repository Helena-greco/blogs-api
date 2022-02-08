const BlogPost = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  }, {
    timestamps: false,
    tableName: 'BlogPosts',
  });

  return BlogPosts;
};

module.exports = BlogPost;