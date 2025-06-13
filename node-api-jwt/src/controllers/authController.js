const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
    constructor(User) {
        this.User = User;
    }

    async register(req, res) {
        const { username, password } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await this.User.create({ username, password: hashedPassword });
            res.status(201).json({ message: 'User registered successfully', user: { id: newUser.id, username: newUser.username } });
        } catch (error) {
            res.status(500).json({ message: 'Error registering user', error });
        }
    }

    async login(req, res) {
        const { username, password } = req.body;
        try {
            const user = await this.User.findOne({ where: { username } });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const token = this.generateToken(user.id);
            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error });
        }
    }

    generateToken(userId) {
        return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
    }
}

module.exports = AuthController;