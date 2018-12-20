/*eslint-disable */
module.exports =  function (makeGenerator) {
  return () => {
    const generator = makeGenerator.apply(this, arguments);

    function handle(result) {
      // result => { done: [Boolean], value: [Object] }
      if (result.done) return Promise.resolve(result.value);

      return Promise.resolve(result.value).then((res) => {
        return handle(generator.next(res));
      }, (err) => {
        return handle(generator.throw(err));
      });
    }

    try {
      return handle(generator.next());
    } catch (ex) {
      return Promise.reject(ex);
    }
  };
}
/*eslint-enable */
