const Post = require('../models/post');

const handleError = (resp, err) => {
  resp.status(500).send(err.message);
}

const getPost = (req, resp) => {
  Post.findById(req.params.id)
    .then((post) => resp.status(200).json(post))
    .catch(err => handleError(resp, err));
};

const deletePost = (req, resp) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => resp.status(200).json(req.params.id))
    .catch(err => handleError(resp, err));
};

const editPost = (req, resp) => {
  const { title, author, text } = req.body;
  const { id } = req.params.id;
  Post.findByIdAndUpdate(id, { title, author, text }, { new: true })
    .then((post) => resp.status(200).json(post))
    .catch(err => handleError(resp, err));
};

const getPosts = (req, resp) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => resp.status(200).json(posts))
    .catch(err => handleError(resp, err));
};

const addPost = (req, resp) => {
  const { title, author, text } = req.body;
  const post = new Post({ title, author, text });
  post.save()
    .then((post) => resp.status(200).json(post))
    .catch(err => handleError(resp, err));
};

module.exports = {
  getPost,
  editPost,
  deletePost,
  getPosts,
  addPost
};
