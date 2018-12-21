class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
              {
              }
            ]
    }
  }
  
  render() {
    return (
      <div>
        <p>
          Stage: {this.props.stage}<br />
          {this.props.player_choice}:{this.props.monster_choice}
        </p>
      </div>
    );
  }
}

