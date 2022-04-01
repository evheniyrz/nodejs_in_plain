const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Post = require('./models/post');
const Contacts = require('./models/contacts');

const dbUri = 'mongodb+srv://euhene:22ll56vv65tt@cluster0.vq1hm.mongodb.net/node-blog?retryWrites=true&w=majority';

mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((resp) => console.log('===DB CONNECTION SUCCESSFUL==='))
  .catch((error) => console.log('DB CONNECTION ERROR', error));

const app = express();

const PORT = 3000;

const createPath = (pageName) => path.resolve(__dirname, 'ejs-views', `${pageName}.ejs`);

app.set('view engine', 'ejs');

app.listen(PORT, (err) => {
  err ? console.log('SERVER ERROR==>', err) : console.log(`Listening PORT==> ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use(express.static('styles'));

app.get('/', (req, resp) => {
  const title = 'Home';
  resp.render(createPath('index'), { title });
});

app.get('/contacts', (req, resp) => {
  const title = 'Contacts';
  Contacts.find()
    .then((contacts) => resp.render(createPath('contacts'), { contacts, title }))
    .catch((err) => {
      console.log('DB GET CONTACTS ERROR==>', err);
      resp.render(createPath('error'), { title: 'DB GET CONTACTS ERROR' });
    });
});

app.get('/about-us', (req, resp) => {
  resp.redirect('/contacts');
});

app.get('/posts/:id', (req, resp) => {
  const title = 'Post';
  Post.findById(req.params.id)
    .then((post) => {
      resp.render(createPath('post'), { title, post })
    })
    .catch((err) => {
      console.log('DB GET SINGLE POST ERROR==>', err);
      resp.render(createPath('error'), { title: 'DB GET SINGLE POST ERROR' });
    });
});

app.get('/edit/:id', (req, resp) => {
  const title = 'Edit Post';
  Post.findById(req.params.id)
    .then((post) => {
      resp.render(createPath('edit-post'), { title, post })
    })
    .catch((err) => {
      console.log('DB GET SINGLE POST ERROR==>', err);
      resp.render(createPath('error'), { title: 'DB GET SINGLE POST ERROR' });
    });
});

app.put('/edit/:id', (req, resp) => {
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
});

app.delete('/posts/:id', (req, resp) => {
  const title = 'Post';
  Post.findByIdAndDelete(req.params.id)
    .then((result) => {
      resp.sendStatus(200);
    })
    .catch((err) => {
      console.log('DB GET SINGLE POST ERROR==>', err);
      resp.render(createPath('error'), { title: 'DB GET SINGLE POST ERROR' });
    });
});

app.get('/posts', (req, resp) => {
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
});

app.post('/add-post', (req, resp) => {
  const { title, author, text } = req.body;
  const post = new Post({ title, author, text });

  post.save()
    .then((result) => resp.redirect('/posts'))
    .catch((err) => {
      console.log('DB SEND POST ERROR==>', err);
      resp.render(createPath('error'), { title: 'DB SEND POST ERROR' });
    });
});

app.get('/add-post', (req, resp) => {
  const title = 'Add post';
  resp.render(createPath('add-post'), { title });
});

app.use((req, resp) => {
  const title = 'Error Page';
  resp
    .status(400)
    .render(createPath('error'), { title });
});
