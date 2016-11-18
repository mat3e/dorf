import { DorfConfigService } from "../src/dorf-config.service";

import { DorfTag, DorfFieldDefinition, DorfFieldMetadata } from "../src/fields/abstract-dorf-field.component";
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
        expect(service.INPUT).toEqual("input");
        expect(service.RADIO).toEqual("radio");
        expect(service.SELECT).toEqual("select");
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
            formClass: `${name}${i++}`,
            errorClass: `${name}${i++}`,
            fieldClass: `${name}${i++}`,
            labelClass: `${name}${i++}`,
            groupingClass: `${name}${i++}`,
            additionalMetadataKinds: customDorfKinds
        });

        // THEN
        i = 1;
        expect(service.formClass).toEqual(`${name}${i++}`);
        expect(service.errorClass).toEqual(`${name}${i++}`);
        expect(service.fieldClass).toEqual(`${name}${i++}`);
        expect(service.labelClass).toEqual(`${name}${i++}`);
        expect(service.groupingClass).toEqual(`${name}${i++}`);

        expect(service.isDisabled).toBeFalsy();
        expect(service.isButtonVisible).toBeTruthy();
        expect(service.additionalMetadataKinds).toEqual(customDorfKinds);
    });
});