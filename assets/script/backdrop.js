const backdrop = new Image();
backdrop.src = "../assets/images/graveBack.png";
let backdropReady = false;
let scroll = 0;
let scrollMax = 1920/2;
let scrollSpeed = 2;
let scrollDirection = true;
backdrop.onload(){
 backdropReady=true;
}

function DrawBackdrop(ctx){
 ctx.drawImage(backdrop,scroll,0,1920 * 1.5,1080*1.5);
 if(scroll > scrollMax || scroll < 0)  
    scrollDirection  = !scrollDirection;
    scroll += scrollDirection ? 0-scrollSpeed : scrollSpeed;
}