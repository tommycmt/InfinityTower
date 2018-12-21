class Message extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    var message;
    if (this.props.message == 1) {
      message = this.props.message_atk + " "+ this.props.message_method +" attacks, deal " + this.props.message_dam + " damages";
      if (this.props.message_crit > 1) {
        message += ", critical " + this.props.message_crit + "x";
      }
    } else if (this.props.message == 2) {
      message = "Draw";
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

