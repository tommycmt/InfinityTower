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
      if (this.props.computing || this.props.player.mana < skill_list[skill_name].cost || skill.lv <= 0 || skill.cd != 0) {
        disable = true;
      }
      btns.push(<button key={skill_name} className="skill_button" disabled={disable} onClick={this.skill.bind(this, skill_name, skill.lv)}>{skill_name} (lv: {skill.lv}, cd: {skill.cd})</button>);
    }
    return btns;
  }
  
  createUpgrade_btn() {
    var btns = [];
    if (this.props.upgrade == true) {
      for (var btn in this.state.upgrade) {
        btns.push(<button key={btn} className="upgrade_button" onClick={this.upgrade_stat.bind(this, btn)}>{this.state.upgrade[btn]}</button>);
      }
    }
    return btns;
  }
      
  
  render() {
    return (
      <div>
        <button style={{"float":"left"}} onClick={this.newGame.bind(this)}>New Game</button>
        {this.createFight_btn()}
        <br />
        <br />
        {this.createSkill_btn()}
        <div style={{"clear":"both","height":"5px"}}></div>
        {this.createUpgrade_btn()}
      </div>
    );
  }
}

