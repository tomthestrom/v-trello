const observable = {
  observers: [],

  subscribe (fn) {
    this.observers.push(fn);
  },

  unsubscribe (fn) {
    this.observers = this.observers.filter(observer => observer !== fn);
  },

  notify (data) {
    this.observers.forEach(observer => observer(data));
  }
};

export { observable };
