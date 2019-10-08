var ballsOnScreen = [];

window.onload = function () {
    
    var canvas = document.getElementById('stage');
    var ctx = canvas.getContext('2d');

    document.addEventListener('mousedown', onMouseDown );
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);

    var stageWidth = canvas.width;
    var stageHeight = canvas.height;
    var offsetL = canvas.offsetLeft;
    var offsetT = canvas.offsetTop;

    var gravity = 0;
    var drag = 0.99;
    var bounce = 0.95;

    var msX;
    var msY;

    var ballsInCorner;

    for(var i = 0; i < 10; i++)
    {
        var ball = makeBall(Math.random()* stageWidth, Math.random()*stageHeight, Math.random() * 50 + 5,getRandomColor(), 1, Math.random() * 7, Math.random() * 7);
        ballsOnScreen.push(ball);
    }

    render();
    requestAnimationFrame(render);

    function render()
    {
            ctx.beginPath();
            ctx.lineWidth = "6";
            ctx.strokeStyle = "red";
            ctx.rect(20, 20, 150, 100);
            ctx.stroke();

            ballsInCorner = 0;

        for(i = 0; i < ballsOnScreen.length; i++)
        {
            ball = ballsOnScreen[i];
            ball.vx *= drag;
            ball.vy = ball.vy * drag + gravity;
            ball.x += ball.vx;
            ball.y += ball.vy;
            
            // Collision right wall
            if(ball.x > stageWidth - ball.r)
            {
                ball.x = stageWidth - ball.r;
                ball.vx *= -1;
                ball.vx *= bounce;
            }
            else if(ball.x < 0 + ball.r)
            {
                ball.x = 0 + ball.r;
                ball.vx *= -1;
                ball.vx *= bounce;
            }
            
            if(ball.y > stageHeight - ball.r)
            {
                ball.y = stageHeight - ball.r;
                ball.vy *= -1;
                ball.vy *= bounce;
            }
            else if(ball.y < 0 + ball.r)
            {
                ball.y = 0 + ball.r;
                ball.vy *= -1;
                ball.vy *= bounce;
            }
        
            if((msX > (ball.x - 60) && msX < ball.x) && (msY > (ball.y - 60) && msY < ball.y)) 
            {
                ball.vx += 0.07;
                ball.vy += 0.07;
            } 
            else if((msX < (ball.x + 60) && msX > ball.x) && (msY < (ball.y + 60) && msY > ball.y))
            {
                ball.vx -= 0.07;
                ball.vy -= 0.07;
            }

            if((msX > (ball.x - 60) && msX < ball.x) && (msY < (ball.y + 60) && msY > ball.y)) 
            {
                ball.vx += 0.07;
                ball.vy -= 0.07;
            } 
            else if((msX < (ball.x + 60) && msX > ball.x) && (msY > (ball.y - 60) && msY < ball.y))
            {
                ball.vx -= 0.07;
                ball.vy += 0.07;
            }


            if(ball.x > 400 && ball.y < 200)
            {
                ballsInCorner++;
            }

            if(ballsInCorner == 10)
            {
                ctx.fillStyle = getRandomColor();
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                document.getElementById("ballsInCorner").innerHTML = "You win!!";
            }
            else
            {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                document.getElementById("ballsInCorner").innerHTML = "Balls in the corner: " + ballsInCorner;
            }

            ctx.beginPath();
            ctx.lineWidth = "6";
            ctx.strokeStyle = "white";
            ctx.rect(400, 0, 200, 200);
            ctx.stroke();
        }

        for(i = 0; i < ballsOnScreen.length; i++)
        {
            //draw ball
            ball = ballsOnScreen[i];

            ctx.fillStyle = getRandomColor(); 
            ctx.strokeStyle = getRandomColor();
            ctx.lineWidth = 10;

            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
            
        }
        requestAnimationFrame(render);
    }
    
    

    function makeBall(x, y, r, color, speed, vx, vy)
    {
        var ball = {};
        
        ball.x = x;
        ball.y = y;
        ball.r = r;
        ball.color = color;
        ball.speed = speed;
        ball.vx = vx;
        ball.vy = vy;

        return ball;
    }

    function getRandomColor()
    {
        var str = "0123456789ABCDEF";
        var result = "#";

        for(var i = 0; i < 6; i++)
        {
            result += str.charAt(Math.floor(Math.random() * 16));     
        }

        return result;
    };

    function onMouseMove(e)
    {
        mouseX = e.pageX - offsetL;
        mouseY = e.pageY - offsetT;

        msX = mouseX;
        msY = mouseY;

        if(mouseX < 0)
        {
            mouseX = 0;
        }
        else if(mouseX > stageWidth) 
        {
            mouseX = stageWidth;
        }

        if(mouseY < 0)
        {
            mouseY = 0;
        }
        else if(mouseY > stageHeight)
        {
            mouseY = stageHeight;
        }

        console.log("mouse x =" + mouseX + "mouse Y =" + mouseY);
    }

    function onMouseUp()
    {
        console.log("bb");
    }

    function onMouseDown()
    {
        console.log("cc");
    }
}

