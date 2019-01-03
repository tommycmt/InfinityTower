class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upgrade: {
              str: "Strength",
              dex: "Dexterity",
              inte: "Intelligence"
      }
    }
    
  }
  
  render() {
    var fight_message = "";
    var message = "";
    switch (this.props.fight_message) {
      case 1:
        fight_message = this.props.message_content.message_atk + " "+ this.props.message_content.message_method +" attacks, deal " + parseFloat(this.props.message_content.message_dam).toFixed(1) + " damages";
        if (this.props.message_content.message_crit > 1) {
          fight_message += ", critical " + this.props.message_content.message_crit + "x";
        }
        break;
      case 2:
        fight_message = "Draw";
        break;
      default:
        fight_message = "";
    }
    switch (this.props.message) {
      case 0:
        message = "New Game";
        break;
      case 11:
        message = "Player wins, Upgrade and go to next stage";
        break;
      case 12:
        message = "Player lose, good luck next time";
        break;
      case 21:
        message = "Upgraded " + this.props.message_content.message_stat_point + " " + this.state.upgrade[this.props.message_content.message_stat_type];
        break;
      default:
        message ="";
    }
    return (
      <div>
        <p id="fight_message">
          {fight_message}
        </p>
        <p id="message">
          {message}
        </p>
      </div>
    );
  }
}

