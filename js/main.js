/**
 * Created by Jerome on 03-03-16.
 */
//noinspection JSCheckFunctionSignatures,JSCheckFunctionSignatures,JSCheckFunctionSignatures

let w = screen.width;
let h = screen.height;
let midw = parseInt(w / 2);
let midh = parseInt(h / 2);
var config = {
    type: Phaser.AUTO,
    width: w,
    height: h,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    fps: {
        target: 1,
        forceSetTimeOut: true
    },
    scene: {
        preload: Game.preload,
        create: Game.create,
        update: Game.update
    }
};

var Cthis;
var player;
var platforms;
var cursors;
var ts;
var iter = 0;
let player_n = 1;
var render;
var render2;

if (player_n == 1) 
{
    render = "marvin";
    render2 = "amanda";
    
}
else
{
    render = "amanda";
    render2 = "marvin";
}

let pressed = "";
let kv = 0;
let kh = 0;
let dash = 0;
let sprinted = false;
var velocity;
var fr = 0;
var recharged = true; 
var rechargedH = true;    
var p = false;
var send_test = 0;
var verifyed = 0;
var found = 0;
var playerids = [];
var movement = 'turn';
var bullets;
var speed;
var stats;
var cursors;
var lastFired = 0;
var powered = false;

var game = new Phaser.Game(config);
// game.state.add('Game',Game);
// game.state.start('Game');