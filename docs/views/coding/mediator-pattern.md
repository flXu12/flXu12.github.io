---
title: 【阿白在coding】设计模式之中介者模式
date: 2022-06-23
categories:
 - 前端
tags:
 - JavaScript
siderbar: auto
---

> 事实证明，心情不太妙的时候，撸猫就能治愈一切。  

## 1. 中介者模式
**定义**：中介者模式是一种行为设计模式。增加一个中介者对象后所有的相关对象都通过中介者对象来通信，而不是互相引用。解除对象与对象之间的紧耦合关系，使网状的多对多关系变成了相对简单的一对多关系。

## 2. 实现中介者模式
### 2.1 泡泡堂游戏  
**描述**：两个玩家同时进行对战，当其中一个玩家死亡的时候游戏便结束，同时通知它的对手胜利。  
**实现**：  
```js
function Player(name) {
  this.name = name;
  this.enemy = null; // 敌人
}

Player.prototype.win = function() {
  console.log(`${this.name} won`);
}

Player.prototype.lose = function() {
  console.log(`${this.name} lost`);
}

Player.prototype.die = function() {
  this.lose();
  this.enemy.win();
}

// 创建2个玩家
const player1 = new Player('大白');
const player2 = new Player('小白');

// 设置敌人
player1.enemy = player2;
player2.enemy = player1;

player1.die();  // 输出： 大白 lost        小白 won
```

**游戏升级**：增加玩家数量   
**实现一**：  
```js
function Player(name, teamColor) {
  this.partners = []; // 队友
  this.enemies = [];  // 对手
  this.state = 'live'; // 玩家状态
  this.name = name;
  this.teamColor = teamColor;  // 队伍颜色
}

Player.prototype.win = function() {  // 团队胜利
  console.log(`winner: ${this.name}`)
}

Player.prototype.lose = function() { // 团队失败
  console.log(`loser: ${this.name}`)
}

Player.prototype.die = function() { // 玩家死亡
  let allDead = true;
  this.state = 'dead'; // 设置玩家状态为死亡

  for(let i = 0; i < this.partners.length; i++) {
    if(this.partners[i].state !== 'dead') {
      allDead = false;
      break;
    }
  }

  if(allDead === true) { // 如果队友全部死亡
    this.lose(); // 团队失败
    for(let i = 0; i < this.partners.length; i++) { // 通知队友失败
      this.partners[i].lose();
    }
    for(let i = 0; i < this.enemies.length; i++) { // 通知队友游戏胜利
      this.enemies[i].win();
    }
  }
}

// 定义工厂函数来创建玩家
let players = [];
const playerFactory = function(name, teamColor) {
  const newPlayer = new Player(name, teamColor);

  for(let i = 0; i < players.length; i++) {
    if(players[i].teamColor === newPlayer.teamColor) {
      players[i].partners.push(newPlayer);
      newPlayer.partners.push(players[i])
    } else {
      players[i].enemies.push(newPlayer);
      newPlayer.enemies.push(players[i])
    }
  }

  players.push(newPlayer);

  return newPlayer;
}

// 创建玩家
//红队：
const player1 = playerFactory( '皮蛋', 'red' ),
      player2 = playerFactory( '小乖', 'red' ),
      player3 = playerFactory( '宝宝', 'red' ),
      player4 = playerFactory( '小强', 'red' );
//蓝队：
const player5 = playerFactory( '黑妞', 'blue' ),
      player6 = playerFactory( '葱头', 'blue' ),
      player7 = playerFactory( '胖墩', 'blue' ),
      player8 = playerFactory( '海盗', 'blue' );
// 让红队全部死亡
player1.die();
player2.die();
player4.die();
player3.die();

/**
 loser: 宝宝
 loser: 皮蛋
 loser: 小乖
 loser: 小强
 winner: 黑妞
 winner: 葱头
 winner: 胖墩
 winner: 海盗
 */ 
```

**实现二**：用中介者模式改造泡泡堂游戏  
```js
function Player(name, teamColor) {
  this.name = name;
  this.teamColor = teamColor;
  this.state = 'alive';
}

Player.prototype.win = function() {
  console.log(`${this.name} won`);
}

Player.prototype.lose = function() {
  console.log(`${this.name} lost`);
}

Player.prototype.die = function() {
  this.state = 'dead';
  playerDirector.recieveMessage('playerDead', this); // 给中介者发送消息通知玩家死亡
}

Player.prototype.remove = function() {
  playerDirector.recieveMessage('removePlayer', this); // 给中介者发送消息移除玩家
}

Player.prototype.changeTeam = function(color) {
  playerDirector.recieveMessage('changeTeam', this, color); // 给中介者发送消息玩家换队
}

// 创建玩家对象的工厂函数
const playerFactory = function(name, teamColor) {
  const newPlayer = new Player(name, teamColor);
  playerDirector.recieveMessage('addPlayer', newPlayer); // 给中介者发送消息新增玩家
  return newPlayer;
}

// 中介者对象
const playerDirector = (function() {
  let players = {}; // 保存所有玩家
  let operations = {};  // 中介者可以执行的操作

  // 新增一个玩家
  operations.addPlayer = function(player) {
    const teamColor = player.teamColor;
    players[teamColor] = players[teamColor] || [];
    players[teamColor].push(player); // 添加玩家进队伍
  }

  // 移除一个玩家
  operations.removePlayer = function(player) {
    const teamColor = player.teamColor;
    const teamPlayers = players[teamColor] || [];  // 同队伍成员
    for(let i = teamPlayers.length - 1; i >= 0; i--) {
      if(teamPlayers[i] === player) {
        teamPlayers.splice(i, 1);
      }
    }
  }

  // 玩家换队
  operations.changeTeam = function(player, newTeamColor) {
    operations.removePlayer(player); // 从原队伍中删除
    player.teamColor = newTeamColor; // 换队伍颜色
    operations.addPlayer(player); // 增加到新队伍
  }

  // 玩家死亡
  operations.playerDead = function(player) {
    const teamColor = player.teamColor;
    const teamPlayers = players[teamColor];

    let allDead = true;
    for(let i = 0; i < teamPlayers.length; i++) {
      if(teamPlayers[i].state !== 'dead') {
        allDead = false;
        break;
      }
    }

    if(allDead === true) { // 全部死亡
      for(let i = 0; i < teamPlayers.length; i++) {
        teamPlayers[i].lose();  // 同队玩家失败
      }

      for(let color in players) {
        if(color !== teamColor) {
          const teamPlayers = players[color];
          for(let i = 0; i < teamPlayers.length; i++) {
            teamPlayers[i].win();  // 通知其他队伍玩家胜利
          }
        }
      }
    }
  }

  // 消息通知
  const recieveMessage = function() {
    const message = Array.prototype.shift.call(arguments); // 取arguments第一个参数为消息名称
    operations[message].apply(this, arguments);
  }

  return {
    recieveMessage
  }
})()

// 测试
//红队：
const player1 = playerFactory( '皮蛋', 'red' ),
      player2 = playerFactory( '小乖', 'red' ),
      player3 = playerFactory( '宝宝', 'red' ),
      player4 = playerFactory( '小强', 'red' );
//蓝队：
const player5 = playerFactory( '黑妞', 'blue' ),
      player6 = playerFactory( '葱头', 'blue' ),
      player7 = playerFactory( '胖墩', 'blue' ),
      player8 = playerFactory( '海盗', 'blue' );
// 让红队全部死亡
player1.die();
player2.die();
player4.die();
player3.die();
/**
皮蛋 lost
小乖 lost
宝宝 lost
小强 lost
黑妞 won
葱头 won
胖墩 won
海盗 won
 */ 

// 玩家掉线
player1.remove();
player2.remove();
player3.die();
player4.die(); 
/**
宝宝 lost
小强 lost
黑妞 won
葱头 won
胖墩 won
海盗 won
 */ 

// 玩家换队
player1.changeTeam( 'blue' );
player2.die();
player3.die();
player4.die(); 
/**
宝宝 lost
小强 lost
黑妞 won
葱头 won
胖墩 won
海盗 won
皮蛋 won
宝宝 lost
小强 lost
黑妞 won
葱头 won
胖墩 won
海盗 won
皮蛋 won
宝宝 lost
小强 lost
黑妞 won
葱头 won
胖墩 won
海盗 won
皮蛋 won
 */ 
```