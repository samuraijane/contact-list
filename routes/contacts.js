const router = require('express').Router();
const Sequelize = require('sequelize');
const { User } = require('../models');

router.post('/add', async (req, res) => {
  const { email, name } = req.body;

  const newUser = await User.create({
    email,
    name
  });


  res.json({
    id: newUser.id
  });
});

router.get('/add', (req, res) => {
  res.render('contact-form', {
    partials: {
      footer: 'partials/footer',
      head: 'partials/head',
      header: 'partials/header',
    }
  });
});

const buildContactsList = async () => {
  const contacts = await User.findAll();

  const html = contacts.map((contact) => {
    return `
      <li id="${contact.id}">${contact.name}</li>
    `;
  }).join('');

  return html;
}

router.get('/list', async (req, res) => {

  const html = await buildContactsList();

  res.render('contact-list', {
    locals: {
      contacts: html
    },
    partials: {
      footer: 'partials/footer',
      head: 'partials/head',
      header: 'partials/header',
    }
  });
})

router.post('/edit', async (req, res) => {
  const { name, id } = req.body;
  const updatedUser = await User.update(req.body, {
    where: {
      id
    }
  });
  
  res.json({
    message: `You successfully updated ${updatedUser} record with the name ${name}`
  })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.destroy({
      where: {
          id
      }
  });
  res.json({
    success: true
  });
});

module.exports = router;

