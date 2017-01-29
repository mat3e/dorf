import { DorfServiceCss } from "../src/base/dorf-css-classes.model";
import { DorfConfigService } from "../src/dorf-config.service";

import { DorfTag, DorfFieldDefinition, DorfFieldMetadata } from "../src/fields/base/abstract-dorf-field.component";
import { DorfInputMetadata } from "../src/fields/dorf-input.component";
import { DorfRadioMetadata } from "../src/fields/dorf-radio.component";
import { DorfSelectMetadata } from "../src/fields/dorf-select.component";

describe("DorfService", () => {
    it("should have default values", () => {
        // GIVEN + WHEN
        let service = new DorfConfigService();

        // THEN
        expect(service.isDisabled).toBeFalsy();
        expect(service.isButtonVisible).toBeTruthy();
        expect(service.css).toEqual(new DorfServiceCss());
        expect(service.INPUT).toEqual(DorfTag.INPUT);
        expect(service.RADIO).toEqual(DorfTag.RADIO);
        expect(service.SELECT).toEqual(DorfTag.SELECT);
        expect(service.CHECKBOX).toEqual(DorfTag.CHECKBOX);
    });

    it("should get values from the provided config", () => {
        // GIVEN
        let i = 1;
        let name = "class";
        class TestMeta<T> extends DorfFieldMetadata<T, DorfFieldDefinition<T>> { /**/ }
        let customDorfKinds: DorfTag<typeof DorfFieldDefinition, typeof DorfFieldMetadata>[] = [{
            tag: "test",
            definition: DorfFieldDefinition,
            metadata: TestMeta
        }];

        // WHEN
        let service = new DorfConfigService({
            css: {
                general: {
                    form: `${name}${i++}`,
                    fieldset: `${name}${i++}`,
                    field: `${name}${i++}`,
                    label: `${name}${i++}`,
                    error: `${name}${i++}`,
                    group: `${name}${i++}`
                },
                input: {
                    field: `${name}${i++}`,
                    label: `${name}${i++}`,
                    error: `${name}${i++}`,
                    group: `${name}${i++}`
                },
                radio: {
                    field: `${name}${i++}`,
                    label: `${name}${i++}`,
                    error: `${name}${i++}`,
                    group: `${name}${i++}`
                },
                select: {
                    field: `${name}${i++}`,
                    label: `${name}${i++}`,
                    error: `${name}${i++}`,
                    group: `${name}${i++}`
                },
                checkbox: {
                    field: `${name}${i++}`,
                    label: `${name}${i++}`,
                    error: `${name}${i++}`,
                    group: `${name}${i++}`
                }
            },
            additionalMetadataKinds: customDorfKinds
        });

        // THEN
        i = 1;
        expect(service.css.general.form).toEqual(`${name}${i++}`);
        expect(service.css.general.fieldset).toEqual(`${name}${i++}`);
        expect(service.css.general.field).toEqual(`${name}${i++}`);
        expect(service.css.general.label).toEqual(`${name}${i++}`);
        expect(service.css.general.error).toEqual(`${name}${i++}`);
        expect(service.css.general.group).toEqual(`${name}${i++}`);

        expect(service.css.input.field).toEqual(`${name}${i++}`);
        expect(service.css.input.label).toEqual(`${name}${i++}`);
        expect(service.css.input.error).toEqual(`${name}${i++}`);
        expect(service.css.input.group).toEqual(`${name}${i++}`);

        expect(service.css.radio.field).toEqual(`${name}${i++}`);
        expect(service.css.radio.label).toEqual(`${name}${i++}`);
        expect(service.css.radio.error).toEqual(`${name}${i++}`);
        expect(service.css.radio.group).toEqual(`${name}${i++}`);

        expect(service.css.select.field).toEqual(`${name}${i++}`);
        expect(service.css.select.label).toEqual(`${name}${i++}`);
        expect(service.css.select.error).toEqual(`${name}${i++}`);
        expect(service.css.select.group).toEqual(`${name}${i++}`);

        expect(service.css.checkbox.field).toEqual(`${name}${i++}`);
        expect(service.css.checkbox.label).toEqual(`${name}${i++}`);
        expect(service.css.checkbox.error).toEqual(`${name}${i++}`);
        expect(service.css.checkbox.group).toEqual(`${name}${i++}`);

        expect(service.isDisabled).toBeFalsy();
        expect(service.isButtonVisible).toBeTruthy();
        expect(service.additionalMetadataKinds).toEqual(customDorfKinds);
    });
});