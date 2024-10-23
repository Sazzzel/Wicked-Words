    import Sprite from './sprite.js';
    let assetsLoaded = 0;
    let witch = new Sprite("../Wicked-Words/assets/images/witchSprite.png", 58, 46, 2, 20, 0, 0, 2);
    witch.setPosition(1920 / 2, 1080 /2 );

    let bat = new Sprite("../Wicked-Words/assets/images/batSprite.png", 32, 32, 4, 20, 0, 0, 2.8);
    
    let pumpkin = new Sprite("../Wicked-Words/assets/images/pumpkinSprite.png", 32, 64, 3, 20, 0, 0, 1.8);

    let skeley = new Sprite("../Wicked-Words/assets/images/skeletonSprite.png", 92, 184, 3, 20, 0, 0, 0.7);

    let canvas = document.getElementById('lests');
    let ctx = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;
    let monsters = [];
    let batCount = 10;
    let cast = true;
    let ballSize = 1;
    let castSpeed = 5;
    let score = 0;
    let isPlaying = false;

    monsters.push(bat);
    monsters.push(skeley);
    monsters.push(pumpkin);
   

     // move monsters towards witch
     function moveMonsters() {
        for (let i = 0; i < monsters.length; i++) {
            // get bat distance from witch
            // adjust speed so all monsters arrive at the same time
            let baseSpeed =1;
            let distance = Math.sqrt((witch.x - monsters[i].x) * (witch.x - monsters[i].x) + (witch.y - monsters[i].y) * (witch.y - monsters[i].y));
            monsters[i].speed = baseSpeed / distance;
            const xVel =  (witch.x - monsters[i].x) * monsters[i].speed;
            const yVel = (witch.y - monsters[i].y) * monsters[i].speed;

            let dir =  Math.abs(yVel)  > Math.abs(xVel) ? (yVel > 0 ? 0 : 2) : (xVel > 0 ? 1 : 3);
        
            //dir = yVel  > 0 ? 0 : 2
            monsters[i].yFrame = dir;
            monsters[i].x += xVel;
            monsters[i].y += yVel;  
            monsters[i].update();
            monsters[i].draw(ctx);
            if(distance < 10){
                resetMonsters();
                alert('Game Over');
                newWord();
                score = 0;
            }

        }
    }

    


    function spellCast(){
        if (cast && ballSize < 2000) {
            ballSize += castSpeed;
        } else {
            ballSize = 0;
            cast = false;
        }
        witch.yFrame = 0;
       if (ballSize > 0) witch.yFrame = 1;
    }

    function resetMonsters(){
        // place all monsters in random positions at same distance from witch
        let distance = 1000;
        for (let i = 0; i < monsters.length; i++) {
            let angle = Math.random() * Math.PI * 2;
            monsters[i].x = witch.x + Math.cos(angle) * distance;
            monsters[i].y = witch.y + Math.sin(angle) * distance;
        }
    }
    

    function gameLoop(){

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 1920, 1080);
        DrawBackdrop(ctx);
        if(isPlaying){
            moveMonsters();
            witch.update();
            witch.draw(ctx);
            spellCast();
        } 

        
        
        requestAnimationFrame(gameLoop);
    }

    let start = document.querySelector('.modal-start-game').addEventListener('click' , play);
    

    function play () {
        document.getElementById("footer").style.display = "none";
        document.getElementById("main").style.display = "none";
        document.getElementById("header").style.display = "none";
        document.querySelector('.modal-backdrop').style.display = "none";
        document.querySelector('#puzzle').style.display = "block";
        resetMonsters();
        isPlaying = true;
        
        
    }
   
    gameLoop();
    




    