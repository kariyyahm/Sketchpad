
var yyy = document.getElementById('xxx') //从html获取canvas

var context = yyy.getContext('2d') //声明上下文

var lineWidth = 2
var radius = 1

windowSize()

window.onresize = function () {
    windowSize()
    reWindowSize()
}


var using = false //声明一个画圆的状态

var useEraser = false //声明橡皮的状态

eraser.onclick = function () {
    useEraser = true
    eraser.classList.add('activeBorder')
    pencil.classList.remove('activeBorder')
    thickPencil.classList.remove('activeBorder')
}
pencil.onclick = function () {
    pencil.classList.add('activeBorder')
    eraser.classList.remove('activeBorder')
    thickPencil.classList.remove('activeBorder')
    useEraser = false
    lineWidth = 2
    radius = 1
}
thickPencil.onclick = function () {
    thickPencil.classList.add('activeBorder')
    pencil.classList.remove('activeBorder')
    eraser.classList.remove('activeBorder')
    useEraser = false
    lineWidth = 6
    radius = 3
}
blackPencil.onclick = function () {
    useEraser = false
    context.fillStyle = "black"
    context.strokeStyle = "black"
    blackPencil.classList.add('activeScale')
    grayPencil.classList.remove('activeScale')
    bluePencil.classList.remove('activeScale')
    redPencil.classList.remove('activeScale')
    greenPencil.classList.remove('activeScale')
    yellowPencil.classList.remove('activeScale')
}
grayPencil.onclick = function () {
    useEraser = false
    context.fillStyle = "#d8d8d8"
    context.strokeStyle = "#d8d8d8"
    blackPencil.classList.remove('activeScale')
    grayPencil.classList.add('activeScale')
    bluePencil.classList.remove('activeScale')
    redPencil.classList.remove('activeScale')
    greenPencil.classList.remove('activeScale')
    yellowPencil.classList.remove('activeScale')
}
bluePencil.onclick = function () {
    useEraser = false
    context.fillStyle = "#208BFF"
    context.strokeStyle = "#208BFF"
    blackPencil.classList.remove('activeScale')
    grayPencil.classList.remove('activeScale')
    bluePencil.classList.add('activeScale')
    redPencil.classList.remove('activeScale')
    greenPencil.classList.remove('activeScale')
    yellowPencil.classList.remove('activeScale')
}
redPencil.onclick = function () {
    useEraser = false
    context.fillStyle = "#FF2042"
    context.strokeStyle = "#FF2042"
    blackPencil.classList.remove('activeScale')
    grayPencil.classList.remove('activeScale')
    bluePencil.classList.remove('activeScale')
    redPencil.classList.add('activeScale')
    greenPencil.classList.remove('activeScale')
    yellowPencil.classList.remove('activeScale')
}
greenPencil.onclick = function () {
    useEraser = false
    context.fillStyle = "#2FD865"
    context.strokeStyle = "#2FD865"
    blackPencil.classList.remove('activeScale')
    grayPencil.classList.remove('activeScale')
    bluePencil.classList.remove('activeScale')
    redPencil.classList.remove('activeScale')
    greenPencil.classList.add('activeScale')
    yellowPencil.classList.remove('activeScale')
}
yellowPencil.onclick = function () {
    useEraser = false
    context.fillStyle = "#FFDC36"
    context.strokeStyle = "#FFDC36"
    blackPencil.classList.remove('activeScale')
    grayPencil.classList.remove('activeScale')
    bluePencil.classList.remove('activeScale')
    redPencil.classList.remove('activeScale')
    greenPencil.classList.remove('activeScale')
    yellowPencil.classList.add('activeScale')
}

clear.onclick = function () {
    drawImage()
    // context.clearRect(0, 0, yyy.width, yyy.height)
}

var cPushArray = new Array();
var cStep = -1;
// ctx = document.getElementById('myCanvas').getContext("2d");

function cPush() {
    cStep++;
    if (cStep < cPushArray.length) {
        cPushArray.length = cStep;
    }
    cPushArray.push(yyy.toDataURL())
}
function reWindowSize() {
    if (cStep > 0) {
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () { context.drawImage(canvasPic, 0, 0); }
        /*document.title = cStep + ":" + cPushArray.length;*/
    }

}
undo.onclick = function cUndo() {
    if (cStep > 0) {
        cStep--;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () { context.drawImage(canvasPic, 0, 0); }
        /*document.title = cStep + ":" + cPushArray.length;*/
    }

}


repeat.onclick = function cRedo() {
    if (cStep < cPushArray.length - 1) {
        cStep++;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () { context.drawImage(canvasPic, 0, 0); }
    }

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
                drawCircle(x, y, radius)
            } else { context.clearRect(x - 10, y - 10, 20, 20) }
        }
    }
    yyy.ontouchmove = function (aaa) {
        var x = aaa.touches[0].clientX
        var y = aaa.touches[0].clientY
        if (using) {
            if (!useEraser) {
                var newPoint = { x: x, y: y }
                drawCircle(x, y, radius)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            } else { context.clearRect(x - 10, y - 10, 20, 20) }
        }
    }
    yyy.ontouchend = function (aaa) {
        using = false
        cPush()
    }
    drawImage()
} else {
    yyy.onmousedown = function (aaa) {
        using = true
        var x = aaa.clientX
        var y = aaa.clientY
        if (using) {
            if (!useEraser) {
                lastPoint = { x: x, y: y }
                drawCircle(x, y, radius)
            } else { context.clearRect(x - 10, y - 10, 20, 20) }
        }
    }
    yyy.onmousemove = function (aaa) {
        var x = aaa.clientX
        var y = aaa.clientY
        if (using) {
            if (!useEraser) {
                var newPoint = { x: x, y: y }
                drawCircle(x, y, radius)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            } else { context.clearRect(x - 10, y - 10, 20, 20) }
        }
    }
    yyy.onmouseup = function (aaa) {
        using = false
        cPush()
    }
    yyy.onmouseleave = function (aaa) {
        if (using) {
            using = false;
            cPush();
        }
    }
    drawImage()
}



function drawImage() {
    var image = new Image();
    image.src = 'img/bg.jpg';
    image.onload = function () {
        context.drawImage(image, 0, 0, yyy.width, yyy.height);
        cPush();
    }
}

function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
}
function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.lineWidth = lineWidth
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.stroke()
}

function windowSize() { //调整窗口尺寸
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    yyy.width = pageWidth
    yyy.height = pageHeight
}

