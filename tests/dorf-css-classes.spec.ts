import { IDorfFieldCssClasses, DorfCssClasses } from '../src/base/dorf-css-classes';

describe('DorfCssClasses', () => {
    it('allows creating objects without key restrictions', () => {
        // GIVEN + WHEN
        let result = new DorfCssClasses({ foo: 'bar', bar: 'foo' });

        // THEN
        expect(result.foo).toEqual('bar');
        expect(result.bar).toEqual('foo');
    });

    it('allows creating objects inside objects', () => {
        // GIVEN + WHEN
        let result = new DorfCssClasses({
            foo: 'bar',
            abc: {
                foo: 'bar'
            }
        });

        // THEN
        expect(result.abc['foo']).toEqual('bar');
    });
});
