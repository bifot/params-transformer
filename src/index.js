module.exports = (transformer) => (...args) => {
  args[0].params = transformer(args[0].params);

  return args.length === 3 ? args[2]() : args[1]();
};
