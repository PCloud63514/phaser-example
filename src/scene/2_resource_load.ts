export class Chapter2 extends Phaser.Scene {
    private percentText: Phaser.GameObjects.Text;
    private progressBar: Phaser.GameObjects.Graphics;
    private assetText: Phaser.GameObjects.Text;
    private delay: number = 0;

    constructor() {
        super("chapter2");
    }

    preload() {
        this.loadAssets();
        this.uiHandle();
        this.load.on("complete", () => {
            this.assetText.text = "Complete!";
            this.time.delayedCall(3500, () => {
                this.scene.start("chapter3");
            });
        });
    }

    private uiHandle() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        let midWidth = width / 2;

        this.percentText = this.add.text(midWidth, height / 2, "Loading...", {
            font: "24px Arial",
            fill: "#ffffff"
        }).setOrigin(0.5, 0.5);
        this.progressBar = this.add.graphics();
        this.progressBar.fillStyle(0x00FFFF, 0.8);

        this.load.on("progress", (value: number) => {
            this.percentText.text = (value * 100) + "%";
            this.progressBar.clear();
            this.progressBar.fillStyle(0x00FFFF, 0.8);
            this.progressBar.fillRect(midWidth - 320, 580, 640 * value, 64);
        });

        this.assetText = this.add.text(midWidth, height / 2 + 150, "", {
            font: "24px Arial",
            fill: "#ffffff"
        }).setOrigin(0.5, 0.5);

        this.load.on("fileprogress", file => {
            this.assetText.setText(file.key);
        });

        this.load.on("filecomplete", (key) => {
            switch (key) {
                case "bluebird-midflap":
                    const bluebird = this.add.image(width / 4, 100, "bluebird-midflap");
                    bluebird.setOrigin(0.3, 0);
                    bluebird.setScale(1);
                    break;
                case "redbird-midflap":
                    const redbird = this.add.image(width / 2.2, 100, "redbird-midflap");
                    redbird.setOrigin(0.5, 0);
                    redbird.setScale(1);
                    break;
                case "yellowbird-midflap":
                    const yellowbird = this.add.image(width / 1.5, 100, "yellowbird-midflap");
                    yellowbird.setOrigin(0.7, 0);
                    yellowbird.setScale(1);
                    break;
            }
        });
    }

    private loadAssets() {
        this.load.image("0", "images/0.png");
        this.load.image("1", "images/1.png");
        this.load.image("2", "images/2.png");
        this.load.image("3", "images/3.png");
        this.load.image("4", "images/4.png");
        this.load.image("5", "images/5.png");
        this.load.image("6", "images/6.png");
        this.load.image("7", "images/7.png");
        this.load.image("8", "images/8.png");
        this.load.image("9", "images/9.png");
        this.load.image("bg-day", "images/background-day.png");
        this.load.image("bg-night", "images/background-night.png");
        this.load.image("base", "images/base.png");
        this.load.image("gameover", "images/gameover.png");
        this.load.image("message", "images/message.png");
        this.load.image("pipe-green", "images/pipe-green.png");
        this.load.image("pipe-red", "images/pipe-red.png");
        this.time.delayedCall(500, () => {
            this.load.image("bluebird-downflap", "images/bluebird-downflap.png");
            this.load.image("bluebird-midflap", "images/bluebird-midflap.png");
            this.load.image("bluebird-upflap", "images/bluebird-upflap.png");
            this.load.start();
        });
        this.time.delayedCall(1000, () => {
            this.load.image("redbird-downflap", "images/redbird-downflap.png");
            this.load.image("redbird-midflap", "images/redbird-midflap.png");
            this.load.image("redbird-upflap", "images/redbird-upflap.png");
            this.load.start();
        });
        this.time.delayedCall(1500, () => {
            this.load.image("yellowbird-downflap", "images/yellowbird-downflap.png");
            this.load.image("yellowbird-midflap", "images/yellowbird-midflap.png");
            this.load.image("yellowbird-upflap", "images/yellowbird-upflap.png");
            this.load.start();
        });
        this.load.atlas('bird', "images/bird-sprite.png", "images/bird-sprite.json");
        this.load.audio("die", "audio/die.wav");
        this.load.audio("hit", "audio/hit.wav");
        this.load.audio("point", "audio/point.wav");
        this.load.audio("swoosh", "audio/swoosh.wav");
        this.load.audio("wing", "audio/wing.wav");
    }

    create() {
    }

    update(time: number, delta: number) {
    }
}
