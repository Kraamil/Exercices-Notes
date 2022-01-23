window.onload = function () {
    var canvas = document.getElementById('drawingZone');
    var context = canvas.getContext("2d");



    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var mouseX = 0;
    var mouseY = 0;
    let holding = false;
    var size = 1;
    var psize;
    size.min='0';
    
    var color = Math.floor(Math.random()*16777215).toString(16);
    
    context.strokeStyle = "#"+color;
    context.fillStyle = '#'+color;
    context.lineWidth = 1;

    function brushSize(event) {
        psize = size;
        size += event.deltaY * -0.01;
        size = Math.round(size * 100)/100;
        if (size<0){
            size = psize;
        }
        console.log(size)
        while(document.getElementById("size").firstChild) {
            document.getElementById("size").removeChild(document.getElementById("size").firstChild);
        }
        document.getElementById("size").innerHTML += "Taille:"+size;
        return size;
    }

    function mousePosition (event) {
        var bounds = canvas.getBoundingClientRect();
        let mouseX = event.clientX - bounds.left - scrollX;
        let mouseY = event.clientY - bounds.top - scrollY;
        mouseX /= bounds.width;
        mouseY /= bounds.height;
        mouseX *= canvas.width;
        mouseY *= canvas.height;
        console.log([mouseX, mouseY]);
        return [mouseX, mouseY];
    }

    /*function draw(mousePos) {
        
        context.beginPath();
        context.moveTo(mousePos[0], mousePos[1]);
        context.lineTo(mousePos[0]+1, mousePos[1]+1);
        context.stroke();
    }*/

    function drawCircle (mousePos, size) {
        context.beginPath();
        context.arc(mousePos[0], mousePos[1], size, 0, 2 * Math.PI);
        context.fill();
        context.stroke();
    }
    

    canvas.onwheel = brushSize;
    canvas.addEventListener('click', (event) => {
        let mousePos = mousePosition(event);
        color = Math.floor(Math.random()*16777215).toString(16);
        context.fillStyle = '#'+color;
        context.strokeStyle = "#"+color;
        drawCircle(mousePos, size);
    })
    
    

    

    
    

    
}