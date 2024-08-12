import Phaser from "phaser";
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import BBCodeTextPlugin from "phaser3-rex-plugins/plugins/bbcodetext-plugin";
import InputTextPlugin from "phaser3-rex-plugins/plugins/inputtext-plugin.js";
import TransitionImagePackPlugin from "phaser3-rex-plugins/templates/transitionimagepack/transitionimagepack-plugin.js";
import {Chapter1} from "./scene/1_scene.ts";
import {Chapter2} from "./scene/2_resource_load.ts";
import {Chapter3} from "./scene/3_title.ts";
import {Chapter4} from "./scene/4_bird.ts";
import {Chapter5} from "./scene/5_physics.ts";

window.onerror = function (message, source, lineno, colno, error) {
    console.error(error);
    const errorString = `Received unhandled error. Open browser console and click OK to see details.\nError: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nStack: ${error.stack}`;
    alert(errorString);
    return true;
};

// Catch global promise rejections and display them in an alert so users can report the issue.
window.addEventListener("unhandledrejection", (event) => {
    const errorString = `Received unhandled promise rejection. Open browser console and click OK to see details.\nReason: ${event.reason}`;
    console.error(event.reason);
    alert(errorString);
});

// 1920 * 1080 Full HD
// 2560 * 1440 QHD
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    parent: "app",
    scale: {
        width: 288,
        height: 512,
        mode: Phaser.Scale.FIT
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },
    plugins: {
        global: [{
            key: "rexInputTextPlugin",
            plugin: InputTextPlugin,
            start: true
        }, {
            key: "rexBBCodeTextPlugin",
            plugin: BBCodeTextPlugin,
            start: true
        }, {
            key: "rexTransitionImagePackPlugin",
            plugin: TransitionImagePackPlugin,
            start: true
        }],
        scene: [{
            key: "rexUI",
            plugin: UIPlugin,
            mapping: "rexUI"
        }]
    },
    input: {
        mouse: {
            target: "app"
        },
        touch: {
            target: "app"
        },
        gamepad: true
    },
    dom: {
        createContainer: true
    },
    pixelArt: true,
    scene: [
        Chapter1, Chapter2, Chapter3, Chapter4, Chapter5
    ],
};

const game = new Phaser.Game(config);

export default game;
