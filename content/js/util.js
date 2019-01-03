function fight(player_action) {
    var choices = ["Paper", "Scissor", "Stone"];
    var player_choice = choices.indexOf(player_action);
    var monster_choice = parseInt(Math.random()*3);
    var result;
    if (player_choice == monster_choice) {
      result = 0
    } else {
      result = (3 + player_choice - monster_choice) % 3;
    }
    return {"result":result, "monster_choice": choices[monster_choice]};
}

function skill(player, skill_name, skill_lv) {
    var type = skill_list[skill_name].type;
    var cost = skill_list[skill_name].cost;
    var base_dam = skill_list[skill_name].base_dam;
    var multi = skill_list[skill_name].multi;
    
    var dam = (Math.pow(1.3, player.skills[skill_name].lv) * parseInt(player[type] / 5)).toFixed(1);
    
    return {"skill_name": skill_name,"dam": dam, "cost": cost};
}

function choosePlayer() {
  var cha = "";
  for (var ch in player_list)
    cha += (ch+1) + ". " + player_list[ch].name + "\n";
  name = prompt("Choose a character (Input the number): \n " + cha);
  var no = parseInt(name)-1;
  return JSON.parse(JSON.stringify(player_list[no]));
}

function genMonster(stage) {
  var name = monster_name_list[parseInt(Math.random()*monster_name_list.length)];
  var monster = monster_icon_list[parseInt(Math.random()*monster_icon_list.length)];
  monster.name = name;
  monster.str = 10 + parseInt(stage/5) * 5 + parseInt(Math.random() * stage);
  monster.dex = 10 + parseInt(stage/5) * 5 + parseInt(Math.random() * stage);
  monster.inte = 10 + parseInt(stage/5) * 5 + parseInt(Math.random() * stage);
  return monster;
}

function start_game() {
  ReactDOM.render(<Game />, document.getElementById("root"));
}
