require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  socketIo = require('socket.io'),
  http = require('http'),
  authCtrl = require("./controllers/authController"),
  socketCtrl = require('./controllers/socketController')
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
const gameToJoin = [];

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.js')
})

const queueConnect = function(socket){
    
}

io.on('connection', (socket) => { 
    
    socket.on('join', ()  => {
            const serverID = socket.id
            rooms.push(serverID)
            console.log(`User ${serverID} has connected`)
    })
    socket.on('selectedGame', function(selectedGame){
        let game= selectedGame
        if(gameToJoin.length === 0){
            gameToJoin.push(game)
            console.log(gameToJoin)
        }else{
            let removed = gameToJoin.pop()
            gameToJoin.push(game)
            console.log(gameToJoin)
        } 
    })
    socket.on('queue', () => {
        let game = gameToJoin.pop()
        if(game === 'Chess'){
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
           }else{
               console.log('No one in Chess queue')
                queueChess.push(socket)
            }
        }else if(game === 'Checkers'){
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
           }else{
               console.log('No one in Checkers queue')
                queueCheckers.push(socket)
            }
        }else if(game === 'Tic-Tac-Toe'){
            if(queueTicTacToe.length !== 0){
                var opponent = queueTicTacToe.pop()
                console.log(`Connected to ${opponent.id}`)
                var ticTacToeRoom = `${socket.id}` + '' + `${opponent.id}`
                socket.join(ticTacToeRoom, () => {
                    console.log(socket.rooms)
                })
                opponent.join(ticTacToeRoom, () => {
                    console.log(opponent.rooms)
                })
           }else{
               console.log('No one in TicTacToe queue')
                queueTicTacToe.push(socket)
            }

        }
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
//SCOREBOARD ENDPOINTS
app.get(`/api/scoreboard/:id`, scoreboardCtrl.getScoreboard)