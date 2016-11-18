import { OptionType } from "../src/fields/abstract-dorf-choose.component";
import { DorfRadioDefinition, DorfRadioMetadata } from "../src/fields/dorf-radio.component";

describe("DorfRadioDefinition", () => {
    it("should have default values for options and tag properties", () => {
        // GIVEN + WHEN
        let radioDef = new DorfRadioDefinition();

        // THEN
        expect(radioDef.tag).toEqual("radio");
        expect(radioDef.optionsToSelect).toEqual([]);
    });
});

describe("DorfRadioMetadata", () => {
    it("should get values for options and tag properties from the definition", () => {
        // GIVEN
        let opts: OptionType<number>[] = [{ key: 1, value: "1" }, { key: 2, value: "2" }];
        let radioDef = new DorfRadioDefinition<number>({ optionsToSelect: opts });

        // WHEN
        let radioMeta = new DorfRadioMetadata<number>(radioDef);

        // THEN
        expect(radioMeta.tag).toEqual("radio");
        expect(radioMeta.optionsToSelect).toEqual(opts);
    });
});