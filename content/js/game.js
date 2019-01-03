class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 1,
      player: choosePlayer(),
      history: {},
      computing: false,
      predead: false,
    }
    this.init();
    this.update = this.update_game_state.bind(this);
    console.log(this);
  }
  
  init() {
    this.state.player.maxhp    = this.state.player.str * 1.5;
    this.state.player.maxmana  = this.state.player.inte;
    this.state.player.hp       = this.state.player.maxhp;
    this.state.player.mana     = this.state.player.maxmana;
    this.state.player_status   = "normal";
    
    this.state.monster         = genMonster(this.state.stage);
    this.state.monster.maxhp   = this.state.monster.str * 1.5;
    this.state.monster.maxmana = this.state.monster.inte;
    this.state.monster.hp      = this.state.monster.maxhp;
    this.state.monster.mana    = this.state.monster.maxmana;
    this.state.monster_status  = "normal";
    this.state.history         = this.state.player;
  }
  
  update_game_state(op, data) {
    this.setState({computing: true});
    switch (op) {
      case "new_game": 
        this.setState({stage: 1, player: choosePlayer(), history: [], predead: false}, function() {
          this.init();
          this.setState({computing: false});
        });
        break;
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
      case "upgrade":
        if (data.type == "stat") {
          this.upgrade_stat(data);
        } else if (data.type == "skill") {
          this.upgrade_skill(data.skill_name, data.exp_cost);
        }
        break;
      case "item":
        this.setState({fight_message: -1});
        if (data.name == "reborn") {
          var new_player = Object.assign({}, this.state.player, {gold: (this.state.player.gold - data.price)});
          this.setState({player: new_player, message:34, message_content:{message_price: 100}}, () =>
            {setTimeout(()=>{
              this.init();
              this.setState({computing: false, predead: false});
              this.setState({message: -1});
            }, 1500);}
          );
        } else {
          switch (data.name) {
            case "hp":
              var new_hp = Math.min(parseInt(this.state.player.hp) + parseInt(data.point), this.state.player.maxhp);
              var new_player = Object.assign({}, this.state.player, {hp: new_hp, gold: (this.state.player.gold - data.price)});
              this.setState({player: new_player});
              this.setState({message: 31, message_content: {message_price: data.price, message_hp:data.point}});
              break;
            case "mana":
              var new_mana = Math.min(parseInt(this.state.player.mana) + parseInt(data.point), this.state.player.maxmana);
              var new_player = Object.assign({}, this.state.player, {mana: new_mana, gold: (this.state.player.gold - data.price)});
              this.setState({player: new_player});
              this.setState({message: 32, message_content: {message_price: data.price, message_mana:data.point}});
              break;
            case "bomb":
              var dam = data.point;
              var new_player = Object.assign({}, this.state.player, {gold: (this.state.player.gold - data.price)});
              this.setState({player: new_player});
              var new_monster = Object.assign({}, this.state.monster, {hp: (this.state.monster.hp - dam).toFixed(1)});
              this.setState({monster: new_monster});
              this.setState({player_status: "atk", monster_status: "damaged"});
              this.setState({message: 33, message_content: {message_price: data.price, message_dam:data.point}});
              break;
          }
          setTimeout(()=>{this.after_fight()}, 1000);
        }
      default:
    }    
  }
  
  fight(op) {
    switch (op) {
      case "draw":
        this.setState({fight_message: 2});
        break;
      case "player_hit":
        var dex = this.state.player.dex;
        var multi = 1;
        while (true) {
          if (Math.random() * 50 < dex) {
            multi += 0.25;
            dex -= 50;
          } else {
            break;
          }
        }          
        var dam = ((this.state.player.str/10 + parseInt(this.state.player.inte/5)) * multi).toFixed(1);
        var new_monster = Object.assign({}, this.state.monster, {hp: (this.state.monster.hp - dam).toFixed(1)});
        this.setState({monster: new_monster, player_status: "normal", monster_status: "normal"});
        this.setState({fight_message: 1, message_content: {message_atk: "Player", message_crit: multi, message_method: "normal", message_dam: dam}});
        break;
      case "monster_hit":
        var dex = this.state.monster.dex;
        var multi = 1;
        while (true) {
          if (Math.random() * 50 < dex) {
            multi += 0.25;
            dex -= 50;
          } else {
            break;
          }          
        }
        var dam = ((this.state.monster.str/10 + parseInt(this.state.monster.inte/5)) * multi).toFixed(1);
        var new_player = Object.assign({}, this.state.player, {hp: (this.state.player.hp - dam).toFixed(1)});
        this.setState({player: new_player, player_status: "normal", monster_status: "normal"});
        this.setState({fight_message: 1, message_content: {message_atk: "Monster", message_crit: multi, message_method: "normal", message_dam: dam}});
        break;
      default:
        break;
    }
    var new_skills = Object.assign({}, this.state.player.skills);
    for (var skill_name in this.state.player.skills) {
      var new_cd = Math.max(this.state.player.skills[skill_name].cd -1 ,0);
      new_skills[skill_name].cd = new_cd;
    }
    var new_mana = Math.min(this.state.player.mana + parseInt(this.state.player.inte/6), this.state.player.maxmana);
    var new_player = Object.assign({}, this.state.player, {mana: new_mana, skills: new_skills});
    this.setState({player: new_player});    
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
        multi += 0.25;
        dex -= 50;
      } else {
        break;
      }
    }    
    var dam = (data.dam * multi).toFixed(1);
    var new_monster = Object.assign({}, this.state.monster, {hp: (this.state.monster.hp - dam).toFixed(1)});
    
    this.setState({player: new_player, monster: new_monster, player_status: "normal", monster_status: "normal"});
    this.setState({fight_message: 1, message_content: {message_atk: "Player", message_crit: multi, message_method: data.skill_name, message_dam: dam}});
    this.after_fight();
    
  }
  
  after_fight() {
    if (this.state.player.hp <= 0) {
      this.setState({player_status: "dead"});
      this.setState({message: 12});
      setTimeout(()=>{this.player_pre_dead()}, 1000);
    } else if (this.state.monster.hp <= 0) {
      this.setState({monster_status: "dead"});
      this.setState({message: 11});
      setTimeout(()=>{this.player_win()}, 1000);
    } else {
      this.setState({computing: false, message: -1});
    }
  }
  
  player_pre_dead() {
    this.setState({fight_message: -1});
    this.setState({predead: true});
  }

  player_win() {
    this.setState({fight_message: -1});
    this.setState({upgrading: true});
    
    var new_player = Object.assign({}, this.state.player, {gold: this.state.player.gold + parseInt(Math.random() * 2) + (this.state.stage * 2),
                                                           exp:  this.state.player.exp + parseInt(Math.random() * 4) + (this.state.stage * 2)});
                                                           
    this.setState({player: new_player});
  }
  
  upgrade_stat(data) {
    var stat_point = parseInt((this.state.stage+5)/5);
    var statType = data.statType;
    var new_player = Object.assign({}, this.state.player, {[statType]: this.state.player[data.statType] + stat_point});
    this.setState({player: new_player, upgrading: false, message: 21, message_content: {message_stat_type: statType,message_stat_point: stat_point}}, 
      () => 
          {setTimeout(()=>{
            var curr_stage = this.state.stage;
            this.setState({stage: curr_stage + 1});
            this.init();
            this.setState({computing: false, });
            this.setState({message: -1});
          }, 1500);}
    );
  }
  
  upgrade_skill(skill_name, exp_cost) {
    var new_lv = this.state.player.skills[skill_name].lv + 1;
    var new_skills = Object.assign({}, this.state.player.skills);
    new_skills[skill_name].lv = new_lv;
    var new_player = Object.assign({}, this.state.player, {skills: new_skills, exp: this.state.player.exp - exp_cost});
    
    this.setState({player: new_player, upgrading: false, message: 22, message_content: {message_skill_name: skill_name, message_skill_lv: new_lv}}, 
      () => 
          {setTimeout(()=>{
            var curr_stage = this.state.stage;
            this.setState({stage: curr_stage + 1});
            this.init();
            this.setState({computing: false, });
            this.setState({message: -1});
          }, 1500);}
    );
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
            <Message fight_message={this.state.fight_message} message={this.state.message} message_content={this.state.message_content} update={this.update} />
          </div>
          <div id="game_control">
            <Control player={this.state.player} computing={this.state.computing} skills={this.state.player.skills} upgrade={this.state.upgrading} predead={this.state.predead}update={this.update} />
          </div>
        </div>
    );
  }
}

