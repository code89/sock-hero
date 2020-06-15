const socket = io()
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 1600
canvas.height = 900
ctx.fillStyle = "black"
ctx.fillRect(0, 0, canvas.width, canvas.height)

document.addEventListener('keydown', (e) => {
  movement(e.keyCode)
  console.log(e.keyCode)
})

let plNum
socket.on('code', function (data) {
  plNum = data.num
  ctx.clearRect(0, 0, canvas.width, canvas.height)
})


socket.on('player', function (data) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.font = "36px Segoe UI";
  ctx.fillStyle = "white"
  ctx.fillText(plNum, 100, 100)
  for (let i in data.players) {
    let pl = data.players[i]
    ctx.fillStyle = '#F00'
    ctx.fillRect(pl[1], pl[2], 20, 20)
  }
})

function movement(e) {
  let x = 0
  let y = 0
  switch (e) {
    case 87:
      y--
      break
    case 83:
      y++
      break
    case 65:
      x--
      break
    case 68:
      x++
      break
  }
  socket.emit('movement', {
    plNum: plNum,
    x: x,
    y: y
  })
}