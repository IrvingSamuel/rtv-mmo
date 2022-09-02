var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/assets',express.static(__dirname + '/assets'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

server.lastPlayderID = 0;
server.lastPlayers = [];
server.bulletInfo = [];

server.listen(process.env.PORT || 8081,function(){
    console.log('Listening on '+server.address().port);
});

io.on('connection',function(socket){

    socket.on('newplayer',function(){
        console.log('generating player...')
        socket.player = {
            id: server.lastPlayderID++,
            x: 100,//randomInt(200,400),
            y: 450//randomInt(200,400)
        };
        server.lastPlayers = getAllPlayers();
        socket.emit('allplayers',server.lastPlayers);
        socket.broadcast.emit('newplayer',socket.player);

        socket.on('click',function(data){
            // console.log('click to '+data.x+', '+data.y+', '+socket.player.id);
            socket.player.x = data.x;
            socket.player.y = data.y;
            io.emit('move',socket.player,data.movement);
        });

        socket.on('disconnect',function(){
            io.emit('remove',socket.player.id);
        });

        socket.on('shot',function(data){
            console.log('generating bullet...');
            console.log(data);
            socket.emit('generateShot',data); 
            socket.broadcast.emit('generateShot',data);            
        });
        
        socket.on('verify',function(){
            server.verify = getAllPlayers();
            if(server.verify != server.lastPlayers){
                server.lastPlayers = server.verify;
                socket.emit('refreshplayers',server.lastPlayers);
            }
            
        });
    });

    

    

    socket.on('test',function(){
        console.log('test received');
    });
});

function getAllPlayers(){
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if(player) players.push(player);
    });
    return players;
}
function getAllData(data){
    var bullet = [];
    for(var i = 0; i < data.length; i++){
        bullet.push(data[i]);
    }
    return bullet;
}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}