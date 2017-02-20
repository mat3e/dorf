import { DorfField } from '../src/fields/base/dorf-field';
import { ICheckboxMapping, DorfCheckboxDefinition } from '../src/fields/dorf-checkbox.definition';
import { DorfCheckboxMetadata } from '../src/fields/dorf-checkbox.metadata';

describe('DorfCheckboxMetadata', () => {
    it('should get values for tag and mapping properties from the definition', () => {
        // GIVEN
        let mapping: ICheckboxMapping<number> = {
            trueValue: 7,
            falseValue: -1
        };
        let def = new DorfCheckboxDefinition<number>({
            mapping
        });

        // WHEN
        let meta = new DorfCheckboxMetadata<number>(def);

        // THEN
        expect(meta.tag).toEqual(DorfField.CHECKBOX);
        expect(meta.mapping).toEqual(mapping);
    });
});
