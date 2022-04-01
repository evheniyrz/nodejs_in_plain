const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

const PORT = 3000;

const createPath = (pageName) => path.resolve(__dirname, 'ejs-views', `${pageName}.ejs`);

app.set('view engine', 'ejs');

app.listen(PORT, (err) => {
  err ? console.log('SERVER ERROR==>', err) : console.log(`Listening PORT==> ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.urlencoded({ extended: false }));

app.use(express.static('styles'));

app.get('/', (req, resp) => {
  const title = 'Home';
  resp.render(createPath('index'), { title });
});

app.get('/contacts', (req, resp) => {
  const title = 'Contacts';
  const contacts = [
    { name: 'Youtube', link: 'https://youtube.com' },
    { name: 'Twitter', link: 'https://twitter.com' },
    { name: 'GitHub', link: 'https://github.com' }
  ];
  resp.render(createPath('contacts'), { contacts, title });
});

app.get('/about-us', (req, resp) => {
  resp.redirect('/contacts');
});

app.get('/posts/:id', (req, resp) => {
  const post = {
    id: 1,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
    date: '05.05.2021',
    author: 'Me'
  };
  const title = 'Post';
  resp.render(createPath('post'), { title, post });
});

app.get('/posts', (req, resp) => {
  const posts = [
    {
      id: 1,
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
      date: '05.05.2021',
      author: 'Me',
      title: 'Awesome Post'
    }
  ];
  const title = 'Posts';
  resp.render(createPath('posts'), { title, posts });
});

app.post('/add-post', (req, resp) => {
  const { title, author, text } = req.body;
  const post = {
    id: new Date(),
    date: (new Date()).toLocaleDateString(),
    title,
    author,
    text
  };

  resp.render(createPath('post'), { title, post });
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
