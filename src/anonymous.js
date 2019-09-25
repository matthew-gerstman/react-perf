// One Billion Times
// const NUM_EXECUTIONS = 1000000000;

const NUM_EXECUTIONS = 1000000000;

function runAnonymous() {
  for (let i = 0; i < NUM_EXECUTIONS; i++) {
    (() => {
      // noop
    })();
  }
}

function named() {
  // noop
}

function runNamed() {
  for (let i = 0; i < NUM_EXECUTIONS; i++) {
    named();
  }
}

const startNamed = new Date();
runNamed();
const endNamed = new Date();
const diffNamed = endNamed - startNamed;
console.log(`Named took ${diffNamed} ms`);

const startAnonymous = new Date();
runAnonymous();
const endAnonymous = new Date();
const diffAnonymous = endAnonymous - startAnonymous;
console.log(`Anonymous took ${diffAnonymous} ms`);

const factor = diffAnonymous / diffNamed;
console.log(`Thats a factor of ${factor.toFixed(2)}x!`);
