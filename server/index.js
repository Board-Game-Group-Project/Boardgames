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
const chessFiller = [];
const queueCheckers = [];
const queueTicTacToe = [];
const tttRooms = [];
const tttJoin = [];

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
    // Chess Socket Stuff
    socket.on('chessQueue', () => {
        if(queueChess.length !== 0){
            var player1 = socket
            var player2 = queueChess.pop()
            console.log(`Connected to ${player2.id}`)
            var chessRoom = `${player1.id}` + '' + `${player2.id}`
            player1.join(chessRoom)
            player2.join(chessRoom)            
            // socket.to(chessRoom).emit('roomJoined',chessRoom)
            player1.emit('roomJoined',chessRoom)
            player1.emit('setWhite')
       }else{
           console.log('No one in Chess queue')
            queueChess.push(socket)
        }
    })
    socket.on('chessSetPlayers', (room) => {
        
        socket.to(room).emit('roomJoinedOpponent',room)
        socket.to(room).emit('setBlack')
                
    })
    socket.on('chessNextTurn', function(room,newBoard,turnInfo){
        const player2 = room
        socket.to(player2).emit('chessUpdateInfo',newBoard,turnInfo)
    })
    socket.on('chessEndGame', function(room,victory,winner){
        const player2 = room
        socket.to(player2).emit('chessFinish',victory,winner)
    })

    // TicTacToe Socket Stuff
    socket.on('tttQueue', () => {
        if(queueTicTacToe.length !== 0){
            var player1 = socket
            var player2 = queueTicTacToe.pop()
            console.log(`Connected to ${player2.id}`)
            var tttRoom = `${player1.id}` + '' + `${player2.id}`
            player1.join(tttRoom)
            player2.join(tttRoom)
            tttRooms.push({player1,player2,tttRoom})
            // socket.to(tttRoom).emit('tttRoomJoined',tttRoom)
            player1.emit('tttRoomJoined',tttRoom)
            player1.emit('setX')
       }else{
           console.log('No one in TicTacToe queue')
            queueTicTacToe.push(socket)
        }
    })
    socket.on('tttSetPlayers', (room) => {
        console.log('hit')
        socket.to(room).emit('tttOpponentJoin',room)
        socket.to(room).emit('setO')
    })
    socket.on('tttNextTurn', function(board,room,turn){
        socket.to(room).emit('nextTurn',board,turn)
    })

    socket.on('leaveGame', () => {
        console.log(socket.id)
    })
    socket.on('disconnect', () => {
        console.log(`User ${socket.id} left`)
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