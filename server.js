const express = require('express');
const path = require('path');

const app = express();

const PORT = 3000;

const createPath = (pageName) => path.resolve(__dirname, 'ejs-views', `${pageName}.ejs`);

app.set('view engine', 'ejs');

app.listen(PORT, (err) => {
  err ? console.log('SERVER ERROR==>', err) : console.log(`Listening PORT==> ${PORT}`);
});

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
  const title = 'Post';
  resp.render(createPath('post'), { title });
});

app.get('/posts', (req, resp) => {
  const title = 'Posts';
  resp.render(createPath('posts'), { title });
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
