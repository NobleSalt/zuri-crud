require('dotenv/config');
const mongoose = require('mongoose');
const { User } = require('./user.model');
const { URI } = process.env;
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

require('./middleware')(app);

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once('open', (_) => {
  console.log('Database connected !');

  /**
   * C - Create
   * R - Read
   * U - Update
   * D - Delete
   */

  app.get('/', (req, res) => {
    res.send('Welcome to my Page');
  });

  // Create - create a user
  app.post('/add-user', async (req, res) => {
    try {
      const { name, email, country } = req.body;

      const data = await User.create({
        name: name.toLowerCase(),

        email: email.toLowerCase(),

        country: country.toLowerCase(),
      });

      res.send({ message: 'success', data });
    } catch (error) {
      console.log(error);
    }
  });

  // Read - get all users
  app.get('/users', async (req, res) => {
    try {
      const data = await User.find({});
      res.send(data);
    } catch (error) {
      console.log(error);
    }
  });

  // Read - get a particular user with the provided id
  app.get('/get-user/:id', async (req, res) => {
    try {
      const id = toString(req.params.id).toLowerCase();
      const data = await User.findOne({ id });
      res.send(data);
    } catch (error) {
      console.log(error);
    }
  });

  // Update - update a user's data with the provided id
  app.put('/update-user/:id', async (req, res) => {
    try {
      const { id } = req.params;
      // const { name, email, country } = req.body;

      if (id) {
        const key = { _id: id };

        let data = await User.findOneAndUpdate(key, req.body, {
          new: true,
        });
        res.send({ message: 'success', data });
      } else {
        res.send({ message: 'failed' });
      }
    } catch (error) {
      console.log(error);
    }
  });

  // Delete - delete a user's data with the provided id
  app.delete('/remove-user/:id', async (req, res) => {
    try {
      const { id } = req.params;

      if (id) {
        await User.findByIdAndDelete(id, (err) => {
          if (err) {
            res.send({ message: 'failed' });
          } else {
            res.send({ message: 'success' });
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  // 404
  app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
  });

  // 500
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send(err);
  });

  app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}!`);
  });
});

db.on('error', (err) => {
  console.error('connection error:', err);
});
