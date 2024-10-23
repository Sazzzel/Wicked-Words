    import Sprite from './sprite.js';
    let witch = new Sprite("../assets/images/witchSprite.png", 58, 46, 2, 20, 0, 0);
    witch.setPosition(1920 / 2, 1080 /2 );

    let bat = new Sprite("../assets/images/batSprite.png", 32, 32, 4, 20, 0, 0);
    
    let pumpkin = new Sprite("../assets/images/pumpkinSprite.png", 32, 64, 3, 20, 0, 0);

    //let skeley = new Sprite("../assets/images/skeletonSprite.png", 32, 32, 3, 20, 0, 0);
    
    

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

    monsters.push(bat);
    //monsters.push(skeley);
    monsters.push(pumpkin);
   
    

     // move monsters towards witch
     function moveMonsters() {
        for (let i = 0; i < monsters.length; i++) {
            // get bat distance from witch
            // adjust speed so all monsters arrive at the same time
            let baseSpeed =1;
            let distance = Math.sqrt((witch.x - monsters[i].x) * (witch.x - monsters[i].x) + (witch.y - monsters[i].y) * (witch.y - monsters[i].y));
            monsters[i].speed = baseSpeed / distance;
            
            monsters[i].x += (witch.x - monsters[i].x) * monsters[i].speed;
            monsters[i].y += (witch.y - monsters[i].y) * monsters[i].speed;
            monsters[i].update(ctx);
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
        ctx.fillRect(0, 0, 1920, 1080);
        moveMonsters();

        witch.update();
        witch.draw(ctx);
        spellCast();
        requestAnimationFrame(gameLoop);
    }

    function play () {
        document.getElementById("foot").style.display = "none";
        document.getElementById("main").style.display = "none";
        document.getElementById("head").style.display = "none";
        gameLoop();
        
    }

   play();


    