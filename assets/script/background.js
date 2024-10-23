/* jshint esversion: 6 */
const backdrop = new Image();

let backdropReady = false;
let bScroll = 0;
const scrollMax = 1920/2;
const scrollSpeed = 0.2;
let scrollDirection = true;

backdrop.onload = function () {
    backdropReady = true;
};

backdrop.src = "../Wicked-Words/assets/images/graveBack.png";
function DrawBackdrop(ctx){
    if(!backdropReady) return;

    if(bScroll > scrollMax || bScroll < 0) scrollDirection  = !scrollDirection;

    bScroll += scrollDirection ? 0-scrollSpeed : scrollSpeed;
    ctx.drawImage(backdrop,0-bScroll,0,1920 * 1.5,1080*1.5);


}