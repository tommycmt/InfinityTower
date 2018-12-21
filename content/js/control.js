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
  
  fight(player_action) {
    this.props.update("fight", {"player_choice": player_action});
  }
  
  createFight_btn() {
    var btns = [];
    for (var btn in this.state.fight) {
      btns.push(<button key={btn} className="fight_button" disabled={this.props.computing} onClick={this.fight.bind(this, this.state.fight[btn])} >{this.state.fight[btn]}</button>);
    }
    return btns
  }
  
  createSkill_btn() {
    var btns = [];
    for (var btn in this.props.skills) {
      btns.push(<button key={btn} className="skill_button" disabled={this.props.computing}>{this.props.skills[btn].name} (lv: {this.props.skills[btn].lv})</button>);
    }
    return btns
  }
  
  createUpgrade_btn() {
    var btns = [];
    for (var btn in this.state.upgrade) {
      btns.push(<button key={btn} className="upgrade_button">{this.state.upgrade[btn]}</button>);
    }
    return btns
  }
      
  
  render() {
    return (
      <div>
        <button style={{"float":"left"}}>New Game</button>
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

