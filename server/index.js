require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  socketIo = require('socket.io'),
  http = require('http'),
  authCtrl = require("./controllers/authController"),
  checkPlayer = require("./middleware/checkPlayer"),
  scoreboardCtrl = require('./controllers/scoreboardController'),
  { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();

const server = http.createServer(app)
const io = socketIo(server)

const rooms = [];
const queueChess = [];
const queueCheckers = [];
const queueTicTacToe = [];
const ticTactToeJoin = [];

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.js')
})

io.on('connection', (socket) => { 
    
    socket.on('join', ()  => {
            const serverID = socket.id
            rooms.push(serverID)
            console.log(`User ${serverID} has connected`)
    })
    // Queue Socket Stuff
    socket.on('queue', function(game){
        let selectedGame = game
        if(selectedGame === 'Chess'){
            if(queueChess.length !== 0){
                var opponent = queueChess.pop()
                console.log(`Connected to ${opponent.id}`)
                var chessRoom = `${socket.id}` + '' + `${opponent.id}`
                socket.join(chessRoom, () => {
                    console.log(socket.rooms)
                })
                opponent.join(chessRoom, () => {
                    console.log(opponent.rooms)
                })
                socket.to(chessRoom).emit('joinChess');
                socket.emit('joinChess')
           }else{
               console.log('No one in Chess queue')
                queueChess.push(socket)
            }
        }else if(selectedGame === 'Checkers'){
            if(queueCheckers.length !== 0){
                var opponent = queueChess.pop()
                console.log(`Connected to ${opponent.id}`)
                var checkersRoom = `${socket.id}` + '' + `${opponent.id}`
                socket.join(checkersRoom, () => {
                    console.log(socket.rooms)
                })
                opponent.join(checkersRoom, () => {
                    console.log(opponent.rooms)
                })
                socket.to(checkersRoom).emit('joinCheckers')
                socket.emit('joinCheckers')

           }else{
               console.log('No one in Checkers queue')
                queueCheckers.push(socket)
            }
        }else if(selectedGame === 'Tic-Tac-Toe'){
            if(queueTicTacToe.length !== 0){
                var opponent = queueTicTacToe.pop()
                console.log(`Connected to ${opponent.id}`)
                var ticTacToeRoom = `${socket.id}` + '' + `${opponent.id}`
                socket.join(ticTacToeRoom)
                opponent.join(ticTacToeRoom)
                rooms.push(ticTacToeRoom)
                socket.to(ticTacToeRoom).emit('joinTicTacToe');
                socket.emit('joinTicTacToe')

           }else{
               console.log('No one in TicTacToe queue')
                queueTicTacToe.push(socket)
            }

        }
    })
    
    socket.on('leaveQueue', () => {
        queueChess.forEach(e => {
            if(e.id === socket.id){
                queueChess.pop()
            }
        })
        queueTicTacToe.forEach(e => {
            if(e.id === socket.id){
                queueTicTacToe.pop()
            }
        })
        queueCheckers.forEach(e => {
            if(e.id === socket.id){
                queueCheckers.pop()
            }
        })
    })
    // TicTacToe Socket Stuff
    socket.on('ticTacToeRoom', () => {
        ticTactToeJoin.push(socket)
        if(ticTactToeJoin.length === 2){
            let user = ticTactToeJoin.pop()
            let opponent = ticTactToeJoin.pop()
            var room = `${user.id}` + `${opponent.id}`
            socket.join(room)
            opponent.join(room)
            game = io.of(`${room}`)
            socket.emit('setX', room)
            opponent.emit('setO', room)
            game.emit('connect')   
        }
    })
    
    
    
    socket.on('leaveGame', () => {
        console.log(socket.id)
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

//SCOREBOARD ENDPOINTS
app.get(`/api/scoreboard/:id`, scoreboardCtrl.getScoreboard)