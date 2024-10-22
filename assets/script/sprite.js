// Sprite class
export default class Sprite {
    constructor(imageSrc, frameWidth, frameHeight, frames, frameDelay, x, y) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.yFrame = 0;
        this.frames = frames;
        this.frameDelay = frameDelay;
        this.frameCount = 0;
        this.currentFrame = 0;
        this.x = x;
        this.y = y;
        this.isReady = false; // Indicates if the image has loaded

        // Binds the onLoad handler
        this.image.onload = () => {
            this.isReady = true;
        };

        // Optional: Handle image loading errors
        this.image.onerror = () => {
            console.error(`Failed to load image: ${imageSrc}`);
            this.isReady = false;
        };

        // If the image is already loaded (from cache), set isReady to true
        if (this.image.complete && this.image.naturalWidth !== 0) {
            this.isReady = true;
        }
    }

    // Update the sprite's frame
    update() {
        if (!this.isReady) return; // Do not update if image isn't ready

        this.frameCount++;
        if (this.frameCount >= this.frameDelay) {
            this.frameCount = 0;
            this.currentFrame++;
            if (this.currentFrame >= this.frames) {
                this.currentFrame = 0;
            }
        }
    }

    // Draw the sprite
    draw(ctx) {
        if (!this.isReady) return; // Do not draw if image isn't ready

        ctx.drawImage(
            this.image,
            this.currentFrame * this.frameWidth,
            this.yFrame * this.frameHeight,
            this.frameWidth,
            this.frameHeight,
            this.x,
            this.y,
            this.frameWidth,
            this.frameHeight
        );
    }

    // Set the sprite's position
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    // Optional: Reset the animation
    reset() {
        this.currentFrame = 0;
        this.frameCount = 0;
    }

    setYFrame(yFrame){
        this.yFrame = yFrame;
    }

    // Optional: Set a new image source
    setImage(imageSrc) {
        this.isReady = false;
        this.image.src = imageSrc;
    }
}