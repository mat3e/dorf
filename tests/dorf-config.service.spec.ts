import { DorfGeneralCssClasses } from '../src/base/dorf-css-classes';
import { DorfConfigService } from '../src/dorf-config.service';

import { DorfFieldDefinition } from '../src/fields/base/abstract-dorf-field.definition';
import { DorfFieldMetadata } from '../src/fields/base/abstract-dorf-field.metadata';
import { BUILT_IN_FIELDS, DorfField } from '../src/fields/base/dorf-field';
import { DorfInputMetadata } from '../src/fields/dorf-input.metadata';
import { DorfRadioMetadata } from '../src/fields/dorf-radio.metadata';
import { DorfSelectMetadata } from '../src/fields/dorf-select.metadata';

describe('DorfConfigService', () => {
    it('should have default values', () => {
        // GIVEN + WHEN
        let service = new DorfConfigService();

        // THEN
        expect(service.isDisabled).toBeFalsy();
        expect(service.dorfFields).toEqual(BUILT_IN_FIELDS);
        expect(service.css).toEqual(new DorfGeneralCssClasses());
    });

    it('returns DorfField for a given tag', () => {
        // GIVEN
        let service = new DorfConfigService();

        // WHEN
        let result = service.getFieldForTag(DorfField.INPUT);

        // THEN
        expect(result).toEqual(BUILT_IN_FIELDS[0]);
    });

    it('allows replacing DorfField for a given tag', () => {
        // GIVEN
        let service = new DorfConfigService();

        let replacement = {
            tag: DorfField.INPUT,
            css: {
                field: 'changed-class'
            }
        } as DorfField<typeof DorfFieldDefinition, typeof DorfFieldMetadata>;
        expect(service.dorfFields[0].css.field).toBeUndefined();

        // WHEN
        service.setFieldForTag(DorfField.INPUT, replacement);

        // THEN
        expect(service.dorfFields[0].css.field).toEqual(replacement.css.field);
    });

    it('should get values from the provided config', () => {
        // GIVEN
        let i = 1;
        let name = 'class';
        class TestMeta<T> extends DorfFieldMetadata<T, DorfFieldDefinition<T>> { /**/ }
        let customDorfKinds: DorfField<typeof DorfFieldDefinition, typeof DorfFieldMetadata>[] = [{
            tag: 'test',
            definition: DorfFieldDefinition,
            metadata: TestMeta,
            css: {
                field: `${name}${i++}`,
                label: `${name}${i++}`,
                error: `${name}${i++}`,
                group: `${name}${i++}`
            }
        }];

        // WHEN
        let service = new DorfConfigService({
            css: {
                form: `${name}${i++}`,
                fieldset: `${name}${i++}`,
                field: `${name}${i++}`,
                label: `${name}${i++}`,
                error: `${name}${i++}`,
                group: `${name}${i++}`,
                section: `${name}${i++}`,
                buttons: {
                    save: `${name}${i++}`,
                    reset: `${name}${i++}`,
                    group: `${name}${i++}`
                }
            },
            dorfFields: customDorfKinds
        });

        // THEN
        i = Object.keys(customDorfKinds[0].css).length + 1; // 5
        expect(service.css.form).toEqual(`${name}${i++}`);
        expect(service.css.fieldset).toEqual(`${name}${i++}`);
        expect(service.css.field).toEqual(`${name}${i++}`);
        expect(service.css.label).toEqual(`${name}${i++}`);
        expect(service.css.error).toEqual(`${name}${i++}`);
        expect(service.css.group).toEqual(`${name}${i++}`);
        expect(service.css.section).toEqual(`${name}${i++}`);
        expect(service.css.buttons.save).toEqual(`${name}${i++}`);
        expect(service.css.buttons.reset).toEqual(`${name}${i++}`);
        expect(service.css.buttons.group).toEqual(`${name}${i++}`);

        expect(service.isDisabled).toBeFalsy();
        expect(service.dorfFields.length).toEqual(5);
        expect(service.dorfFields[4]).toEqual(customDorfKinds[0]);
    });
});
