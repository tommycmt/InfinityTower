class Message extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    var message;
    if (this.props.message == 0) {
      message = "New Game";
    } else if (this.props.message == 1) {
      message = this.props.message_atk + " "+ this.props.message_method +" attacks, deal " + this.props.message_dam + " damages";
      if (this.props.message_crit > 1) {
        message += ", critical " + this.props.message_crit + "x";
      }
    } else if (this.props.message == 2) {
      message = "Draw";
    } else if (this.props.message == 11) {
      message = "Player wins, Upgrade and go to next stage";
    } else if (this.props.message == 12) {
      message = "Player lose, good luck next time";
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

