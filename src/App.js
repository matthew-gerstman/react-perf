import React from 'react';
import './App.css';

const bigObject = {};
for (let i = 0; i < 1000000; i++) {
  bigObject[`${i}`] = `${i}`;
}
// 100 - 0.1 ms
// 1000 - 0.5 ms
// 10000 - 3 ms
// 100000 - 100 ms
// 1000000 - 675 ms

class App extends React.Component {
  state = {anonymousFunctions: true, count: 10, expensive: 'expensive'};
  updateCount = e => {
    this.setState({count: e.target.value});
  };
  updateExpensive = e => {
    this.setState({expensive: e.target.value});
  };
  updateAnonymous = () => {
    this.setState({anonymousFunctions: !this.state.anonymousFunctions});
  };
  minus = () => {
    this.setState({count: this.state.count - 1});
  };
  plus = () => {
    this.setState({count: this.state.count + 1});
  };
  render() {
    const {anonymousFunctions, expensive, count} = this.state;
    console.log({anonymousFunctions});
    return (
      <div className="App">
        <h1>{count}</h1>
        <div>
          <label>Num Fields: </label>
          <input value={count} onChange={this.updateCount} type="number" />{' '}
          <br />
          <label>Use Anonymous Functions</label>
          <input
            type="checkbox"
            checked={anonymousFunctions}
            onChange={this.updateAnonymous}
          />
          <br />
          <input value={expensive} onChange={this.updateExpensive} />
          <button onClick={this.minus}>-</button>
          <button onClick={this.plus}>+</button>
        </div>
        <br />

        {anonymousFunctions ? (
          <AnonymousNumberList count={count} />
        ) : (
          <NumberList count={count} />
        )}
      </div>
    );
  }
}

export default App;

function AnonymousNumberList({count}) {
  let list = [];
  for (let i = 0; i < count; i++) {
    list.push(<Number getNumber={() => i} key={i} />);
  }
  return list;
}

function NumberList({count}) {
  let list = [];
  for (let i = 0; i < count; i++) {
    list.push(<Number number={i} key={i} />);
  }
  return list;
}

function Number({number, getNumber}) {
  return (
    <h1 style={{color: number != null ? 'red' : 'blue'}}>
      {number != null ? number : getNumber()}
      <ExpensiveComponent {...bigObject} />
    </h1>
  );
}

function sleep(seconds) {
  const startTime = new Date();
  const endTime = startTime.setSeconds(startTime.getSeconds() + seconds);
  console.log({startTime, endTime});
  while (new Date() < endTime) {
    // wait;
    continue;
  }

  return;
}

let rendered = 0;
const ExpensiveComponent = () => {
  sleep(1);
  return 'expensive';
};
