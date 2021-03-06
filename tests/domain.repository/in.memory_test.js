import 'tests/helper';

import InMemoryEventStore from 'src/domain.repository/in.memory';

describe('InMemoryEventStore', () => {
  let eventStore;
  before(() => {
    eventStore = new InMemoryEventStore();
    eventStore.save({ name: '1.1', data: { some: 'data' }, aggregateUUID: '1' });
    eventStore.save({ name: '1.2', data: { some: 'data' }, aggregateUUID: '1' });
    eventStore.save({ name: '1.3', data: { some: 'data' }, aggregateUUID: '1' });
    eventStore.save({ name: '2.1', data: { some: 'data' }, aggregateUUID: '2' });
    eventStore.save({ name: '2.2', data: { some: 'data' }, aggregateUUID: '2' });
  });

  describe('#queryByUUID', () => {
    it('restores the events by uuid in chronological order', () => {
      const aggregate1Events = eventStore.queryByUUID('1');
      assert.equal(aggregate1Events.length, 3);
      assert.deepEqual(aggregate1Events.map(event => event.name), ['1.1', '1.2', '1.3']);

      const aggregate2Events = eventStore.queryByUUID('2');
      assert.equal(aggregate2Events.length, 2);
      assert.deepEqual(aggregate2Events.map(event => event.name), ['2.1', '2.2']);
    });
  });

  describe('#all', () => {
    it('restores all events in chronological order', () => {
      const allEvents = eventStore.all();
      assert.deepEqual(allEvents.map(event => event.name), ['1.1', '1.2', '1.3', '2.1', '2.2']);
    });
  });
});
