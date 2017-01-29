import { OptionType, DorfChooseDefinition, DorfChooseMetadata } from "../src/fields/base/abstract-dorf-choose.component";
import { DorfRadioDefinition, DorfRadioMetadata } from "../src/fields/dorf-radio.component";
import { DorfSelectDefinition, DorfSelectMetadata } from "../src/fields/dorf-select.component";

describe("DorfChooseDefinition", () => {
    it("should have default values for options", () => {
        // GIVEN + WHEN
        let def1: DorfChooseDefinition<string> = new DorfRadioDefinition<string>();
        let def2: DorfChooseDefinition<number> = new DorfSelectDefinition<number>();

        // THEN
        expect(def1.optionsToSelect).toEqual(def2.optionsToSelect);
    });
});

describe("DorfChooseMetadata", () => {
    it("should get values for options from the definition", () => {
        // GIVEN
        let opts1: OptionType<string>[] = [{ key: "1", value: "1" }, { key: "2", value: "2" }];
        let opts2: OptionType<number>[] = [{ key: 1, value: "1" }, { key: 2, value: "2" }];
        let def1 = new DorfRadioDefinition<string>({ optionsToSelect: opts1 });
        let def2 = new DorfSelectDefinition<number>({ optionsToSelect: opts2 });

        // WHEN
        let meta1: DorfChooseMetadata<string, DorfChooseDefinition<string>> = new DorfRadioMetadata<string>(def1);
        let meta2: DorfChooseMetadata<number, DorfChooseDefinition<number>> = new DorfSelectMetadata<number>(def2);

        // THEN
        expect(meta1.optionsToSelect).toEqual(opts1);
        expect(meta2.optionsToSelect).toEqual(opts2);
    });
});