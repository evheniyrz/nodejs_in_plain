const Contacts = require('../models/contacts');
const createPath = require('../helpers/create-path');

const getContacts = (req, resp) => {
  const title = 'Contacts';
  Contacts.find()
    .then((contacts) => resp.render(createPath('contacts'), { contacts, title }))
    .catch((err) => {
      console.log('DB GET CONTACTS ERROR==>', err);
      resp.render(createPath('error'), { title: 'DB GET CONTACTS ERROR' });
    });
};

module.exports = {
  getContacts
};