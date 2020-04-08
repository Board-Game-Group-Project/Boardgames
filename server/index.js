require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  socketIo = require('socket.io'),
  http = require('http'),
  authCtrl = require("./controllers/authController"),
  socketCtrl = require('./controllers/socketController')
  checkPlayer = require("./middleware/checkPlayer"),
  { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();

const server = http.createServer(app)
const io = socketIo(server)

const queue = [];

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.js')
})

const queueConnect = function(socket){
    
}

io.on('connection', (socket) => { 
    
    socket.on('join', ()  => {
            const serverID = socket.id
            console.log(`User ${serverID} has connected`)
    })
    socket.on('queue', () => {
        if(queue.length !== 0){
            console.log('hit join room')
            var opponent = queue.pop()
            var chessRoom = socket.id + '' + opponent.id
            room(opponent.id) = chessRoom;
            room(socket.id) = chessRoom;
       }else{
           console.log('hit no one in socket')
            queue.push(socket)
        }
        console.log('hit queue')
    })
    socket.on('disconnect', () => {
        console.log(`User ${socket.id} left`)
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

// SOCKET ENDPOINTS
app.post(`/api/sockets/queue`, socketCtrl.queue)