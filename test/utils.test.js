const {expect} = require('chai');
const utils = require('../lib/utils');

describe('Utils', () => {
  describe('minutesToHoursMinutes', () => {
    it('0 minutes', () => {
      expect(utils.minutesToHoursMinutes(0)).to.equal('0 minutes');
    });
    it('1 minute', () => {
      expect(utils.minutesToHoursMinutes(1)).to.equal('1 minute');
    });
    it('59 minutes', () => {
      expect(utils.minutesToHoursMinutes(59)).to.equal('59 minutes');
    });
    it('60 minutes', () => {
      expect(utils.minutesToHoursMinutes(60)).to.equal('1 hour');
    });
    it('61 minutes', () => {
      expect(utils.minutesToHoursMinutes(61)).to.equal('1 hour 1 minute');
    });
    it('62 minutes', () => {
      expect(utils.minutesToHoursMinutes(62)).to.equal('1 hour 2 minutes');
    });
    it('122 minutes', () => {
      expect(utils.minutesToHoursMinutes(122)).to.equal('2 hours 2 minutes');
    });
  });

  describe('calcTimeToAdd', () => {
    it('0 minutes, round to nearest 0', () => {
      expect(utils.calcTimeToAdd(0, 0)).to.equal(0);
    });
    it('10 minutes, round to nearest 0', () => {
      expect(utils.calcTimeToAdd(10, 0)).to.equal(0);
    });
    it('0 minutes, round to nearest 10', () => {
      expect(utils.calcTimeToAdd(0, 10)).to.equal(0);
    });
    it('1 minute, round to nearest 10', () => {
      expect(utils.calcTimeToAdd(1, 10)).to.equal(9);
    });
    it('1 minute, round to nearest 1000', () => {
      expect(utils.calcTimeToAdd(1, 1000)).to.equal(999);
    });
    it('28 minutes, round to nearest 15', () => {
      expect(utils.calcTimeToAdd(28, 15)).to.equal(2);
    });
  });

  describe('getConfig', () => {
    it('should return an object', () => {
      expect(utils.getConfig()).to.be.an('object');
    });
  });

  describe('format', () => {
    const string = 'This is a Test-string';
    it('formatPrompt', () => {
      expect(utils.formatPrompt(string)).to.include(string);
    });
    it('formatSuccess', () => {
      expect(utils.formatSuccess(string)).to.include(string);
    });
    it('formatWarning', () => {
      expect(utils.formatWarning(string)).to.include(string);
    });
    it('formatError', () => {
      expect(utils.formatError(string)).to.include(string);
    });
  });
});
