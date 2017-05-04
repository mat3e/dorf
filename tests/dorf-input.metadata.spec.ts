import { DorfField } from '../src/fields/base/dorf-field';
import { InputType, DorfInputDefinition } from '../src/fields/dorf-input.definition';
import { DorfInputMetadata } from '../src/fields/dorf-input.metadata';

describe('DorfInputMetadata', () => {
    it('should get value for "type" from the definition', () => {
        // GIVEN
        let TYPE = 'date' as InputType;
        let inputDef = new DorfInputDefinition<Date>({ type: TYPE });

        // WHEN
        let inputMeta = new DorfInputMetadata<Date>(inputDef);

        // THEN
        expect(inputDef.type).toEqual(TYPE);
    });
});
