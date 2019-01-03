class Monster extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <div>
        <p>
          Monster: {this.props.monster.name}
          <br />
          HP: {(this.props.monster.hp).toFixed(1)}/{this.props.monster.maxhp}
          <br />
          Mana: {this.props.monster.mana}/{this.props.monster.maxmana}
          <br />
          Strength: {this.props.monster.str}
          <br />
          Dexterity: {this.props.monster.dex}
          <br />
          Intelligence: {this.props.monster.inte}
          <br />
          {this.props.monster.icon[this.props.status]}

        </p>
      </div>
    );
  }
}

