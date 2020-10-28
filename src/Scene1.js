import Scene2 from "./Scene2";

export default class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    this.load.image("background", "./Background layers/Layer_0010_1.png");
    this.load.image("10", "./Background layers/Layer_0009_2.png");
    this.load.image("9", "./Background layers/Layer_0008_3.png");
    this.load.image("8", "./Background layers/Layer_0007_Lights.png");
    this.load.image("7", "./Background layers/Layer_0006_4.png");
    this.load.image("6", "./Background layers/Layer_0005_5.png");
    this.load.image("5", "./Background layers/Layer_0004_Lights.png");
    this.load.image("4", "./Background layers/Layer_0003_6.png");
    this.load.image("3", "./Background layers/Layer_0002_7.png");
    this.load.image("2", "./Background layers/Layer_0001_8.png");
    this.load.image("1", "./Background layers/Layer_0000_9.png");

    this.load.image("tutorial", "./tutorial.png");

    this.load.spritesheet("player", "./player/veverka.png", {
      frameWidth: 32,
      frameHeight: 31,
    });

    this.load.image("ground", "./Background layers/platform.png");
    this.load.image("spike", "./player/spike.png");
    this.load.image("nut", "./player/nut.png");

    this.load.audio("audio_jump", "./audio/jump.wav");
    this.load.audio("audio_death", "./audio/death.wav");
    this.load.audio("audio_nut", "./audio/nut.wav");
  }
  create() {
    this.anims.create({
      key: "rightRun",
      frames: this.anims.generateFrameNumbers("player", { start: 32, end: 34 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "rightJump",
      frames: this.anims.generateFrameNumbers("player", { start: 32, end: 32 }),
      frameRate: 10,
      repeat: -1,
    });

    this.add.image(700 / 2, 400 / 2, "tutorial");

    this.clickButton = this.add
      .text(700 / 2 - 50, 300, "SPUSTIT", {
        fill: "#000000",
        font: "25px Arial",
      })
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => this.enterButtonHoverState())
      .on("pointerout", () => this.enterButtonRestState())
      .on("pointerdown", () => this.enterButtonActiveState())
      .on("pointerup", () => {
        this.enterButtonHoverState();
      });
  }
  enterButtonActiveState() {
    console.log(this.scene);
    this.scene.start("playGame");
  }
  enterButtonHoverState() {
    this.clickButton.setStyle({ fill: "#ff0" });
  }
  enterButtonRestState() {
    this.clickButton.setStyle({ fill: "#00000" });
  }
}
