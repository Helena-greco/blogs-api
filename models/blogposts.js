const BlogPost = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'User', key: 'id' } },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
  },
    { timestamps: true,
      createdAt: 'published',
      updatedAt: 'updated',
      tableName: 'BlogPosts' });

  BlogPosts.associate = (models) => { 
    BlogPosts.belongsTo(models.User, { foreignKey: 'userId', as: 'user' }); 
  };
  
  return BlogPosts;
};

module.exports = BlogPost;