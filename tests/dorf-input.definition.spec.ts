import { INPUT } from '../src/fields/base/constants';
import { DorfInputDefinition } from '../src/fields/dorf-input.definition';

describe('DorfInputDefinition', () => {
    it('should have default values for "type" and "tag" properties', () => {
        // GIVEN + WHEN
        let inputDef = new DorfInputDefinition();

        // THEN
        expect(inputDef.tag).toEqual(INPUT);
        expect(inputDef.type).toEqual('text');
    });

    it('is idiotproof when it comes to "type" setting', () => {
        // GIVEN + WHEN
        let inputDef = new DorfInputDefinition({ type: null });

        // THEN
        expect(inputDef.type).toEqual('text');
    })
});
