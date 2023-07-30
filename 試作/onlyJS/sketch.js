// ステージの設計図
// 0: 空白, 1: 壊せない石, 2: プレイヤー, 3: トゲ, 4: 宝石
// 5: ゴール, 6: 壊せる石, 7: 時間アイテム, 8: 3回叩くと壊せる石
let stageLayout = [
    [0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 1],
    [8, 1, 1, 6, 1, 1, 1, 1, 1],
    [1, 6, 6, 6, 1, 1, 1, 1, 1],
    
    [6, 8, 1, 8, 6, 8, 6, 6, 6],
    [6, 1, 6, 1, 8, 1, 8, 1, 8],
    [6, 1, 6, 6, 1, 1, 8, 1, 6],
    [8, 1, 8, 1, 1, 1, 8, 1, 8],
    [6, 8, 1, 1, 1, 1, 8, 1, 6],
    [6, 8, 8, 8, 6, 8, 3, 8, 6],
    [3, 1, 1, 6, 1, 1, 1, 6, 6],
    [1, 8, 8, 6, 6, 8, 8, 1, 3],
    [1, 6, 1, 1, 1, 1, 1, 5, 1],
    [1, 6, 8, 6, 6, 6, 8, 8, 1],
    
    [1, 6, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],   
  ];
  
  // スプライトの変数
  let player;
  let logo;
  let jewel;
  let goal;
  let breakingBlock;
  
  // グループの変数
  let blackBlockGroup;
  let blueBlockGroup;
  let hardBlockGroup;
  let allBlockGroup;
  let timerItemGroup;
  let jewelGroup;
  let thornGroup;
  
  // 画像の変数
  let logoImage;
  let blackBlockImage;
  let blueBlockImage;
  let hardBlockImage;
  let goalImage;
  let jewelImage;
  let thornImage;
  let timerItemImage;
  let gameoverImage;
  let escapedImage;
  
  // アニメーションの変数
  let crushAnimation;
  let goalAnimation;
  let playerMoveFrontAnimation;
  let playerMoveRightAnimation;
  let playerCrushRightAnimation;
  let playerMoveLeftAnimation;
  let playerCrushLeftAnimation;
  let playerCrushBottomAnimation;
  
  // 音の変数
  let bgmSound;
  let escapedSound;
  let gameoverSound;
  let jumpSound;
  let pickupSound;
  let crushSound;
  
  // ゲームを管理する変数
  let playerDirection;
  let playerSpeed;
  let playerMode;
  let gameMode;
  let frame;
  let time;
  let score;
  let hardBlockLife;
  let jumpingForce;
  let gravity;
  let stage;
  
  // 音と画像をロードする
  function preload() {
    // 画像のロード
    logoImage = loadImage("data/logo.png");
    blackBlockImage = loadImage("data/stage.png");
    hardBlockImage = loadImage("data/block_blue.png");
    timerItemImage = loadImage("data/timer.png");
    thornImage = loadImage("data/thorn.png");
    blueBlockImage = loadImage("data/blue_block00.png");
    jewelImage = loadImage("data/jewel.png");
  
    // プレイヤーのアニメーション
    playerMoveFrontAnimation = loadAnimation("data/player_front_0.png", "data/player_front_3.png");
    playerMoveRightAnimation = loadAnimation("data/player_right_0.png", "data/player_right_3.png");
    playerMoveLeftAnimation = loadAnimation("data/player_left_0.png", "data/player_left_3.png");
    goalAnimation = loadAnimation("data/goal_0.png", "data/goal_3.png");
    playerMoveFrontAnimation.frameDelay = 10;
    goalAnimation.frameDelay = 10;
  
    // クラッシュのアニメーション
    playerCrushRightAnimation = loadAnimation("data/player_crush_right_0.png", "data/player_crush_right_2.png");
    playerCrushRightAnimation.looping = false;
  
    playerCrushLeftAnimation = loadAnimation("data/player_crush_left_0.png", "data/player_crush_left_2.png");
    playerCrushLeftAnimation.looping = false;
  
    playerCrushBottomAnimation = loadAnimation("data/player_crush_bottom_0.png", "data/player_crush_bottom_2.png");
    playerCrushBottomAnimation.looping = false;
  
    // 氷が壊れるアニメーション
    crushAnimation = loadAnimation("data/hard_block00.png", "data/hard_block03.png");
    crushAnimation.looping = false;
  
    crushHardAnimation = loadAnimation("data/hard_block00.png", "data/hard_block03.png");
    crushHardAnimation.looping = false;

    //
    thornAnimation = loadAnimation("data/thorn.png", "data/thorn.png");
    crushHardAnimation.looping = false;
  
    // サウンドのロード
    gameoverSound = loadSound("gameover.mp3");
    escapedSound = loadSound("escaped.mp3");
    swingSound = loadSound("swing.mp3");
    crushSound = loadSound("crush.mp3");
    jumpSound = loadSound("jump.mp3");
    pickupSound = loadSound("pickup.mp3");
    bgmSound = loadSound("bgm.mp3");
  }
  
  function setup() {
    // キャンバスを作る
    createCanvas(50 * 9, 50 * 13);
  
    // ステージを読み込む
    stage = stageLayout;
  
    // ゲームの初期化
    gameSetup();
  }
  
  // 描画と計算
  function draw() {
    // 背景を表示
    background(0, 60, 90);
  
    if (gameMode == "playing") {
      playing();
    }
  
    // スプライトを表示
    drawSprites();
  
    // カメラをオフにする
    camera.off();
  
    // タイムとスコアを表示
    drawUI();
  
    // ゲームモードによってテキストを表示する
    if (gameMode == "gameover") {
      drawGameover();
    } else if (gameMode == "gameCompleted") {
      drawGameCompleted();
    }
  }
  
  // ゲーム全体の初期化
  function gameSetup() {
    // ゲームの設定を変更する
    // 時間制限(20)
    time = 90;
  
    // 重力(1)
    gravity = 0.5;
  
    // ジャンプ力(12)
    jumpingForce = 22;
  
    // プレイヤーの速度(5)
    playerSpeed = 5;
  
    // 硬い石(3)
    hardBlockLife = 3;
  
    // ゲームを管理する変数を初期化
    frame = 0;
    score = 0;
    camera.position.y = 0;
  
    // ロゴ表示
    logo = createSprite(230, 200);
    logo.addImage(logoImage);
  
    // BGMを再生
  
    // ゲームオーバー、ゲームクリアの効果音を停止
    gameoverSound.stop();
    escapedSound.stop();
  
    // グループの作成
    blackBlockGroup = createGroup();
    timerItemGroup = createGroup();
    blueBlockGroup = createGroup();
    hardBlockGroup = createGroup();
    allBlockGroup = createGroup();
    jewelGroup = createGroup();
    thornGroup = createGroup();
  
    createGameDis();
  }
  
  function createGameDis() {
    // プレイヤーを初期化
    playerMode = "move";
    playerDirection = "front";
  
    // ゲームモードをplayingで初期化
    gameMode = "playing";
    
    // ステージ生成
    for (y = 0; y < stage.length; y++) {
      for (x = 0; x < stage[y].length; x++) {
        if (stage[y][x] == 1) {
          // 壊せないブロックを作る
          let block = createSprite(x * 50 + 25, y * 50 + 25, 50, 50);
          block.setCollider("rectangle", 0, 0, 40, 40);
          // block.debug = true;
          block.addImage(hardBlockImage);
          block.immovable = true;
          blackBlockGroup.add(block);
          allBlockGroup.add(block);
        } else if (stage[y][x] == 2) {
          // プレイヤーを作る
          player = "";
          player = createSprite(x * 50 + 21, y * 50 + 21);
          player.setCollider("rectangle", 0, 5, 40, 45);
          player.addAnimation("moveRight", playerMoveRightAnimation);
          player.addAnimation("moveLeft", playerMoveLeftAnimation);
          player.addAnimation("idling", playerMoveFrontAnimation);
          player.addAnimation("crushRight", playerCrushRightAnimation);
          player.addAnimation("crushLeft", playerCrushLeftAnimation);
          player.addAnimation("crushBottom", playerCrushBottomAnimation);
        } else if (stage[y][x] == 3) {
          // トゲを作る
          let thorn = createSprite(x * 50 + 25, y * 50 + 25);
          thorn.addImage(hardBlockImage);
          thorn.setCollider("circle", 0, 0, 20);
          // thorn.debug = true;
          thorn.rotation += 1;
          thornGroup.add(thorn);
        } else if (stage[y][x] == 4) {
          // 宝石を作る
          let jewel = createSprite(x * 50 + 25, y * 50 + 25);
          jewel.setCollider("circle", 0, 0, 20);
          jewel.addImage("normal", jewelImage);
          jewelGroup.add(jewel);
        } else if (stage[y][x] == 5) {
          // ゴールを作る
          goal = createSprite(x * 50 + 21, y * 50 + 28);
          goal.setCollider("rectangle", 0, 5, 35, 42);
          goal.addAnimation("idling", goalAnimation);
        } else if (stage[y][x] == 6) {
          // 壊せるブロックを作る
          let block = createSprite(x * 50 + 25, y * 50 + 25, 50, 50);
          block.addImage(hardBlockImage);
          block.immovable = true;
          block.setCollider("rectangle", 0, 0, 40, 40);
          block.blockLife = 1;
          block.initialLife = 1;
          block.breakCost = 1;
          blueBlockGroup.add(block);
          allBlockGroup.add(block);
        } else if (stage[y][x] == 7) {
          // 時間アイテムを作る
          let item = createSprite(x * 50 + 25, y * 50 + 25);
          item.setCollider("circle", 0, 0, 20);
          item.addImage(timerItemImage);
          timerItemGroup.add(item);
        } else if (stage[y][x] == 8) {
          // 硬いブロックを作る
          let block = createSprite(x * 50 + 25, y * 50 + 25, 50, 50);
          block.addImage(hardBlockImage);
          block.immovable = true;
          block.setCollider("rectangle", 0, 0, 40, 40);
          block.blockLife = hardBlockLife;
          block.initialLife = hardBlockLife;
          block.breakCost = 10;
          hardBlockGroup.add(block);
          allBlockGroup.add(block);
        }
      }
    }
  }
  
  // ゲームプレイ中の処理
  function playing() {
    // プレイヤーをカメラが追いかける
    camera.position.y = player.position.y - 30;
  
    // プレイヤーを動かす関数を呼ぶ
    playerControl();
  
    // タイマーを制御する関数を呼ぶ
    setTimer();
  }
  
  // プレイヤーをコントロールする
  function playerControl() {
    // プレイヤーとブロックの当たり判定
    player.collide(allBlockGroup);
  
    //＝＝＝＝＝＝＝＝ 移動中 ＝＝＝＝＝＝＝＝
    if (playerMode == "move") {
      // 移動と向き
      if (keyDown("F2")) {
        // リロード
        createGameDis();
      } else if (keyDown("RIGHT")) {
        // 右に移動
        player.velocity.x = playerSpeed;
        // 右向きという情報
        playerDirection = "right";
      } else if (keyDown("LEFT")) {
        // 左に移動
        player.velocity.x = -playerSpeed;
        // 左向きという情報
        playerDirection = "left";
      } else {
        // 左右キーが押されていなければ横移動なし
        player.velocity.x = 0;
        playerDirection = "front";
      }
  
      if (playerDirection == "right") {
        // 右向きの移動アニメーション
        player.changeAnimation("moveRight");
      } else if (playerDirection == "left") {
        // 左向きの移動アニメーション
        player.changeAnimation("moveLeft");
      } else {
        // 正面のアニメーション
        player.changeAnimation("idling");
      }
  
      // 移動中にスペースキーを押したらクラッシュ
      if (keyDown("SPACE")) {
        // クラッシュモードに変える
        playerMode = "crush";
        swingSound.play();
  
        let crush;
        if (playerDirection == "right") {
          // 右向きのクラッシュアニメーション
          player.changeAnimation("crushRight");
          // プレイヤーの右側にクラッシュのスプライトを作る
          crush = createSprite(player.position.x + 30, player.position.y, 10, 10);
        } else if (playerDirection == "left") {
          // 左向きのクラッシュアニメーション
          player.changeAnimation("crushLeft");
          // プレイヤーの左側にクラッシュのスプライトを作る
          crush = createSprite(player.position.x - 30, player.position.y, 10, 10);
        } else if (playerDirection == "front") {
          player.changeAnimation("crushBottom");
          crush = createSprite(player.position.x, player.position.y + 30, 10, 10);
        }
  
        // クラッシュと水色のブロックが重なったらcrush関数が呼ばれる
        crush.overlap(blueBlockGroup, crushIce);
  
        // クラッシュと青色のブロックが重なったらcrush関数が呼ばれる
        crush.overlap(hardBlockGroup, crushIce);
  
        // 判定が終わったらクラッシュを消す
        crush.remove();
      }
  
      // 画面外にいかないようにする
      if (player.position.x <= 21) {
        player.position.x = 21;
      } else if (player.position.x > width - 21) {
        player.position.x = width - 21;
      }
    }
  
    //＝＝＝＝＝＝＝＝クラッシュ中 ＝＝＝＝＝＝＝＝
    if (playerMode == "crush") {
      // クラッシュ中は横移動しない
      player.velocity.x = 0;
  
      if (!keyDown("SPACE")) {
        // スペースキーを離したら移動モードに変わる
        playerMode = "move";
      }
    }
  
    //＝＝＝＝＝＝＝＝ 移動中とクラッシュ中共通 ＝＝＝＝＝＝＝＝
    //重力
    player.velocity.y += gravity;
  
    // 着地している時
    if (player.touching.bottom) {
      if (keyDown("UP")) {
        // 上キーが押され、速度が下向きの時に
        if (player.velocity.y > 0) {
          // 速度を上向きにする
          player.velocity.y = -jumpingForce;
          // ジャンプ音
          jumpSound.play();
        }
      } else {
        // 着地中は縦の速度≒ゼロ（コライドのバグ回避）
        player.velocity.y = 0.0001;
      }
    }
  
    // プレイヤーと宝石が重なったら
    player.overlap(jewelGroup, pickup);
  
    // プレイヤーと時間アイテムが重なったら
    player.overlap(timerItemGroup, timeExtend);

    }

    // プレイヤーとトゲが重なったら
    player.overlap(thornGroup, touchThorn);
  
    // ゴールに重なったらescape関数が呼ばれる
    player.overlap(goal, gameCompleted);
  
  // 時間アイテムの処理
  function timeExtend(player, timerItem) {
    
  
    
    
    
    
    
    
    
    
  }
  
  // 宝石をひろう処理
  function pickup(player, jewel) {
    // 壊れるアニメーション
    breakingBlock = createSprite(jewel.position.x, jewel.position.y);
    breakingBlock.addAnimation("crush", crushHardAnimation);
  
    // スコア
    score += 20000;
  
    // ひろった音
    pickupSound.play();
  
    // ひろった宝石を消す
    jewel.remove();
  }

  function touchThorn(player, thorn) {
    breakingBlock = createSprite(thorn.position.x, thorn.position.y);
    breakingBlock.addAnimation("thorn", thornAnimation);
    gameover();
  }
  
  // ブロックを破壊する処理
  function crushIce(crush, block) {
    // 壊れるアニメーション
    block.blockLife -= 1;
  
    if (player.velocity.y < 0) {
      player.velocity.y = 0;
    }
    
    if (block.blockLife <= 0) {
      // スコア
      score += 50;
      
      crushSound.play();
  
      // ブロックを消す
      block.remove();
    }
  }
  
  // タイマーの処理
  function setTimer() {
    // １秒毎にタイマーを減らす
    if (frame++ >= 60) {
      if (time > 0) {
        time--;
      }
      frame = 0;
      if (time == 0) {
        // タイマーがゼロになったらゲーム終了
        gameover();
      }
    }
  }
  
  // ゲームオーバーの処理
  function gameover() {
    // モードをgameoverにする
    gameMode = "gameover";
  
    // 脱出の曲を流す
    bgmSound.stop();
  
    // 脱出の曲を流す
    gameoverSound.play();
  
    // 動きを止める
    noLoop();
  }
  
  // ゲームクリアの処理
  function gameCompleted() {
    // モードをゲームクリアにする
    gameMode = "gameCompleted";
  
    // bgmを止める
    bgmSound.stop();
  
    // 脱出の曲を流す
    escapedSound.play();
  
    // 動きを止める
    noLoop();
  }
  
  // ゲームオーバーの描画
  function drawGameover() {
    fill(255, 0, 77, 150);
    rect(0, 0, width, height);
    fill(255);
    textAlign(CENTER);
    textSize(80);
    text("GAMEOVER", width / 2, height / 2);
    textSize(30);
    text("Click to Restart", width / 2, height / 2 + 100);
  }
  
  // ゲームクリアの描画
  function drawGameCompleted() {
    let spacer = 150;
    let totalScore = score + time * 5000;
  
    fill(0, 100, 255, 150);
    rect(0, 0, width, height);
    fill(255);
    textAlign(CENTER);
    textSize(80);
    text("GAME CLEAR!", width / 2, spacer + 50);
  
    textSize(30);
    text("TIME BONUS = " + time + " sec. × 5000", width / 2, spacer + 120);
    textSize(30);
    fill(255, 255, 0);
    text("TOTAL SCORE", width / 2, spacer + 200);
  
    textSize(80);
    text(totalScore, width / 2, spacer + 290);
    fill(255);
    textSize(30);
    text("Click to Restart", width / 2, spacer + 400);
  }
  
  // マウスクリックの処理
  function mouseClicked() {
    // ゲームオーバー、またはゲームクリアの場合
    if (gameMode == "gameover" || gameMode == "gameCompleted") {
      // スプライトを全て消す
      allSprites.removeSprites();
  
      // ゲームを初期化する
      gameSetup();
      loop();
    }
  }
  
  // スコアとタイマーの表示
  function drawUI() {
    textFont("oswald");
    // タイマー
    textAlign(LEFT);
    textSize(20);
    text("TIME", 25, 30);
    textSize(50);
    if (time < 6) {
      fill(255, 0, 77);
    } else {
      fill(255);
    }
    textAlign(RIGHT);
    text(time, 62, 80);
  
    // スコア
    fill(255);
    textSize(20);
    textAlign(RIGHT);
    text("SCORE", 430, 30);
    textSize(50);
    text(score, 430, 80);
  }
  
  // 新しいグループを作る
  function createGroup() {
    return new Group();
  }
  
  function changeSoundVolume(){
    bgmSound.setVolume(0.00075);
    gameoverSound.setVolume(0.2);
    escapedSound.setVolume(0.2);
    jumpSound.setVolume(0.5);
    swingSound.setVolume(0.3);
    crushSound.setVolume(0.4);
  }
  
  changeSoundVolume();