const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { Op } = require('sequelize');
require('dotenv').config();


async function register(req, res) {
  const { username, email, password, role } = req.body;
  try {
    // Correction ici :
    const existingUser = await User.findOne({
      where: { [Op.or]: [{ username }, { email }] }
    });
    if (existingUser) {
      return res.status(409).json({ message: 'Username or email already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword, role });

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    console.log('Tentative de connexion pour:', email);

    const user = await User.findOne({ where: { email } });
    console.log('Utilisateur trouvé:', user);

    if (!user) {
      console.log('Aucun utilisateur trouvé avec cet email.');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    console.log('Mot de passe correct ?', validPassword);

    if (!validPassword) {
      console.log('Mot de passe incorrect.');
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    console.log('JWT_SECRET:', process.env.JWT_SECRET); // doit afficher ta clé

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes en ms
      path: '/',
    });

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
}
async function getUser(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id, {
      attributes: ['id', 'username'], // J'exclus le mot de passe
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid', error: error.message });
  }
}

module.exports = {
  register,
  login,
  getUser,
};
