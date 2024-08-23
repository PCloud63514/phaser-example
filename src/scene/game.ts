enum GameState {
    TITLE,
    PLAY,
    GAME_OVER
}

export class Game extends Phaser.Scene {
    private bird: Phaser.Physics.Arcade.Sprite;
    private pipes: Phaser.Physics.Arcade.Group;
    private gameState: GameState = GameState.TITLE;

    constructor() {
        super("game");
    }

    create() {
        this.physics.pause();
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        let container = this.add.container(0, 0);
        let bg = this.add.image(0, 0, "bg-day")
            .setOrigin(0, 0);
        let platform = this.physics.add.staticImage(0, height -50, "base")
            .setOrigin(0, 0)
            // .setSize(336, 112) // setSize()를 호출하여 physics 객체의 크기를 변경
            // .setOffset(0, 0) // setOffset()을 호출하여 physics 객체의 오프셋을 변경
            .refreshBody(); // refreshBody()를 호출하여 physics 객체를 갱신

        this.pipes = this.physics.add.group();


        this.bird = this.physics.add.sprite((width / 2)- 80, (height / 2) + 35, "yellowbird-midflap")
            .setOrigin(0, 0)
            .setCollideWorldBounds(true) // 화면 경계에 부딪혔을 때 경계 밖으로 나가지 못함
            .refreshBody()
            .setVisible(false);

        this.physics.add.collider(this.bird, platform, this.hitObject, null, this);
        this.physics.add.collider(this.bird, this.pipes, this.hitObject, null, this);

        let tapMessage = this.add.image(width / 2, height / 2, "message")
            .setOrigin(0.5, 0.5);


        container.add([bg, platform, tapMessage]);
        this.addPipe();
        this.input.on('pointerup', () => {
            switch (this.gameState) {
                case GameState.TITLE:
                    this.gameState = GameState.PLAY;
                    container.remove(tapMessage, true);
                    tapMessage.setVisible(false);
                    this.bird.setVisible(true);
                    this.pipeTimer = this.time.addEvent({
                        delay: 2000,
                        callback: () => {
                            this.addPipe();
                            this.pipeTimer.delay = Phaser.Math.Between(800, 2000); // 다음 딜레이를 랜덤으로 설정
                        },
                        callbackScope: this,
                        loop: true
                    });
                    this.physics.resume();
                    break;
                case GameState.PLAY:
                    this.bird.setVelocityY(-200);
                    break;
                case GameState.GAME_OVER:
                    this.scene.restart();
                    break;
            }
        });
    }

    update(time: number, delta: number) {
        super.update(time, delta);
        this.bird.rotation = Phaser.Math.Clamp(this.bird.body.velocity.y / 400, -0.5, 0.5);
    }

    addPipe() {
        if (this.gameState !== GameState.PLAY) return;
        const pipeType = Phaser.Math.Between(1, 2);
        const pipeX = 330;
        const pipeGap = Phaser.Math.Between(120, 300);
        const pipeY = Phaser.Math.Between(80, 200);

        if (1 == pipeType) {
            const pipeUp = this.pipes.create(pipeX, pipeY, 'pipe-green').setOrigin(0.5, 1).setFlipY(true);
            pipeUp.body.allowGravity = false;
            pipeUp.setVelocityX(-150);
            pipeUp.setImmovable(true);
            pipeUp.checkWorldBounds = true;
            pipeUp.outOfBoundsKill = true;
        }

        const pipeDown = this.pipes.create(pipeX, (pipeY + pipeGap) > 500 ? 500 : pipeY + pipeGap, 'pipe-green').setOrigin(0.5, 0);
        pipeDown.body.allowGravity = false;
        pipeDown.setVelocityX(-150);
        pipeDown.setImmovable(true);
        pipeDown.checkWorldBounds = true;
        pipeDown.outOfBoundsKill = true;
    }

    hitObject() {
        if (this.gameState !== GameState.PLAY) return;
        this.gameOver();
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
