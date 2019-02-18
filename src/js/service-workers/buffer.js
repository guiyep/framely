const queue = [];

let executor;

const add = (event) => {
  queue.add(event);
};

const remove = () => {};

// TODO this need to me inside timeout and process it
while (queue.length > 0) {
  executor();
}

const singleton = {
  createBufferSingleton: (exec) => {
    if (!executor) {
      executor = exec;
    } else if (exec) {
      throw Error('Buffer singleton already initialized');
    }

    return {
      add,
      remove
    };
  }
};

export default singleton;
