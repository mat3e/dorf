import { Validators } from "@angular/forms";

import { DorfInputDefinition, DorfInputMetadata } from "../src/dorf-input.component";
import { DorfSelectDefinition, DorfSelectMetadata } from "../src/dorf-select.component";

import { DorfFieldDefinition, DorfFieldMetadata, AbstractDorfFieldComponent } from "../src/abstract-dorf-field.component";

describe("DorfFieldDefinition", () => {
    it("should have a default value for validator property", () => {
        // GIVEN + WHEN
        let def1: DorfFieldDefinition<any> = new DorfInputDefinition();
        let def2: DorfFieldDefinition<any> = new DorfSelectDefinition();

        // THEN
        expect(def1.validator).toEqual(Validators.nullValidator);
        expect(def2.validator).toEqual(Validators.nullValidator);
    });
});

describe("DorfFieldMetadata", () => {
    it("should get values from the definition", () => {
        // GIVEN
        let def1 = new DorfInputDefinition();
        let def2 = new DorfSelectDefinition();

        // WHEN
        let meta1: DorfFieldMetadata<any> = new DorfInputMetadata(def1);
        let meta2: DorfFieldMetadata<any> = new DorfSelectMetadata(def2);

        // THEN
        expect(meta1.tag).toEqual("input");
        expect(meta2.tag).toEqual("select");
    });

    it("should get values from the provided options", () => {
        // GIVEN
        let def1 = new DorfInputDefinition();
        let def2 = new DorfSelectDefinition();

        // WHEN
        let meta1: DorfFieldMetadata<any> = new DorfInputMetadata(def1, { key: "aaa", order: 2 });
        let meta2: DorfFieldMetadata<any> = new DorfSelectMetadata(def2, { key: "bbb", order: 1 });

        // THEN
        expect(meta1.key).toEqual("aaa");
        expect(meta1.order).toEqual(2);
        expect(meta2.key).toEqual("bbb");
        expect(meta2.order).toEqual(1);
    });
});