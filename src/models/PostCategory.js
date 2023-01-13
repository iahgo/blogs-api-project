'use strict';

const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      allowNull: false,
      primaryKey: true,
      foreignKey: true,
      references: { model: 'BlogPosts', key: 'id' },
      type: DataTypes.INTEGER
    },
    categoryId: {
      allowNull: false,
      primaryKey: true,
      foreignKey: true,
      references: { model: 'Categories', key: 'id' },
      type: DataTypes.INTEGER,
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'posts_categories',
  })
  PostCategory.associate = (models) => {
      models.Category.belongsToMany(models.BlogPost,
    {
      foreignKey: 'postId',
      as: 'blogposts',
      otherKey: 'categoryId',
      through: PostCategory,
    })
    models.BlogPost.belongsToMany(models.Category,{
      foreignKey: 'categoryId',
      as: 'categories',
      otherKey: 'postId',
      through: PostCategory,
    })
  }
  return PostCategory;
};

module.exports = PostCategory;
