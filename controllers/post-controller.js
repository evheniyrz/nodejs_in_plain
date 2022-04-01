const Post = require('../models/post');
const createPath = require('../helpers/create-path');

const getPost = (req, resp) => {
  const title = 'Post';
  Post.findById(req.params.id)
    .then((post) => {
      resp.render(createPath('post'), { title, post })
    })
    .catch((err) => {
      console.log('DB GET SINGLE POST ERROR==>', err);
      resp.render(createPath('error'), { title: 'DB GET SINGLE POST ERROR' });
    });
};

const getEditPost = (req, resp) => {
  const title = 'Edit Post';
  Post.findById(req.params.id)
    .then((post) => {
      resp.render(createPath('edit-post'), { title, post })
    })
    .catch((err) => {
      console.log('DB GET SINGLE POST ERROR==>', err);
      resp.render(createPath('error'), { title: 'DB GET SINGLE POST ERROR' });
    });
};

const editPost = (req, resp) => {
  const { title, author, text } = req.body;
  const { id } = req.params.id;
  Post.findByIdAndUpdate(id, { title, author, text })
    .then((result) => {
      resp.redirect(`/posts/${id}`)
    })
    .catch((err) => {
      console.log('DB GET SINGLE POST ERROR==>', err);
      resp.render(createPath('error'), { title: 'DB GET SINGLE POST ERROR' });
    });
};

const deletePost = (req, resp) => {
  const title = 'Post';
  Post.findByIdAndDelete(req.params.id)
    .then((result) => {
      resp.sendStatus(200);
    })
    .catch((err) => {
      console.log('DB GET SINGLE POST ERROR==>', err);
      resp.render(createPath('error'), { title: 'DB GET SINGLE POST ERROR' });
    });
};

const getPosts = (req, resp) => {
  const title = 'Posts';
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      console.log('==POSTS==', posts)
      resp.render(createPath('posts'), { title, posts })
    })
    .catch((err) => {
      console.log('DB GET POSTS ERROR==>', err);
      resp.render(createPath('error'), { title: 'DB GET POSTS ERROR' });
    });
};

const addPost = (req, resp) => {
  const { title, author, text } = req.body;
  const post = new Post({ title, author, text });

  post.save()
    .then((result) => resp.redirect('/posts'))
    .catch((err) => {
      console.log('DB SEND POST ERROR==>', err);
      resp.render(createPath('error'), { title: 'DB SEND POST ERROR' });
    });
};

const getAddPost = (req, resp) => {
  const title = 'Add post';
  resp.render(createPath('add-post'), { title });
};

module.exports = {
  getPost,
  getEditPost,
  editPost,
  deletePost,
  getPosts,
  addPost,
  getAddPost
};
