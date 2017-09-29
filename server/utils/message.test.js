const expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'Zé';
        const text = 'Super Hue';

        let message = generateMessage(from, text);

        expect(message).toInclude({from, text});
        expect(message.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location message object', () => {
        const from = 'Zé';
        const latitude = '123';
        const longitude = '321';

        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;

        let message = generateLocationMessage(from, latitude, longitude);

        expect(message).toInclude({from, url});
        expect(message.createdAt).toBeA('number');
    });
});