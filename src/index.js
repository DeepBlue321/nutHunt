import Phaser from "phaser";
import Scene1 from "./Scene1";
import Scene2 from "./Scene2";
import Scene3 from "./Scene3";

var scene = new Phaser.Scene("game");
var config = {
  type: Phaser.AUTO,
  width: 700,
  height: 400,
  PixelArt: true,
  scene: [Scene1, Scene2, Scene3],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 400 },
      debug: false,
    },
  },
};
console.log(config);
var game = new Phaser.Game(config);
