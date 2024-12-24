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

const TaskSchema = new Schema({
    user: String,
    heading: String,
    description: String,
    status: String, // One of 'pending', 'completed', 'aborted', 'paused'
    createdAt: Number,
    updatedAt: Number,
});
const Task = model('Task', TaskSchema);

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
            res.status(403).json({ error: 'You are not authorized to perform this operation' });
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid token' });
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
        res.status(403).json({ error: 'Invalid token' });
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

// Tasks

app.get('/tasks', authenticateUser, async (req, res) => {
    res.json(await Task.find({ user: req.user.id }))
});

app.get('/tasks/:id', authenticateUser, async (req, res) => res.json(await Task.findById(req.params.id)));

app.delete('/tasks/:id', authenticateUser, async (req, res) => {
    res.json(await Task.findByIdAndDelete(req.params.id))
});

app.post('/tasks', authenticateUser, async (req, res) => {
    const payload = req.body
    const missingField = findMissingField(payload, ['heading', 'description'])
    if (!!missingField)
        return res.status(400).json({ error: `Missing required field '${missingField}'` })
    payload.user = req.user.id
    payload.createdAt = Date.now()
    payload.updatedAt = Date.now()
    payload.status = 'pending'
    res.json(await Task.create(payload))
});

app.put('/tasks/:id', authenticateUser, async (req, res) => {
    const payload = req.body
    const missingField = findMissingField(payload, ['heading', 'description', 'status', 'createdAt'])
    if (!!missingField)
        return res.status(400).json({ error: `Missing required field '${missingField}'` })
    payload.updatedAt = Date.now()
    res.json(await Task.findByIdAndUpdate(req.params.id, payload, { new: true }))
});


///////////////////////////////////////////////////
/// RUN
///////////////////////////////////////////////////

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
