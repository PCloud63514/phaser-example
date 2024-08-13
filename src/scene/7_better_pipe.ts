/**
 * 더 다양하게 등장하는 파이프 추가하기
 * - 파이프가 n개 화면에 나올 수 있도록
 * - 화면 끝 이동한 파이프는 다시 재활용되도록
 * - 파이프 간 상하 좌우 간격이 다양하도록
 * - 최소한 플레이어가 게임을 진행할 수 있는 최소 간격을 확보하도록
 */
import Phaser from "phaser";

class PipeManager {
    private scene: Phaser.Scene;
    private _pipes: Phaser.Physics.Arcade.Group;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this._pipes = this.scene.physics.add.group();
    }

    get pipes() {
        return this._pipes;
    }

    start() {}

    stop() {}

    addPipe() {}

    update() {}

}

export class Chapter7 extends Phaser.Scene {
    private bg: Phaser.GameObjects.Image;
    private tapMessage: Phaser.GameObjects.Image;
    private platforms: Phaser.Physics.Arcade.StaticGroup;
    private pipeManager: PipeManager;
    private bird: Phaser.GameObjects.Sprite;
    private pipeTimer;
    constructor() {
        super("chapter7");
    }

    preload() {
        this.uiHandle();
    }

    private uiHandle() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        this.bg = this.add.image(0, 0, "bg-day")
            .setOrigin(0, 0);

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(144, 512, "base")
            .setOrigin(0.5, 1)
            .refreshBody();

        this.tapMessage = this.add.image(width / 2, height / 2, "message")
            .setOrigin(0.5, 1)
            .setVisible(false);

        this.tweens.add({
            targets: this.tapMessage,
            alpha: {from: 1, to: 0},  // 투명도(알파) 값을 1에서 0으로 변경
            duration: 1500,             // 1초 동안 변화
            ease: 'Linear',             // 선형 보간
            repeat: -1,                 // 무한 반복
            yoyo: true,                 // 깜빡거림을 위해 yoyo 효과를 사용 (알파 값을 다시 0에서 1로 변경)
        });

        this.bird = this.physics.add.sprite(width / 2, height / 2 + 50, "bird", 'yellowbird-2')
            .setOrigin(0.5, 0.5)
            .setCollideWorldBounds(true); // 화면 경계에 부딪혔을 때 경계 밖으로 나가지 못함
        this.bird.checkWorldBounds = false; // 객체가 화면 밖으로 벗어났을 때 트리거를 호출할지 여부 (setCollideWorldBounds와 관계 없음)
        this.bird.outOfBoundsKill = false; // 객체가 밖으로 이동할 경우 제거할지 (기본 false)

        this.pipeManager = new PipeManager(this);

        this.physics.add.collider(this.bird, this.platforms, this.hitObject, null, this);
        this.physics.add.collider(this.bird, this.pipeManager.pipes, this.hitObject, null, this);
    }

    create() {
        this.input.on('pointerdown', (pointer) => {
            this.bird.setTint(0xffffff);
            this.bird.setVelocityY(-200);
        });
        this.pipeManager.start();
    }

    update(time: number, delta: number) {
        super.update(time, delta);
        this.bird.rotation = Phaser.Math.Clamp(this.bird.body.velocity.y / 400, -0.5, 0.5);
        this.pipeManager.update();
    }

    hitObject() {
        this.physics.pause();
        this.pipeManager.stop();
        this.bird.setTint(0xff0000);
        const gameOver = this.add.image(144, 256, 'gameover').setOrigin(0.5, 0.5);
        gameOver.setInteractive();
        gameOver.on('pointerdown', () => {
        }, this);
    };
}
