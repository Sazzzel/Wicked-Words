const backdrop = new Image();

let backdropReady = false;
let scroll = 0;
let scrollMax = 1920/2;
let scrollSpeed = 0.2;
let scrollDirection = true;
backdrop.onload = function () {
    backdropReady = true;
};
backdrop.src = "../assets/images/graveBack.png";
function DrawBackdrop(ctx){
    if(!backdropReady) return;

    if(scroll > scrollMax || scroll < 0) scrollDirection  = !scrollDirection;

    scroll += scrollDirection ? 0-scrollSpeed : scrollSpeed;
    ctx.drawImage(backdrop,0-scroll,0,1920 * 1.5,1080*1.5);


}