import Schema from '../src/schema';

export default () => {
    describe('Schema.Boolean', () => {
        it('should be true.', () => {
            Schema.Boolean(1).should.be.true;
        });
        it('should be false.', () => {
            Schema.Boolean(0).should.be.false;
        });
        it('should be a boolean.', () => {
            Schema.Boolean().should.be.a('boolean');
        });
    });
    describe('Schema.Integer', () => {
        it('should equal a certain value.', () => {
            const INT_NUMBER = 3;
            Schema.Integer(INT_NUMBER, INT_NUMBER).should.eq(INT_NUMBER);
        });
        it('should between 0 and 1000.', () => {
            Schema.Integer().should.be.within(0, 1000);
        });
        it('should be an integer.', () => {
            Number.isInteger(Schema.Integer()).should.true;
        });
    });
    describe('Schema.Real', () => {
        it('should equal a certain value.', () => {
            const REAL_NUMBER = 3.14;
            Schema.Real(REAL_NUMBER, REAL_NUMBER).should.eq(REAL_NUMBER);
        });
        it('should between 0 and 1000.', () => {
            Schema.Real().should.be.within(0, 1000);
        });
        it('should be a number.', () => {
            Schema.Real().should.be.a('number');
        });
    });
    describe('Schema.Enum', () => {
        it('should be one of list.', () => {
            const ENUM_VALUE = ['Apple', 'Pear', 'Orange'];
            Schema.Enum(ENUM_VALUE).should.be.oneOf(ENUM_VALUE);
        });
    });
    describe('Schema.Char', () => {
        it('should match a number.', () => {
            Schema.Char({ upperCase: false, lowerCase: false }).should.match(/\d/);
        });
        it('should match a upper case.', () => {
            Schema.Char({ number: false, lowerCase: false }).should.match(/[A-Z]/);
        });
        it('should match a lower case.', () => {
            Schema.Char({ number: false, upperCase: false }).should.match(/[a-z]/);
        });
        it('should be a char.', () => {
            Schema.Char().should.be.a('string');
            Schema.Char().should.have.lengthOf(1);
        });
    });
    describe('Schema.String', () => {
        it('should be a string.', () => {
            Schema.String().should.be.a('string');
        });
    });
    describe('Schema.Date', () => {
        it('should be a Date.', () => {
            Schema.Date().should.be.an.instanceof(Date);
        });
        it('should within two dates.', () => {
            const from = new Date('2015-04-15 22:45:07');
            const to = new Date('2017-09-12 07:21:47');
            Schema.Date(from, to).should.be.within(from, to);
        });
    });
};
