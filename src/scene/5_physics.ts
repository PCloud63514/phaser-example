/**
 * 새 스프라이트 > physics 객체로 변경하기
 * 새의 중력 값 추가하기
 * 바닥 >  physics 객체로 변경하기
 * 바닥 충돌 시 게임 오버 처리하기
 * - 새 색상 변경
 * - 게임 오버 이미지 추가
 * - 다시 탭 시 재시작
 * 화면 탭 시 새의 가중치 변경하기
 */
export class Chapter5 extends Phaser.Scene {
    private bg: Phaser.GameObjects.Image;
    private tapMessage: Phaser.GameObjects.Image;
    private platforms: Phaser.Physics.Arcade.StaticGroup;
    private bird: Phaser.GameObjects.Sprite;

    constructor() {
        super("chapter5");
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

        this.physics.add.collider(this.bird, this.platforms, this.hitObject, null, this);
    }

    create() {
        this.input.on('pointerdown', (pointer) => {
            this.bird.setTint(0xffffff);
            this.bird.setVelocityY(-200);
        });
    }

    update(time: number, delta: number) {
        super.update(time, delta);
        this.bird.rotation = Phaser.Math.Clamp(this.bird.body.velocity.y / 400, -0.5, 0.5);
    }

    hitObject() {
        this.physics.pause();
        this.bird.setTint(0xff0000);
        const gameOver = this.add.image(144, 256, 'gameover').setOrigin(0.5, 0.5);
        gameOver.setInteractive();
        gameOver.on('pointerdown', () => {
            this.scene.start("chapter6");
        }, this);
    };
}
