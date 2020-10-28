import Scene3 from "./Scene3";
export default class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
    this.gameOver = false;
    this.isIdle = true;
    this.hardLevel = 0.1;
    this.score = 0;
    this.bestScore =
      localStorage.getItem("score") != undefined
        ? localStorage.getItem("score")
        : 0;
  }

  create() {
    this.loadBackgound();
    this.loadPlayer();
    this.loadEnviroment();
    this.loadAudio();
    this.player.anims.play("rightRun");

    this.timer = setInterval(() => {
      let random = Phaser.Math.FloatBetween(0, 1);

      if (random < this.hardLevel) {
        this.makeSpike();
      }
      if (random < 0.3) {
        this.makePlatform();
      }
      if (random < 0.3) {
        this.makeNut();
      }

      this.hardLevel += 0.02;
    }, 800);
    this.scoreText = this.add.text(20, 20, "Skóre: " + this.score, {
      font: "25px Arial",
      fill: "white",
    });
    this.bestScoreText = this.add.text(
      20,
      50,
      "Nejlepší skóre: " + this.bestScore,
      {
        font: "15px Arial",
        fill: "white",
      }
    );

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.gameOver) {
      return;
    }

    this.constrols();

    for (let i = 0; i <= 10; i++) {
      this.paralax[i].tilePositionX += 0.35 * i;
    }
    for (let i = 0; i < this.nuts.getChildren().length; i++) {
      this.nuts.getChildren()[i].angle -= 9;
    }
  }

  loadBackgound() {
    this.paralax = [];
    this.backArray = [
      "background",
      "10",
      "9",
      "8",
      "7",
      "6",
      "5",
      "4",
      "3",
      "2",
      "1",
    ];

    for (let i = 0; i <= 10; i++) {
      this.paralax[i] = this.add.tileSprite(
        0,
        -380,
        700,
        500 + 380,
        this.backArray[i]
      );
      this.paralax[i].setOrigin(0, 0);
    }
  }

  loadPlayer() {
    this.player = this.physics.add.sprite(200, 50, "player");
    this.player.setFrictionX(0.5);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
  }
  loadEnviroment() {
    this.platforms = this.physics.add.group();

    this.spikes = this.physics.add.group();

    this.nuts = this.physics.add.group();

    this.physics.add.overlap(this.player, this.spikes, this.death, null, this);

    this.platforms
      .create(320, 410, "ground")
      .refreshBody()
      .setImmovable(true)
      .body.setAllowGravity(false);
    this.platforms.getChildren()[0].visible = false;

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.nuts, this.platforms);
    this.physics.add.overlap(
      this.player,
      this.nuts,
      this.gainScore,
      null,
      this
    );
  }

  makeSpike() {
    this.spikes
      .create(800, 340, "spike")
      .setScale(0.11)
      .refreshBody()
      .setImmovable(true)
      .setVelocity(-200, 0)
      .body.setAllowGravity(false);
  }

  death() {
    console.log("csor");
    this.physics.pause();
    this.player.setTint(0xff0000);
    this.player.anims.play("rightJump");
    this.deathSound.play();
    this.gameOver = true;
    clearInterval(this.timer);
    this.scene.score = this.score;

    if (localStorage.getItem("score")) {
      if (localStorage.getItem("score") < this.score) {
        localStorage.setItem("score", this.score);
      }
    } else {
      localStorage.setItem("score", this.score);
    }
    this.scene.start("score");
  }
  makeNut() {
    this.nuts
      .create(Phaser.Math.Between(500, 700), -20, "nut")
      .setScale(0.09)
      .setVelocityX(-200)
      .setBounce(0.9);
  }
  constrols() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-120);
    }
    if (this.cursors.right.isDown) {
      this.player.setVelocityX(120);
    }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-400);
      this.isIdle = false;
      this.player.anims.play("rightJump");
      this.jumpSound.play();
    } else if (!this.isIdle && this.player.body.touching.down) {
      this.player.anims.play("rightRun");
      this.isIdle = true;
    }
  }
  makePlatform() {
    this.platforms
      .create(1000, Phaser.Math.Between(100, 300), "ground")
      .setScale(0.2)
      .refreshBody()
      .setImmovable(true)
      .setVelocity(-200, 0)
      .body.setAllowGravity(false);
  }
  gainScore(player, nut) {
    nut.destroy();
    this.score += 1;
    this.nutSound.play();
    this.scoreText.text = "Skóre: " + this.score;
  }

  loadAudio() {
    this.jumpSound = this.sound.add("audio_jump");
    this.nutSound = this.sound.add("audio_nut");
    this.deathSound = this.sound.add("audio_death");
  }
}
