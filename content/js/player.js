class Player extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <p>
          Player: {this.props.player.name}
          <br />
          HP: {this.props.player.hp}/{this.props.player.maxhp}
          <br />
          Mana: {this.props.player.mana}/{this.props.player.maxmana}
          <br />
          Strength: {this.props.player.str}
          <br />
          Dexterity: {this.props.player.dex}
          <br />
          Intelligence: {this.props.player.inte}
          <br />
          {this.props.player.icon[this.props.status]}
          <br />
          Gold: {this.props.player.gold}
          <br />
          Exp: {this.props.player.exp}
        </p>
      </div>
    );
  }
}

