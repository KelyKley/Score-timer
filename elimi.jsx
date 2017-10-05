class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breakTime: 250,
      workTime: 1000,
      seconds: 0,
      timerId: false,
      active: "ok"
    };

    this.playStop = this.playStop.bind(this);
    this.actualizar = this.actualizar.bind(this);
  }

  actualizar() {
    this.setState(function(prevState, props) {
      const currentState = Object.assign(prevState);
      const stillActive = prevState.seconds + 1 > 0;
      const nextTimer =
        prevState.active === "ok" ? "breakTime" : "ok";

      currentState.seconds = stillActive
        ? currentState.seconds + 1
        : currentState[nextTimer];
      currentState.active = stillActive ? currentState.active : nextTimer;
      if (this.timerID) {
        currentState.timerId = this.timerID;
      }
      return currentState;
    });
  }

  playStop() {
    if (this.state.timerId) {
      clearInterval(this.state.timerId);
      return this.setState({
        seconds: this.state.workTime,
        timerId: false,
        active: "ok"
      });
    }

    this.timerID = setInterval(() => this.actualizar(), 1000);
  }

  updateLength(timer, e) {
    if (this.state.timerId) {
      return false;
    }

    const state = Object.assign({}, this.state);
    state[timer] = e.target.value * 60;
    this.setState(state);
  }
  render() {
    const buttonString = this.state.timerId ? "Stop" : "Start";
    return (
      <div>
        <Time active={this.state.active} seconds={this.state.seconds} />
        <Button action={this.playStop}>{buttonString}</Button>
      </div>
    );
  }
}

const Button = props => (
  <button onClick={props.action}>
    {props.children}
  </button>
);

class Time extends React.Component {
  dosDigitos(num) {
    return num > 9 ? "" + num : "0" + num;
  }

  contadorSegundos(seconds) {
    const segundos = this.dosDigitos(Math.floor((seconds % 3600) % 60));
    return `${segundos}`;
  }

  render() {
    let contador = this.contadorSegundos(this.props.seconds);
    return (
      <div>
        <h2>STOPWATH</h2>
        <h1 className="stopwatch-time">{contador}</h1>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

