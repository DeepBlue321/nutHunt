export default class Scene3 extends Phaser.Scene {
  constructor() {
    super("score");
  }

  create() {
    this.add.text(220, 100, "Prohrál jsi", {
      fill: "#ffffff",
      font: "55px Arial",
    });
    this.clickButton = this.add
      .text(700 / 2 - 70, 200, "Restartovat", {
        fill: "#ffffff",
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
    console.log(localStorage.getItem("score"));
    if (localStorage.getItem("score")) {
      if (localStorage.getItem("score") < this.score) {
        localStorage.setItem("score", this.score);
      }
    } else {
      localStorage.setItem("score", this.score);
    }

    window.location.reload(false);
  }
  enterButtonHoverState() {
    this.clickButton.setStyle({ fill: "#ff0" });
  }
  enterButtonRestState() {
    this.clickButton.setStyle({ fill: "#ffffff" });
  }
}
