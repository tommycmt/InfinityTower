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
    var message;
    if (this.props.message == 0) {
      message = "New Game";
    } else if (this.props.message == 1) {
      message = this.props.message_atk + " "+ this.props.message_method +" attacks, deal " + parseFloat(this.props.message_dam).toFixed(1) + " damages";
      if (this.props.message_crit > 1) {
        message += ", critical " + this.props.message_crit + "x";
      }
    } else if (this.props.message == 2) {
      message = "Draw";
    } else if (this.props.message == 11) {
      message = "Player wins, Upgrade and go to next stage";
    } else if (this.props.message == 12) {
      message = "Player lose, good luck next time";
    } else if (this.props.message == 21) {
      message = "Upgraded " + this.props.message_stat_point + " " + this.state.upgrade[this.props.message_stat_type]
    } else {
      message = "";
    }
    return (
      <div>
        <p id="fight_message">
          {message}
        </p>
        <p id="message">
        </p>
      </div>
    );
  }
}

