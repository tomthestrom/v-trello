const observer = {
  update() {
    this.observers.forEach((observer) => observer(data));
  },
};

export { observable };
