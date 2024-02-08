const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true
});
console.log('MongoDB URI:', process.env.MONGODB_URI);
const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});
console.log('hi');
const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  gender: String,
  phone: String,
  address: String,
  city: String,
  district: String,
  country: String,
  comment: String,
});
//console.log(userSchema);
const User = mongoose.model('User', userSchema,'users');

app.post('/api/users', async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      gender,
      phone,
      address,
      city,
      district,
      country,
      comment
    } = req.body;

    const newUser = new User({
      firstname,
      lastname,
      gender,
      phone,
      address,
      city,
      district,
      country,
      comment
    });

    await newUser.save();

    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/getusers', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/getusers/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
    console.log(user,"user");
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/updateuser/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId,'id');
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const { firstname, lastname, gender, phone, address, city, district, country, comment } = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, { 
      firstname, lastname, gender, phone, address, city, district, country, comment 
    }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
