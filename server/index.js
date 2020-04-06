require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  socketIo = require('socket.io'),
  http = require('http'),
  authCtrl = require("./controllers/authController"),
  checkPlayer = require("./middleware/checkPlayer"),
  { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();

const server = http.createServer(app)
const io = socketIo(server)

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.js')
})

io.on('connection', (socket) => { 
    
    socket.on('test', ()  => {
        console.log('testing sockets')
    })

    socket.on('disconnect', () => {
        console.log('user left test')
    })
})


// server.listen(SERVER_PORT, () => console.log('Server Connected'))

app.use(express.json());

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        rejectUnauthorized: false,
        cookie:{maxAge: 1000 * 60 * 60},
        secret: SESSION_SECRET
    })
)

massive({
    connectionString: CONNECTION_STRING,
    ssl:{
        rejectUnauthorized:false
    }
}).then(db => {
    const port = SERVER_PORT
    app.set('db',db)
    server.listen(port || 4420, () => console.log(`Connected to ${port}`))
})

//AUTH ENDPOINTS
app.post('/api/auth/login', checkPlayer, authCtrl.login)
app.post('/api/auth/register', authCtrl.register)
app.post('/api/auth/logout', authCtrl.logout)
app.put('/api/auth/edit/:id', authCtrl.edit)
app.delete('/api/auth/delete/:id', authCtrl.delete)

app.get('/api/check', checkPlayer)