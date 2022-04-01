const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const postRoutes = require('./routes/post-route');
const contactsRoutes = require('./routes/contacts-routes');
const postApiRoutes = require('./routes/api-post-routes');
const createPath = require('./helpers/create-path');


const dbUri = 'mongodb+srv://euhene:22ll56vv65tt@cluster0.vq1hm.mongodb.net/node-blog?retryWrites=true&w=majority';

mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((resp) => console.log('===DB CONNECTION SUCCESSFUL==='))
  .catch((error) => console.log('DB CONNECTION ERROR', error));

const app = express();

const PORT = 3000;

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

app.use(postRoutes);
app.use(contactsRoutes);
app.use(postApiRoutes);

app.get('/about-us', (req, resp) => {
  resp.redirect('/contacts');
});

app.use((req, resp) => {
  const title = 'Error Page';
  resp
    .status(400)
    .render(createPath('error'), { title });
});
