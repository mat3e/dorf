import { DorfTag } from "../src/fields/base/abstract-dorf-field.component";
import { DorfInputDefinition, DorfInputMetadata } from "../src/fields/dorf-input.component";

describe("DorfInputDefinition", () => {
    it("should have default values for type and tag properties", () => {
        // GIVEN + WHEN
        let inputDef = new DorfInputDefinition();

        // THEN
        expect(inputDef.tag).toEqual(DorfTag.INPUT);
        expect(inputDef.type).toEqual("text");
    });
});

describe("DorfInputMetadata", () => {
    it("should get values for type and tag properties from the definition", () => {
        // GIVEN
        let inputDef = new DorfInputDefinition<Date>({ type: "date" });

        // WHEN
        let inputMeta = new DorfInputMetadata<Date>(inputDef);

        // THEN
        expect(inputMeta.tag).toEqual(DorfTag.INPUT);
        expect(inputDef.type).toEqual("date");
    });
});