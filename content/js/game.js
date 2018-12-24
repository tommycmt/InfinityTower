class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 1,
      player: choosePlayer(),
      history: [],
      computing: false,
    }
    this.init();
    this.update = this.update_game_state.bind(this);
    console.log(this);
  }
  
  init() {
    this.state.player.maxhp    = this.state.player.str * 1.5;
    this.state.player.maxmana  = this.state.player.inte * 1.5;
    this.state.player.hp       = this.state.player.maxhp;
    this.state.player.mana     = this.state.player.maxmana;
    this.state.player_status   = "normal";
    
    this.state.monster         = genMonster(this.state.stage);
    this.state.monster.maxhp   = this.state.monster.str * 1.5;
    this.state.monster.maxmana = this.state.monster.inte * 1.5;
    this.state.monster.hp      = this.state.monster.maxhp;
    this.state.monster.mana    = this.state.monster.maxmana;
    this.state.monster_status  = "normal";
    this.state.history         = this.state.player;
  }
  
  update_game_state(op, data) {
    this.setState({computing: true});
    switch (op) {
      case "fight":
        var re = fight(data.player_choice);
        this.state.player_choice = data.player_choice;
        this.state.monster_choice = re.monster_choice;
        if (re.result == 0) {
          setTimeout(()=>{this.fight("draw")}, 500);
        } else if (re.result == 1) {
          this.setState({player_status: "atk", monster_status: "damaged"});
          setTimeout(()=>{this.fight("player_hit")}, 1500);
        } else {
          this.setState({player_status: "damaged", monster_status: "atk"});
          setTimeout(()=>{this.fight("monster_hit")}, 1500);
        }
        break;
      case "skill":
        var re = skill(this.state.player, data.skill_name, data.skill_lv);
        this.setState({player_status: "atk", monster_status: "damaged"});
        setTimeout(()=>{this.skill(re)}, 1000);
        break;
      default:
    }    
  }
  
  fight(op) {
    switch (op) {
      case "draw":
        this.setState({message: 2});
        break;
      case "player_hit":
        var dex = this.state.player.dex;
        var multi = 1;
        while (true) {
          if (Math.random() * 50 < dex) {
            multi += 0.5;
            dex -= 50;
          } else {
            break;
          }
        }          
        var dam = (this.state.player.str/10 + parseInt(this.state.player.inte/10)) * multi;
        var new_monster = Object.assign({}, this.state.monster, {hp: this.state.monster.hp - dam});
        this.setState({monster: new_monster, player_status: "normal", monster_status: "normal"});
        this.setState({message: 1, message_atk: "Player", message_crit: multi, message_method: "normal", message_dam: dam});
        break;
      case "monster_hit":
        var dex = this.state.monster.dex;
        var multi = 1;
        while (true) {
          if (Math.random() * 50 < dex) {
            multi += 0.5;
            dex -= 50;
          } else {
            break;
          }          
        }
        var dam = (this.state.monster.str/10 + parseInt(this.state.monster.inte/10)) * multi;
        var new_player = Object.assign({}, this.state.player, {hp: this.state.player.hp - dam});
        this.setState({player: new_player, player_status: "normal", monster_status: "normal"});
        this.setState({message: 1, message_atk: "Monster", message_crit: multi, message_method: "normal", message_dam: dam});
        break;
      default:
        break;
    }
    var new_skills = Object.assign({}, this.state.player.skills);
    for (var skill_name in this.state.player.skills) {
      var new_cd = Math.max(this.state.player.skills[skill_name].cd -1 ,0);
      new_skills[skill_name].cd = new_cd;
    }
    var new_mana = Math.min(this.state.player.mana + parseInt(this.state.player.inte/10), this.state.player.maxmana);
    var new_player = Object.assign({}, this.state.player, {mana: new_mana, skills: new_skills});
    this.setState({player: new_player});
    this.setState({computing: false});
    
    this.after_fight();
  }
  
  skill(data) {
    var new_mana = this.state.player.mana - data.cost;
    var new_cd = skill_list[data.skill_name].base_cd;
    var new_skills = Object.assign({}, this.state.player.skills);
    new_skills[data.skill_name].cd = new_cd;
    var new_player = Object.assign({}, this.state.player, {mana: new_mana, skills: new_skills});
    
    var dex = this.state.player.dex;
    var multi = 1;
    while (true) {
      if (Math.random() * 50 < dex) {
        multi += 0.5;
        dex -= 50;
      } else {
        break;
      }
    }    
    var dam = data.dam * multi;
    var new_monster = Object.assign({}, this.state.monster, {hp: this.state.monster.hp - dam});
    
    this.setState({player: new_player, monster: new_monster, player_status: "normal", monster_status: "normal"});
    this.setState({message: 1, message_atk: "Player", message_crit: multi, message_method: data.skill_name, message_dam: dam});
    this.setState({computing: false});
    this.after_fight();
  }
  
  after_fight() {
    if (this.state.player.hp <= 0) {
      this.setState({player_status: "dead"});
      this.player_pre_dead();
    } else if (this.state.monster.hp <= 0) {
      this.setState({monster_status: "dead"});
      this.player_win();
    }
  }

  
  render() {
    return (
        <div>
          <div id="game_header">
            <Header stage={this.state.stage} player_choice={this.state.player_choice} monster_choice={this.state.monster_choice} game={this.state} update={this.update} />
          </div>
          <div id="game_player">
            <Player player={this.state.player} status={this.state.player_status} game={this.state} update={this.update} />
          </div>
          <div id="game_monster">
            <Monster monster={this.state.monster} status={this.state.monster_status} game={this.state} update={this.update}/>
          </div>
          <div id="game_message">
            <Message message={this.state.message} message_atk={this.state.message_atk} message_crit={this.state.message_crit} message_dam={this.state.message_dam} message_method={this.state.message_method} update={this.update} />
          </div>
          <div id="game_control">
            <Control player={this.state.player} computing={this.state.computing} skills={this.state.player.skills} update={this.update} />
          </div>
        </div>
    );
  }
}

