/*
 * Author: Jerome Renaux
 * E-mail: jerome.renaux@gmail.com
 */


var Game = {};


Game.preload = function()
    {
        this.load.image('sand', 'assets/sand.png');
        this.load.image('grass', 'assets/sand.jpg');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('hitbox', 'assets/hitbox.png', { frameWidth: 20, frameHeight: 10 });
        this.load.spritesheet('fake', 'assets/fake.png', { frameWidth: 43, frameHeight: 43 });
        this.load.spritesheet('marvin', 'assets/marvin.png', { frameWidth: 43, frameHeight: 43 });
        this.load.spritesheet('power', 'assets/powers.png', { frameWidth: 43, frameHeight: 43 });
        this.load.spritesheet('bullet', 'assets/hado.png', { frameWidth: 6, frameHeight: 6 });
        this.load.spritesheet('amanda', 'assets/amanda.png', { frameWidth: 43, frameHeight: 43 });
    }

Game.create = function()
    {   

        this.physics.world.setFPS(60);

        var Bullet = new Phaser.Class({
            
            Extends: Phaser.GameObjects.Image,
    
            initialize:
    
            function Bullet (scene)
            {
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
    
                this.speed = Phaser.Math.GetSpeed(400, 1);
                this.data = {signal:'-', direction: '+'};
            },
    
            fire: function (x, y)
            {
                this.setPosition(x, y);
    
                this.setActive(true);
                this.setVisible(true);
            },
    
            update: function (time, delta)
            {   
                if(this.data.signal == '+'){
                    if(this.data.direction == '+'){
                        this.x += this.speed * delta;
                    }
                    else{
                        this.x -= this.speed * delta;
                    }
                }
                else{
                    if(this.data.direction == '+'){
                        this.y += this.speed * delta;
                    }
                    else{
                        this.y -= this.speed * delta;
                    }
                }
                // this.x += this.speed * delta;
    
                if (this.x >= w || this.x <= 0 || this.y >= h || this.y <= 0 )
                {
                    this.setActive(false);
                    this.setVisible(false);
                }
            }
    
        });
    
        Game.bullets = this.add.group({
            classType: Bullet,
            maxSize: 10,
            runChildUpdate: true
        });

        Game.playerMap = {};
        Game.playerHb = {};
        
        Cthis = this;

        Game.addNewPlayer = function (id, x, y){
            playerids.push(id);

            Game.playerMap[id] = Cthis.physics.add.sprite(x, y, 'marvin');

            Game.playerHb[id] = Cthis.physics.add.sprite(x - 1, y + 15, 'hitbox');

            Game.playerHb[id].setCollideWorldBounds(true);

            Game.playerMap[id].setDepth(parseInt(Game.playerHb[id].y));

            for(var i = 0; i < Game.playerHb.length; i++){
                if(id != i){
                    Cthis.physics.add.collider(Game.playerHb[id], Game.playerHb[i]);
                    Cthis.physics.add.collider(Game.playerHb[id], Game.playerHb[i]);
                }
            }
        }

        Game.addNewBullet = function (x, y, signal, direction){

            console.log('disparando...');
            
            var bullet = Game.bullets.get();

            bullet.data.signal = signal;
            bullet.data.direction = direction;

            bullet.fire(x, y);
        }

        this.cameras.main.setBounds(0, 0, w , h);
        this.physics.world.setBounds(0, 0, w, h);

        // this.add.image(0, 0, 'sand').setOrigin(0);
        var container = this.add.container(w, h).setName('conty');

        ts = this.add.tileSprite(-midw, -midh, w, h, 'grass').setName('tiley').setScale(1);
        container.add(ts);

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');


        cursors = this.input.keyboard.addKeys(
        {
            test:Phaser.Input.Keyboard.KeyCodes.ENTER,

            up:Phaser.Input.Keyboard.KeyCodes.W,
        
            down:Phaser.Input.Keyboard.KeyCodes.S,
        
            left:Phaser.Input.Keyboard.KeyCodes.A,
        
            right:Phaser.Input.Keyboard.KeyCodes.D,
        
            run:Phaser.Input.Keyboard.KeyCodes.SHIFT,

            sprint:Phaser.Input.Keyboard.KeyCodes.CTRL,

            dash:Phaser.Input.Keyboard.KeyCodes.K,

            hado:Phaser.Input.Keyboard.KeyCodes.H
        });
        
        Client.askNewPlayer();

        // player2 = this.physics.add.sprite(200, 450, render2);

        // hp2 = this.physics.add.staticGroup();

        // hp2.create(199, 465, 'hitbox');

        hp1 = this.physics.add.sprite(99, 465, 'hitbox');

        player = this.physics.add.sprite(100, 450, 'fake');

        hp1.setCollideWorldBounds(true);
            
        this.physics.add.collider(hp1, platforms);

        this.cameras.main.startFollow(player, true, 0.09, 0.09);

        this.cameras.main.followOffset.set(0, 0);

        this.cameras.main.setZoom(2.8);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers(render, { start: 9, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: render, frame: 6 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'turnup',
            frames: [ { key: render, frame: 3 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'turnleft',
            frames: [ { key: render, frame: 9 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'turnright',
            frames: [ { key: render, frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'dashdown',
            frames: [ { key: render, frame: 15 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'dashup',
            frames: [ { key: render, frame: 14 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'dashleft',
            frames: [ { key: render, frame: 13 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'dashright',
            frames: [ { key: render, frame: 12 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers(render, { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers(render, { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers(render, { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'hadoright',
            frames: this.anims.generateFrameNumbers('power', { start: 0, end: 3 }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'hadoleft',
            frames: this.anims.generateFrameNumbers('power', { start: 4, end: 7 }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'turnrighthado',
            frames: [ { key: 'power', frame: 8 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'turnlefthado',
            frames: [ { key: 'power', frame: 9 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'turnuphado',
            frames: [ { key: 'power', frame: 10 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'turnhado',
            frames: [ { key: 'power', frame: 11 } ],
            frameRate: 20
        });
    }
    
Game.update = function(time, delta, signal, direction)
    {       
            // ts.tilePositionX = Math.cos(-iter) * 40;
            // ts.tilePositionY = Math.sin(-iter) * 40;
            // 
            // iter += 0.01;
            // 
            player.x = hp1.x + 1;
            player.y = hp1.y - 15;
            player.setDepth(parseInt(hp1.y));
            
            // player2.setDepth(parseInt(player2.y + 15));
            // this.physics.moveToObject(hp1, player, 0);
            var bullet = Game.bullets.get();

            if (cursors.test.isDown){
                if(send_test == 0){
                    send_test = 1;
                    Client.sendTest();
                    timedEvent = this.time.delayedCall(1000, function () { send_test = 0}, [], this);
                }
            }
            if(verifyed == 0){
                verifyed = 1;
                Client.verifyPlayers();
                timedEvent = this.time.delayedCall(3000, function () { verifyed = 0}, [], this);
            }
            if (cursors.dash.isDown)
            {   
                if(recharged == true){
                    dash = 600;
                    recharged = false;
                    movement = `dash${movement}`;
                    timedEvent = this.time.delayedCall(150, function () { dash = 0 }, [], this);
                    timedEvent = this.time.delayedCall(1000, onEvent, [], this);
                }
            }
            if (cursors.sprint.isDown)
            {   
                if (p == false){
                    if(sprinted == true)
                    {
                        sprinted = false;
                    }
                    else
                    {
                        sprinted = true;
                    }
                }
                p = true;
            }
            if (cursors.sprint.isUp){
                p = false;
            }
            if (cursors.run.isDown && sprinted == false)
            {
                velocity = 250;
                fr = 20;
            }
            else if (sprinted == true)
            {
                velocity = 50;
                fr = 5;
            }
            else
            {
                velocity = 150;
                fr = 10;
            }
            if (cursors.left.isDown)
            {
                hp1.setVelocityX(-velocity);

                if(dash >=1){
                    hp1.setVelocityX(-dash);
                }
                else{
                    movement = 'left';
                }

                if(kv == 0){
                    Client.sendClick(player.x, player.y, movement);
                }

                pressed = "left";
                
                kh = 1;

                bullet.data.signal = '+';
                bullet.data.direction = '-';

            }
            else if (cursors.right.isDown)
            {
                hp1.setVelocityX(velocity);

                if(dash >=1){
                    hp1.setVelocityX(dash);
                }
                else{
                    movement = 'right';
                }

                if(kv == 0){
                    Client.sendClick(player.x, player.y, movement);
                }

                pressed = "right";

                kh = 1;
                bullet.data.signal = '+';
                bullet.data.direction = '+';
            }

            else
            {
                hp1.setVelocityX(0);
                kh = 0;
            }

            if (cursors.up.isDown)
            {
                hp1.setVelocityY(-velocity);

                if(dash >=1){
                    hp1.setVelocityY(-dash);
                }
                else{
                    movement = 'up';
                }

                pressed = "up";
                
                kv = 1;

                Client.sendClick(player.x, player.y, movement);
                bullet.data.signal = '-';
                bullet.data.direction = '-';
            }

            else if (cursors.down.isDown)
            {
                hp1.setVelocityY(velocity);

                if(dash >=1){
                    hp1.setVelocityY(dash);
                }
                else{
                    movement = 'down';
                }

                pressed = "";
                
                kv = 1;

                bullet.data.signal = '-';
                bullet.data.direction = '+';

                Client.sendClick(player.x, player.y, movement);
            }

            else
            {
                hp1.setVelocityY(0);
                kv = 0;
            }
            
            if(kv == 0 && kh == 0){
                // player.anims.play(`turn${pressed}`);
                dash = 0;
                if(cursors.hado.isDown && rechargedH == true)
                {
                    if (pressed == 'up' || pressed == 'right'){
                        movement = 'hadoright';
                    }
                    else{
                        movement = 'hadoleft';
                    }
                    Client.sendClick(player.x, player.y, movement);
                }
                else if(cursors.hado.isUp && time > lastFired && (movement == 'hadoleft' || movement == 'hadoright'))
                {
                    movement = `turn${pressed}hado`;
                    rechargedH = false;
                    powered = true;
                    timedEvent = this.time.delayedCall(500, function () { movement = `turn${pressed}`; powered = false;}, [], this);
                    timedEvent = this.time.delayedCall(3000, function () { rechargedH = true}, [], this);

                    if (bullet)
                    {
                        // bullet.fire(player.x, player.y);

                        lastFired = time + 50;

                        Client.sendBullet(player.x, player.y, bullet.data.signal, bullet.data.direction);
                    }

                    Client.sendClick(player.x, player.y, movement);

                }
                else if(movement != '' && powered == false){
                    Client.sendClick(player.x, player.y, `turn${pressed}`);
                    movement = '';
                }
                
            }
    }
    function onEvent ()
    {
        recharged = true;
    }
    Game.movePlayer = function(id,x,y,moveto){
        try {
            var playerM = Game.playerMap[id];
            var playerH = Game.playerHb[id];
            playerM.x = x;
            playerM.y = y;
            playerH.x = x - 1;
            playerH.y = y + 15;
            playerM.setDepth(parseInt(playerH.y));
            playerM.anims.play(moveto, true);
        }
        catch (e) {
            movement = movement;
        }
        
    };
    Game.removePlayer = function(id){
        var index = playerids.indexOf(id);
        if (index !== -1) {
            playerids.splice(index, 1);
        }
        Game.playerMap[id].destroy();
        Game.playerHb[id].destroy();
        delete Game.playerMap[id];
        delete Game.playerHb[id];
    };
    Game.resetPlayers = function(id,x,y){
        // console.log('reseting...');
        found = 0;
        for(var i = 0; i < playerids.length; i++){
            if(id == playerids[i]){
                found = 1;
                break;
            }
        }
        if(found == 0){
            Game.addNewPlayer(id,x,y);
        }
    };