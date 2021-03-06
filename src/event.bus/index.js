const transport = Symbol();

export default class EventBus {
  constructor () {
    throw new TypeError(`"${this.constructor.name}" is a static class.`);
  }

  static set transport (newTransport) {
    this[transport] = newTransport;
  }

  static get transport () {
    if (!this[transport]) { throw new ReferenceError(`No Transport defined. Please define one with "${this.name}.transport = new MyTransport()"`); }
    return this[transport];
  }

  static publish (eventName, eventData = {}) {
    this.transport.publish(eventName, eventData);
  }

  static subscribe (eventName, callback) {
    this.transport.subscribe(eventName, callback);
  }

  static any (callback) {
    this.transport.any(callback);
  }
}
