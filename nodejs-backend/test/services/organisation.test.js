const assert = require('assert');
const app = require('../../src/app');

describe('\'organisation\' service', () => {
  it('registered the service', () => {
    const service = app.service('organisation');

    assert.ok(service, 'Registered the service (organisation)');
  });
});
