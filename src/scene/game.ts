enum GameState {
    TITLE,
    PLAY,
    GAME_OVER
}

const pipeDownMinHeight = 100;
const pipeDownMaxHeight = 300;
const pipeMinGap = 120; // 최소 간격
const pipeMaxGap = 200; // 최대 간격

export class Game extends Phaser.Scene {
    private bg: Phaser.GameObjects.Image;
    private tapMessage: Phaser.GameObjects.Image;
    private platforms;
    private bird: Phaser.GameObjects.Sprite;
    private gameState: GameState = GameState.TITLE;

    constructor() {
        super("game");
    }

    preload() {
        this.uiHandle();
    }

    private uiHandle() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        this.bg = this.add.image(0, 0, "bg-day").setOrigin(0, 0);

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(144, 512, "base").setOrigin(0.5, 1).refreshBody();

        this.bird = this.physics.add.sprite(width / 2, height / 2 + 50, "yellowbird-midflap").setOrigin(0.5, 0.5);
        this.bird.play('fly').setVisible(false);
        this.pipes = this.physics.add.group();

        this.physics.add.collider(this.bird, this.platforms, this.hitObject, null, this);
        this.physics.add.collider(this.bird, this.pipes, this.hitObject, null, this);

        this.tapMessage = this.add.image(width / 2, height / 2, "message");
        this.tapMessage.setOrigin(0.5, 0.5).setVisible(true);
        this.tweens.add({
            targets: this.tapMessage,
            alpha: {from: 1, to: 0},  // 투명도(알파) 값을 1에서 0으로 변경
            duration: 1500,             // 1초 동안 변화
            ease: 'Linear',             // 선형 보간
            repeat: -1,                 // 무한 반복
            yoyo: true,                 // 깜빡거림을 위해 yoyo 효과를 사용 (알파 값을 다시 0에서 1로 변경)
        });

        this.gameState = GameState.TITLE;
        this.physics.pause();
    }

    create() {
        this.input.on('pointerup', () => {
            this.flap();
        });
    }

    update(time: number, delta: number) {
        super.update(time, delta);
        this.bird.rotation = Phaser.Math.Clamp(this.bird.body.velocity.y / 400, -0.5, 0.5);
    }

    flap() {
        switch (this.gameState) {
            case GameState.TITLE:
                this.gamePlay();
                break;
            case GameState.PLAY:
                this.bird.setVelocityY(-200);
                break;
            case GameState.GAME_OVER:
                this.scene.restart();
                break;
        }
    }

    addPipe() {
        if (this.gameState !== GameState.PLAY) return;
        const pipeY = Phaser.Math.Between(pipeDownMinHeight, pipeDownMaxHeight);
        const pipeGap = Phaser.Math.Between(pipeMinGap, pipeMaxGap);
        const pipeUp = this.pipes.create(288, pipeY, 'pipe-green').setOrigin(0.5, 1).setFlipY(true);
        const pipeDown = this.pipes.create(288, pipeY + pipeGap, 'pipe-green').setOrigin(0.5, 0);
        pipeUp.body.allowGravity = false;
        pipeDown.body.allowGravity = false;
        pipeUp.setVelocityX(-200);
        pipeDown.setVelocityX(-200);

        pipeUp.setImmovable(true);
        pipeDown.setImmovable(true);

        pipeUp.checkWorldBounds = true;
        pipeDown.checkWorldBounds = true;
        pipeUp.outOfBoundsKill = true;
        pipeDown.outOfBoundsKill = true;
    }

    hitObject() {
        if (this.gameState !== GameState.PLAY) return;
        this.gameOver();
    }

    gamePlay() {
        this.gameState = GameState.PLAY;
        this.physics.resume();
        this.bird.setTint(0xffffff);
        this.bird.setVisible(true);
        this.tapMessage.setVisible(false);
        this.pipeTimer = this.time.addEvent({
            delay: 1500,
            callback: this.addPipe,
            callbackScope: this,
            loop: true
        });
    }

    gameOver() {
        this.gameState = GameState.GAME_OVER;
        this.bird.setTint(0xff0000);
        this.bird.setVelocity(0, 0);
        this.pipes.setVelocityX(0);
        this.physics.pause();
        if (this.pipeTimer) {
            this.pipeTimer.remove();
        }
        this.add.image(144, 256, 'gameover').setOrigin(0.5, 0.5);
    }
}
