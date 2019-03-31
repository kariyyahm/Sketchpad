var yyy = document.getElementById('xxx') //从html获取canvas

windowSize()

window.onresize = function () {
    windowSize()
}

var context = yyy.getContext('2d') //声明上下文

var using = false //声明一个画圆的状态

var useEraser = false //声明橡皮的状态
eraser.onclick = function () {
    useEraser = !useEraser
}

var lastPoint = { x: undefined, y: undefined } //声明一个点

yyy.onmousedown = function (aaa) {
    using = true
    var x = aaa.clientX
    var y = aaa.clientY
    if (using) {
        if (!useEraser) {
            lastPoint = { x: x, y: y }
            drawCircle(x, y, 1)
        } else { context.clearRect(x - 10, y - 10, 20, 20) }
    }
}
yyy.onmousemove = function (aaa) {
    var x = aaa.clientX
    var y = aaa.clientY
    if (using) {
        if (!useEraser) {
            var newPoint = { x: x, y: y }
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
        } else { context.clearRect(x - 10, y - 10, 20, 20) }
    }
}

yyy.onmouseup = function (aaa) {
    using = false
}

function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
}
function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.lineWidth = 2
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.stroke()
}
//context.clearRect(0, 0, canvas.width, canvas.height)
function windowSize() { //调整窗口尺寸
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    yyy.width = pageWidth
    yyy.height = pageHeight
}

