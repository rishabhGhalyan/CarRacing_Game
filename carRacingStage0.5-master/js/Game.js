class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
         playerCount = playerCountRef.val()
         player.getCount();
      }
      
      form = new Form()
      form.display();
    }
  }
  play(){
    form.hide()
    fill("black")
    textSize(30)
    text("Game Start",120,200)
    Player.getPlayerInfo()

    if(allPlayers!=undefined){
      var displayPos=5
      for(var plr in allPlayers){
        displayPos=displayPos+5
       if(plr==="player"+ player.index)
         fill("green")
         else
         fill("red")
         
        
        displayPos+=10
        textSize(11)
        text(allPlayers[plr].name+":"+allPlayers[plr].distance,5,displayPos)
      }
    }
  
    if(keyIsDown(UP_ARROW)&&player.index!==null){
       player.distance+=50
       player.update()
    }
}
  
}
