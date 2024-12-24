import express, { json } from 'express';
import { connect, Schema, model } from 'mongoose';
import jwt from 'jsonwebtoken';
import { hash, compareSync } from 'bcrypt';
import cors from "cors"

///////////////////////////////////////////////////
/// CONSTANTS
///////////////////////////////////////////////////

const PORT = 8000;
const SECRET_KEY = '15625526-c13c-11ef-9930-6f600bdac650';

///////////////////////////////////////////////////
/// SETUP
///////////////////////////////////////////////////

const app = express();
app.use(cors())
app.use(json());

connect('mongodb://127.0.0.1:27017/web-final', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

///////////////////////////////////////////////////
/// MODELS
///////////////////////////////////////////////////

const UserSchema = new Schema({
    username: String,
    password: String,
    role: String
});
const User = model('User', UserSchema);

const MovieSchema = new Schema({
    title: String,
    description: String,
    ratings: Number,
    director: String,
    year: Number,
});
const Movie = model('Movie', MovieSchema);

///////////////////////////////////////////////////
/// HELPERS
///////////////////////////////////////////////////

function findMissingField(obj, fields) {
    return fields.find(f => !obj.hasOwnProperty(f)) || null
}

///////////////////////////////////////////////////
/// MIDDLEWARE
///////////////////////////////////////////////////

function authenticateAdmin(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'No token provided' });
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        if (!decoded || decoded.role !== 'admin')
            res.status(403).json({error: 'You are not authorized to perform this operation'});
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ error : 'Invalid token'});
    }
}

function authenticateUser(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'No token provided' });
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid token'});
    }
}

///////////////////////////////////////////////////
/// ROUTES
///////////////////////////////////////////////////

// Auth

app.post('/register', async (req, res) => {
    const payload = req.body
    let missingField = findMissingField(payload, ['username', 'password'])
    if (!!missingField)
        return res.status(400).json({ error: `Missing required field '${missingField}'` })
    const duplicate = await User.findOne({ username: payload.username })
    if (!!duplicate)
        return res.status(400).json({ error: `User '${payload.username}' already exists` })
    const hashedPassword = await hash(payload.password, 10);
    const user = await User.create({ role: payload.admin ? 'admin' : 'user', username: payload.username, password: hashedPassword });
    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token })
});

app.post('/login', async (req, res) => {
    const payload = req.body;
    let missingField = findMissingField(payload, ['username', 'password'])
    if (!!missingField)
        return res.status(400).json({ error: `Missing required field '${missingField}'` })
    const user = await User.findOne({ username: payload.username });
    if (!user || !(compareSync(payload.password, user.password)))
        return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

app.get('/user', authenticateUser, async (req, res) => {
    res.status(200).json({ user: req.user })
})

// Movies (Example)

app.get('/movies', async (_, res) => res.json(await Movie.find()));
app.get('/movies/:id', async (req, res) => res.json(await Movie.findById(req.params.id)));
app.post('/movies', authenticateAdmin, async (req, res) => {
    const missingField = findMissingField(req.body, ['title', 'description', 'year', 'ratings', 'director'])
    if (!!missingField)
        return res.status(400).json({ error: `Missing required field '${missingField}'` })
    res.json(await Movie.create(req.body))
});
app.put('/movies/:id', authenticateAdmin, async (req, res) => {
    const missingField = findMissingField(req.body, ['title', 'description', 'year', 'ratings', 'director'])
    if (!!missingField)
        return res.status(400).json({ error: `Missing required field '${missingField}'` })
    res.json(await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true }))
});
app.delete('/movies/:id', authenticateAdmin, async (req, res) => res.json(await Movie.findByIdAndDelete(req.params.id)));


///////////////////////////////////////////////////
/// RUN
///////////////////////////////////////////////////

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
