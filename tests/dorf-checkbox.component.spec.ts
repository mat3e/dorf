import { DorfTag } from '../src/fields/base/abstract-dorf-field.component';
import { ICheckboxMapping, DorfCheckboxDefinition, DorfCheckboxMetadata } from '../src/fields/dorf-checkbox.component';

describe('DorfCheckboxDefinition', () => {
    it('should have default value for tag property and no mapping set', () => {
        // GIVEN + WHEN
        let def = new DorfCheckboxDefinition();

        // THEN
        expect(def.tag).toEqual(DorfTag.CHECKBOX);
        expect(def.mapping).toBeUndefined();
    });
});

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
        expect(meta.tag).toEqual(DorfTag.CHECKBOX);
        expect(meta.mapping).toEqual(mapping);
    });
});
