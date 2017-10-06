class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0
    }
  }
  render() {
    const start = (e) => {
      this.Start();
    }

    const reset = (e) => {
      this.Reset();
    }

    const stop = (e) => {
      this.Stop();
    }

    return (
      <div className="stopwatch">
        <h2> STOPWATCH</h2>
        <h1 className="stopwatch-time">{this.state.time}</h1>
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <button onClick={reset}>Reset</button>
      </div>
    );
  }

  Start() {
    this.timer = setInterval(() => {
      this.setState({
        time: this.state.time + 1
      });
    }, 1000);
  }

  Stop() {
    clearInterval(this.timer);
  }
  Reset() {
    clearInterval(this.timer);
    this.setState({
      time: 0
    });
    this.Stop();
  }
}

class Model {
  constructor() {
    this.todos = [
      {
        text: "Jim Hoskins",
        score: 31,
        id: 1
      },
      {
        text: "Andree Hoskins",
        score: 35,
        id: 2
      },
      {
        text: "Alena Hoskins",
        score: 42,
        id: 3
      }
    ];
    this.inputValue = null;
    this.render = undefined;
    this.contador = 0;
  }

  subscribe(render) {
    this.render = render;
  }
  inform() {
    console.log(this.todos.map(e => e.text));
    this.render();
  }
  addTodo(text) {
    //añade tareas
    this.todos.push({
      id: Utils.uuid(),
      text: text,
      completed: false
    });
    this.inform();
  }
  updateTodo(index, todo) {
    this.todos[index] = todo;
    this.inform();
  }
  removeTodo(todo) {
    this.todos = this.todos.filter(item => item !== todo);
    this.inform();
  }
  sumaPuntos() {
    let suma = 0;
    for (let player of this.todos) suma += player.score;
    return suma;
  }
}

const App = ({ title, model }) => {
  const items = model.todos.map((todo, index) => {
    return (
      <div className="player counter" key={todo.id}>
        <button
          className="player eliminar"
          onClick={() => model.removeTodo(todo)}
        >
          {" "}
          x{" "}
        </button>
        <div
          className="player-name counter-score"
          type="text"
          onChange={e =>
            model.updateTodo(index, {
              id: todo.id,
              text: e.target.value,
              completed: todo.completed
            })}
        >
          {todo.text}
        </div>
        <div className="player-score counter">
          <button className="player decrement counter-action"> - </button>
          <div className="counter-score">{todo.score}</div>
          <button className="player increment counter-action"> + </button>
        </div>
      </div>
    );
  });

  return (
    <div className="scoreboard">
      <div className="header">
        <table className="stats counter counter-player">
          <tbody>
            <tr>
              <td>PLAYERS:</td>
              <td>{model.todos.length}</td>
            </tr>
            <tr>
              <td>TOTAL POINTS:</td>
              <td>{model.sumaPuntos()}</td>
            </tr>
          </tbody>
        </table>
        <Timer />
      </div>
      <div> {items} </div>

      <div className="add-player-form">
        <form
          onSubmit={e => {
            e.preventDefault();
            model.addTodo(model.inputValue);
          }}
        >
          <input
            type="text"
            placeholder="ENTER A NAME"
            onChange={e => (model.inputValue = e.target.value)}
          />
          <input type="submit" value="ADD PLAYER" />
        </form>
      </div>
    </div>
  );
};

let model = new Model();
let counter = 1;

let render = () => {
  console.log("render times: ", counter++);
  ReactDOM.render(
    <App title="Scoreboard" model={model} />,
    document.getElementById("container")
  );
};

model.subscribe(render);
render();
