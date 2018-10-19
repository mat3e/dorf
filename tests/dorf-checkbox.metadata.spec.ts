import { DorfCheckboxDefinition, ICheckboxMapping } from '../src/fields/dorf-checkbox.definition';
import { DorfCheckboxMetadata } from '../src/fields/dorf-checkbox.metadata';

describe('DorfCheckboxMetadata', () => {
    it('should get "mapping" and "innerLabel" values from the definition', () => {
        // GIVEN
        let innerLabel = 'test';
        let mapping: ICheckboxMapping<number> = {
            trueValue: 7,
            falseValue: -1
        };
        let def = new DorfCheckboxDefinition<number>({
            mapping,
            innerLabel
        });

        // WHEN
        let meta = new DorfCheckboxMetadata<number>(def);

        // THEN
        expect(meta.mapping).toEqual(mapping);
        expect(meta.innerLabel).toEqual(innerLabel);
    });
});
