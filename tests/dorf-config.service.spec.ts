import { DorfCssClasses } from '../src/base/dorf-css-classes';
import { DorfConfigService } from '../src/dorf-config.service';

import { DorfFieldDefinition } from '../src/fields/base/abstract-dorf-field.definition';
import { DorfFieldMetadata, AnyMetadata } from '../src/fields/base/abstract-dorf-field.metadata';
import { INPUT, RADIO, NESTED, IDorfField, DorfField, DorfNestedField, getBuiltInFields } from '../src/fields/base/dorf-field';
import { DorfInputMetadata } from '../src/fields/dorf-input.metadata';
import { DorfRadioMetadata } from '../src/fields/dorf-radio.metadata';
import { DorfSelectMetadata } from '../src/fields/dorf-select.metadata';

describe('DorfConfigService', () => {
    it('should have default values', () => {
        // GIVEN + WHEN
        let service = new DorfConfigService();

        // THEN
        expect(service.isDisabled).toBeFalsy();
        expect(service.dorfFields).toEqual(getBuiltInFields() as any);
        expect(service.css).toEqual(new DorfCssClasses());
        expect(service.columnsNumber).toEqual(1);
    });

    it('returns DorfField for a given tag', () => {
        // GIVEN
        let service = new DorfConfigService();

        // WHEN
        let result = service.getFieldForTag(INPUT);

        // THEN
        expect(result).toEqual(getBuiltInFields()[0]);
    });

    it('allows replacing DorfField for a given tag', () => {
        // GIVEN
        let service = new DorfConfigService();

        let replacement = {
            tag: INPUT,
            css: {
                htmlField: 'changed-class'
            }
        } as DorfField<typeof DorfFieldDefinition, typeof AnyMetadata>;
        expect(service.dorfFields[0].css.htmlField).toBeUndefined();

        // WHEN
        service.setField(replacement);

        // THEN
        expect(service.dorfFields[0].css.htmlField).toEqual(replacement.css.htmlField);
    });

    it('allows adding a new DorfField', () => {
        // GIVEN
        let service = new DorfConfigService();

        let newField = {
            css: {
                htmlField: 'test'
            }
        } as DorfField<typeof DorfFieldDefinition, typeof AnyMetadata>;

        // WHEN
        service.setField(newField);

        // THEN
        expect(service.dorfFields[service.dorfFields.length - 1].css.htmlField).toEqual(newField.css.htmlField);
    });

    it('should get values from the provided config', () => {
        // GIVEN
        let i = 1;
        let name = 'class';
        class TestMeta<T> extends DorfFieldMetadata<T, DorfFieldDefinition<T>> { /**/ }
        let customDorfKinds: IDorfField<typeof DorfFieldDefinition, typeof AnyMetadata>[] = [{
            tag: 'test',
            definition: DorfFieldDefinition,
            metadata: TestMeta,
            css: {
                fieldGeneralization: `${name}${i++}`,
                dorfField: `${name}${i++}`,
                htmlField: `${name}${i++}`,
                label: `${name}${i++}`,
                error: `${name}${i++}`,
                wrapper: `${name}${i++}`
            }
        }];

        // WHEN
        let service = new DorfConfigService({
            css: {
                form: `${name}${i++}`,
                fieldset: `${name}${i++}`,
                fieldGeneralization: `${name}${i++}`,
                dorfField: `${name}${i++}`,
                htmlField: `${name}${i++}`,
                label: `${name}${i++}`,
                error: `${name}${i++}`,
                wrapper: `${name}${i++}`,
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
        i = Object.keys(customDorfKinds[0].css).length + 1; // 7
        expect(service.css.form).toEqual(`${name}${i++}`);
        expect(service.css.fieldset).toEqual(`${name}${i++}`);
        expect(service.css.fieldGeneralization).toEqual(`${name}${i++}`);
        expect(service.css.dorfField).toEqual(`${name}${i++}`);
        expect(service.css.htmlField).toEqual(`${name}${i++}`);
        expect(service.css.label).toEqual(`${name}${i++}`);
        expect(service.css.error).toEqual(`${name}${i++}`);
        expect(service.css.wrapper).toEqual(`${name}${i++}`);
        expect(service.css.section).toEqual(`${name}${i++}`);
        expect(service.css.buttons.save).toEqual(`${name}${i++}`);
        expect(service.css.buttons.reset).toEqual(`${name}${i++}`);
        expect(service.css.buttons.group).toEqual(`${name}${i++}`);

        expect(service.dorfFields.length).toEqual(getBuiltInFields().length + 1);
        expect(service.dorfFields[service.dorfFields.length - 1]).toEqual(new DorfField(customDorfKinds[0]));
    });

    describe('getCssClassForTag', () => {
        // GIVEN
        let tag = RADIO;
        let expected1 = 'from field in config';
        let expected2 = 'from config';
        let cfg1 = new DorfConfigService({
            css: {
                htmlField: expected2
            },
            dorfFields: [{
                tag,
                css: {
                    htmlField: expected1
                }
            }]
        });
        let cfg2 = new DorfConfigService({
            css: {
                htmlField: expected2
            }
        });
        let runs: any[] = [
            ['returns class from field if defined', cfg1, expected1],
            ['returns class from config if no other classes', cfg2, expected2]
        ]

        runs.forEach((run) => {
            it(run[0], () => {
                // WHEN
                let result = (run[1] as DorfConfigService).getCssClassForTag(tag, 'htmlField');

                // THEN
                expect(result).toEqual(run[2]);
            });
        });
    });

    describe('- getCssClassForNestedTag:', () => {
        // GIVEN
        let mockedResultFromFunction = 'TEST';

        let tag = RADIO;
        let expected1 = 'from field in group';
        let expected2 = 'from group';
        let cfg1 = new DorfConfigService({
            dorfFields: [{
                tag: NESTED,
                css: {
                    htmlField: expected2
                },
                dorfFields: [{
                    tag,
                    css: {
                        htmlField: expected1
                    }
                }]
            }]
        });
        let cfg2 = new DorfConfigService({
            dorfFields: [{
                tag: NESTED,
                css: {
                    htmlField: expected2
                }
            }]
        });
        let cfg3 = new DorfConfigService({});
        let runs: any[] = [
            ['returns class from configured field in group if defined', cfg1, expected1],
            ['returns class from group if no field in group defined', cfg2, expected2],
            ['returns class from "getCssClassForTag" if nothing defined in group', cfg3, mockedResultFromFunction]
        ]

        runs.forEach((run) => {
            it(run[0], () => {
                // GIVEN
                spyOn(run[1], 'getCssClassForTag').and.returnValue(mockedResultFromFunction);

                // WHEN
                let result = (run[1] as DorfConfigService).getCssClassForNestedTag(tag, 'htmlField');

                // THEN
                expect(result).toEqual(run[2]);
            });
        });
    });
});
