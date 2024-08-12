/**
 * 배경 그리기
 * 탭 메세지 깜빡거리게 보여주기
 * 화면 탭 시 메세지 제거 & 알럿창 호출하기
 */
export class Chapter3 extends Phaser.Scene {
    private bg: Phaser.GameObjects.Image;
    private tapMessage: Phaser.GameObjects.Image;
    private platforms: Phaser.GameObjects.Image;

    constructor() {
        super("chapter3");
    }

    preload() {
        this.uiHandle();
    }

    private uiHandle() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        this.bg = this.add.image(0, 0, "bg-day")
            .setOrigin(0, 0);

        this.platforms = this.add.image(144, 512, "base")
            .setOrigin(0.5, 1);

        this.tapMessage = this.add.image(width / 2, height / 2, "message")
            .setOrigin(0.5, 0.5)
            .setVisible(true);
        this.tweens.add({
            targets: this.tapMessage,
            alpha: {from: 1, to: 0},  // 투명도(알파) 값을 1에서 0으로 변경
            duration: 1500,             // 1초 동안 변화
            ease: 'Linear',             // 선형 보간
            repeat: -1,                 // 무한 반복
            yoyo: true,                 // 깜빡거림을 위해 yoyo 효과를 사용 (알파 값을 다시 0에서 1로 변경)
        });
    }

    create() {
        this.input.on('pointerup', () => {
            this.tapMessage.setVisible(false);
            alert("Title Tap!");
        });
    }
}
