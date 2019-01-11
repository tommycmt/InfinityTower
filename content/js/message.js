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
        fight_message = this.props.message_content.message_atk + " "+ this.props.message_content.message_method.replace(new RegExp("_", 'g'), " ") +" attacks, deal " + parseFloat(this.props.message_content.message_dam).toFixed(1) + " damages";
        if (this.props.message_content.message_crit > 1) {
          fight_message += ", critical " + this.props.message_content.message_crit + "x";
        }
        break;
      case 2:
        fight_message = "Draw";
        break;
      case 11:
        fight_message = this.props.message_content.message_buffer + " used " + this.props.message_content.message_skill + ", increased " + this.props.message_content.message_inc.toFixed(0) + " " + this.state.upgrade[this.props.message_content.message_buffType];
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
        message = "Player lose";
        break;
      case 21:
        message = "Upgraded " + this.props.message_content.message_stat_point + " " + this.state.upgrade[this.props.message_content.message_stat_type];
        break;
      case 22:
        message = "Upgraded " + this.props.message_content.message_skill_name.replace(new RegExp("_", 'g'), " ") + " to lv " + this.props.message_content.message_skill_lv;
        break;
      case 31:
        message = "Recover " + this.props.message_content.message_hp + " hp, cost " + this.props.message_content.message_price + " gold";
        break;
      case 32:
        message = "Recover " + this.props.message_content.message_mana + " mana, cost " + this.props.message_content.message_price + " gold";
        break;
      case 33:
        message = "Deal " + this.props.message_content.message_dam + " damage, cost " + this.props.message_content.message_price + " gold";
        break;
      case 34:
        message = "Reborn, cost " + this.props.message_content.message_price + " gold";
        break;
      case 41:
        message = "Saving data";
        break;
      case 42:
        message = this.props.message_content.message_save_data;
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

