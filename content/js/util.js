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

function choosePlayer() {
  var cha = "";
  for (var ch in player_list)
    cha += (ch+1) + ". " + player_list[ch].name + "\n";
  name = prompt("Choose a character (Input the number): \n " + cha);
  var no = parseInt(name)-1;
  return player_list[no];
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

