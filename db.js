const mongoose = require('mongoose');

const User = require('./user');

async function initializeDatabase() {
  await connectDatabase();
  await seedDatabase();
}

async function connectDatabase() {
  return await mongoose.connect('mongodb://localhost:27017/microauth', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

async function seedDatabase() {
  try {
    await User.collection.drop();
  } catch (error) {
    console.log('user collection already dropped');
  }
  
  await User.createAuthenticated({ 
    username: 'azab',
    password: 'promenade'
  });

  await User.createAuthenticated({ 
    username: 'jj',
    password: 'skyfall'
  });

  await User.createAuthenticated({ 
    username: 'yoon',
    password: 'escher'
  });
}

module.exports = initializeDatabase;