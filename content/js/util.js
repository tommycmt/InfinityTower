var game_started = false;

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
    var cost = skill_list[skill_name].cost * skill_lv;
    var multi = skill_list[skill_name].multi;
    
    var dam = (Math.pow(multi, player.skills[skill_name].lv * 1.25) * parseInt(player[type] / 5)).toFixed(1);
    
    return {"skill_name": skill_name,"dam": dam, "cost": cost};
}

function choosePlayer() {
  
  var cha = "";
  var name = "";
  for (var ch in player_list)
    cha += (ch+1) + ". " + player_list[ch].name + "\n";
  while (true) {
    name = prompt("Choose a character (Input the number): \n " + cha);
    if (game_started || (name != "null" && name != null && player_list[parseInt(name)-1] != undefined)) {
      break;
      game_started = true;
    }
  }
  var no = parseInt(name)-1;
  return JSON.parse(JSON.stringify(player_list[no]));
}

function genMonster(stage) {
  var name = monster_name_list[parseInt(Math.random()*monster_name_list.length)];
  var monster = monster_icon_list[parseInt(Math.random()*monster_icon_list.length)];
  monster.name = name;
  monster.str = 10 + parseInt(stage/5) * 4 + parseInt((Math.random() * 0.5 + 1) * stage);
  monster.dex = 10 + parseInt(stage/5) * 4 + parseInt((Math.random() * 0.5 + 1)  * stage);
  monster.inte = 10 + parseInt(stage/5) * 4 + parseInt((Math.random() * 0.5 + 1) * stage);
  return monster;
}

function start_game() {
  ReactDOM.render(<Game />, document.getElementById("root"));
}

function b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}


function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}
