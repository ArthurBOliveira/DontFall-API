const expect = require('expect');

const {
    Users
} = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'tst 1',
            room: 'room 1'
        }, {
            id: '2',
            name: 'tst 2',
            room: 'room 2'
        }, {
            id: '3',
            name: 'tst 3',
            room: 'room 1'
        }];
    });

    it('Should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'test',
            room: 'room test'
        };

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('Should remove a User', () => {
        var user = users.removeUser('1');

        expect(user.name).toEqual('tst 1');
        expect(users.users.length).toBe(2);
    });

    it('Should not remove a User', () => {
        var user = users.removeUser('99');

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('Should find User', () => {
        var user = users.getUser('1');

        expect(user.name).toEqual('tst 1');
    });

    it('Should not find User', () => {
        var user = users.getUser('99');

        expect(user).toNotExist();
    });

    it('Should return names', () => {
        var userList = users.getUserList('room 1');

        expect(userList).toEqual(['tst 1', 'tst 3']);
    });
});