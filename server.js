const express = require('express')
const app = express()
const fs = require('fs')

const serv = require('http').Server(app)


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html')
  console.log('express connection')
})

app.use('/client', express.static(__dirname + '/public'))

let port = 8080
serv.listen(process.env.PORT || port, () => {
  console.log(`server started on port: ${port}`)
})



let players = []
let num = 0
let speed = 5

const io = require('socket.io')(serv, {})

io.sockets.on('connection', function (socket) {
  socket.emit('code', {
    num: num
  })
  let plX = Math.floor(Math.random() * 1600)
  let plY = Math.floor(Math.random() * 900)
  players.push([num, plX, plY])
  console.log(players)
  num++

  socket.on('movement', function (data) {
    players[data.plNum][1] += data.x * speed
    players[data.plNum][2] += data.y * speed
  })
})

function sendCode() {
  io.sockets.emit('player', {
    players: players
  })
}

let interval = setInterval(() => {
  sendCode()
}, 1000 / 10)
