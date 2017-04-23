import { DorfField } from '../src/fields/base/dorf-field';
import { ICheckboxMapping, DorfCheckboxDefinition } from '../src/fields/dorf-checkbox.definition';
import { DorfCheckboxMetadata } from '../src/fields/dorf-checkbox.metadata';

describe('DorfCheckboxMetadata', () => {
    it('should get values from the definition', () => {
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
        expect(meta.tag).toEqual(DorfField.CHECKBOX);
        expect(meta.mapping).toEqual(mapping);
        expect(meta.innerLabel).toEqual(innerLabel);
    });
});