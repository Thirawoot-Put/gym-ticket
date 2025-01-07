function bindAll(instance: any): void {
  const prototype = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(prototype).forEach((method) => {
    if (typeof prototype[method] === 'function' && method !== 'constructor') {
      prototype[method] = prototype[method].bind(instance);
    }
  });
}

export default bindAll;
