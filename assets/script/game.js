    /* jshint esversion: 6 */
    import Sprite from './sprite.js';
    const castBubble = new Image();
    const lWordModal = document.getElementById("lostWord");
    const gameOverModal = document.getElementById("gameOverModal");
    gameOverModal.style.visibility = "hidden";
    castBubble.src = "..Wicked/assets/images/castBubble.png";
    const witch = new Sprite("../Wicked-Words/assets/images/witchSprite.png", 58, 46, 2, 20, 0, 0, 2);
    witch.setPosition((1920 / 2) -58, (1080 /2) - 46);

    let bat = new Sprite("../Wicked-Words/assets/images/batSprite.png", 32, 32, 4, 20, 0, 0, 2.8);
    
    let pumpkin = new Sprite("../Wicked-Words/assets/images/pumpkinSprite.png", 32, 64, 3, 20, 0, 0, 1.8);

    let skeley = new Sprite("../Wicked-Words/assets/images/skeletonSprite.png", 92, 184, 3, 20, 0, 0, 0.7);



    const lsModal = document.getElementById("landscapeModal");
    // HTML Score Holder
    const SCORE_DIV = document.getElementById("score");

    
    let canvas = document.getElementById('lests');
    let ctx = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;
    let monsters = [];

    let cast = false;
    let ballSize = 1;
    let castSpeed = 20;
    let score = 0;
    let isPlaying = false;
    let lostWord= "";

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
        
            function pauseAudio() {
                audio2.pause();
            }
            
            monsters[i].yFrame = dir;
            monsters[i].x += xVel;
            monsters[i].y += yVel;  
            monsters[i].update();
            monsters[i].draw(ctx);
            if(distance < 10){
                gameOverModal.style.visibility = "visible";
                SCORE_DIV.innerHTML = "Score :" + score;
                resetMonsters();
                pauseAudio();
                lostWord = puzzle;
                lWordModal.innerHTML = lostWord;
                newWord();
                score = 0;
                isPlaying = false;
            }

        }
    }

    


    function spellCast(){
        if (cast && ballSize < 2000) {
            ballSize += castSpeed;
        } else if (cast) {
            ballSize = 0;
            cast = false;
            resetMonsters();
            newWord();
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
        const mode =  window.innerWidth > window.innerHeight ? "none" : "block";
        lsModal.style.display = mode;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 1920, 1080);
        DrawBackdrop(ctx);
        if(isPlaying){
            document.body.classList.remove('modal-open');
            moveMonsters();
            witch.update();
            witch.draw(ctx);
            ctx.drawImage(castBubble, (width / 2) - (ballSize / 2) , (height / 2) - (ballSize / 2), ballSize, ballSize);
            spellCast();
            ctx.fillStyle = "white";
            ctx.font = "30px Arial";
            ctx.fillText("Score : " + score,50,50);
        } else {
            
            document.body.classList.add('modal-open');
        }

        
        
        requestAnimationFrame(gameLoop);
    }

    const audio1 = new Audio("../Wicked-Words/assets/audio/Witch.mp3");
    const audio2 = new Audio("../Wicked-Words/assets/audio/COAP.mp3");

    function play () {
        
        document.getElementById("footer").style.display = "none";
        document.getElementById("main").style.display = "none";
        document.getElementById("how-to-play").style.display = "none";
        document.getElementById("header").style.display = "none";
        document.querySelector('.modal-backdrop').style.display = "none";
        document.querySelector('#puzzle').style.display = "block";
        document.querySelector('#puzzle-style').style.display = "block";
        audio1.play();
        audio1.volume = 0.1;
        audio2.play();
        audio2.volume = 0.1; 
        audio2.loop = true;          
        document.getElementById("answer").focus();
        gameOverModal.style.visibility = "hidden";
        resetMonsters();
        isPlaying = true;
        
        
    }
    document.getElementById('answer').addEventListener('keyup', function(e){
        
        if(e.keyCode == 13){
            if(document.getElementById('answer').value == puzzle){
                cast = true;

              
                document.getElementById('answer').value = '';   
                score+= gameType == "shuffle" ?  20 : 5;
                
              
                const scorePerLevel = gameType === "shuffle" ? 200 : 50 ;
                level = Math.floor(score / scorePerLevel) + 1;
                level = level > 6 ? 6 : level;

               
                
            }
            
        }

        
        
    
    });
    document.querySelector('.modal-start-game').addEventListener('click' , play);
    document.querySelector('.btn-retry').addEventListener('click' , play);
    gameLoop();
   
    
    




    