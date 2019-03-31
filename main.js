var yyy = document.getElementById('xxx') //从html获取canvas

windowSize()


var context = yyy.getContext('2d') //声明上下文

var using = false //声明一个画圆的状态

var useEraser = false //声明橡皮的状态
eraser.onclick = function () {
    useEraser = true
}
pencil.onclick = function () {
    useEraser = false
}
thickness.onclick = function () {

}
blackPencil.onclick = function () {
    useEraser = false
    context.fillStyle = "black"
    context.strokeStyle = "black"
}
grayPencil.onclick = function () {
    useEraser = false
    context.fillStyle = "#d8d8d8"
    context.strokeStyle = "#d8d8d8"
}
bluePencil.onclick = function () {
    useEraser = false
    context.fillStyle = "#208BFF"
    context.strokeStyle = "#208BFF"
}
redPencil.onclick = function () {
    useEraser = false
    context.fillStyle = "#FF2042"
    context.strokeStyle = "#FF2042"
}
greenPencil.onclick = function () {
    useEraser = false
    context.fillStyle = "#2FD865"
    context.strokeStyle = "#2FD865"
}
yellowPencil.onclick = function () {
    useEraser = false
    context.fillStyle = "#FFDC36"
    context.strokeStyle = "#FFDC36"
}
window.onresize = function () {
    windowSize()
}
clear.onclick = function() {
    context.clearRect(0, 0, yyy.width, yyy.height)
}
undo.onclick = function () {

}
repeat.onclick = function () {

}
save.onclick = function () {
    var url = yyy.toDataURL('image/png')
    console.log(url)
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '柠檬画板'
    a.click()
}

var lastPoint = { x: undefined, y: undefined } //声明一个点

if (document.body.ontouchstart !== undefined) {
    yyy.ontouchstart = function (aaa) {
        using = true
        var x = aaa.touches[0].clientX
        var y = aaa.touches[0].clientY
        if (using) {
            if (!useEraser) {
                lastPoint = { x: x, y: y }
                drawCircle(x, y, 1)
            } else { context.clearRect(x - 10, y - 10, 20, 20) }
        }
    }
    yyy.ontouchmove = function (aaa) {
        var x = aaa.touches[0].clientX
        var y = aaa.touches[0].clientY
        if (using) {
            if (!useEraser) {
                var newPoint = { x: x, y: y }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            } else { context.clearRect(x - 10, y - 10, 20, 20) }
        }
    }

    yyy.ontouchend = function (aaa) {
        using = false
    }
} else {
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

