class Control extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fight: {
              scissor: "Scissor",
              paper: "Paper",
              stone: "Stone"
      },
      upgrade: {
              str: "Strength",
              dex: "Dexterity",
              inte: "Intelligence"
      }
    }
  }
  
  newGame() {
    var confirmResult = prompt("Are you sure? (Y/y)");
    if (confirmResult.toLowerCase() == "y") {
      this.props.update("new_game", {});
    }
  }
  
  fight(player_action) {
    this.props.update("fight", {"player_choice": player_action});
  }
  
  skill(skill_name, skill_lv) {
    this.props.update("skill", {"skill_name": skill_name, "skill_lv": skill_lv});
  }
  
  upgrade_stat(statType) {
    this.props.update("upgrade", {"type": "stat", "statType": statType});
  }
  
  upgrade_skill(skill_name, exp_cost) {
    this.props.update("upgrade", {"type": "skill", "skill_name": skill_name, "exp_cost": exp_cost});
  }
  
  item(item_name, point, price) {
    this.props.update("item", {"name": item_name, "point": point,  "price": price});
  }
  
  createFight_btn() {
    var btns = [];
    for (var btn in this.state.fight) {
      btns.push(<button key={btn} className="fight_button" disabled={this.props.computing} onClick={this.fight.bind(this, this.state.fight[btn])} >{this.state.fight[btn]}</button>);
    }
    return btns;
  }
  
  createSkill_btn() {
    var btns = [];
    for (var skill_name in this.props.player.skills) {
      var disable = false;
      var skill = this.props.player.skills[skill_name];
      if (this.props.computing || this.props.player.mana < (skill_list[skill_name].cost * skill.lv) || skill.lv <= 0 || skill.cd != 0) {
        disable = true;
      }
      btns.push(<button key={skill_name} className="skill_button" disabled={disable} onClick={this.skill.bind(this, skill_name, skill.lv)}>{skill_name} (lv: {skill.lv}, cd: {skill.cd})</button>);
    }
    return btns;
  }
  
  createItem_btn() {
    var btns =[];
    if (this.props.player.gold >= 10 && this.props.predead != true && this.props.computing != true) {
      btns.push(<button key={"item_hp"} className="item_button" onClick={this.item.bind(this, "hp",10,  10)}>Recover 10 HP (10 gold)</button>);
      btns.push(<button key={"item_mana"} className="item_button" onClick={this.item.bind(this, "mana",10, 10)}>Recover 10 Mana (10 gold)</button>);
      btns.push(<button key={"item_bomb"} className="item_button" onClick={this.item.bind(this, "bomb",10, 10)}>Deal 10 damage (10 gold)</button>);
    }
    if (this.props.predead == true && this.props.player.gold >= 100) {
      btns.push(<button key={"item_reborn"} className="item_button" onClick={this.item.bind(this, "reborn", 0, 100)}>Reborn (100 gold)</button>);
    }
    return btns;
  }
  
  createUpgrade_btn() {
    var btns = [];
    if (this.props.upgrade == true) {
      for (var btn in this.state.upgrade) {
        btns.push(<button key={btn} className="upgrade_button" onClick={this.upgrade_stat.bind(this, btn)}>{this.state.upgrade[btn]}</button>);
      }
      for (var skill_name in this.props.player.skills) {
        var skill = this.props.player.skills[skill_name];
        if (this.props.player.exp >= (skill.lv+skill_list[skill_name].base) * 50) {
          var display_name = skill_name + " (lv: " + skill.lv + " -> " + (skill.lv+1) + ")";
          btns.push(<button key={"upgrade_"+skill_name} className="upgrade_button" onClick={this.upgrade_skill.bind(this, skill_name, (skill.lv+skill_list[skill_name].base) * 50)}>{display_name}</button>);
        }
      }
    }
    return btns;
  }
      
  
  render() {
    return (
      <div>
        <button style={{"float":"left"}} onClick={this.newGame.bind(this)}>New Game</button>
        {this.createFight_btn()}
        <div style={{"clear":"both","height":"2px"}}></div>
        {this.createSkill_btn()}
        <div style={{"clear":"both","height":"2px"}}></div>
        <div className="item_button_group">
          {this.createItem_btn()}
        </div>
        <div style={{"clear":"both","height":"2px"}}></div>
        <div className="upgrade_button_group">
          {this.createUpgrade_btn()}
        </div>
        <div style={{"clear":"both","height":"2px"}}></div>
      </div>
    );
  }
}

