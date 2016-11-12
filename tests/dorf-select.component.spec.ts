import { OptionType, DorfSelectDefinition, DorfSelectMetadata } from "../src/dorf-select.component";

describe("DorfSelectDefinition", () => {
    it("should have default values for multiple, select and tag properties", () => {
        // GIVEN + WHEN
        let selectDef = new DorfSelectDefinition();

        // THEN
        expect(selectDef.tag).toEqual("select");
        expect(selectDef.multiple).toBeFalsy();
        expect(selectDef.optionsToSelect).toEqual([]);
    });
});

describe("DorfSelectMetadata", () => {
    it("should get values for multiple, select and tag properties from the definition", () => {
        // GIVEN
        let opts: OptionType<number>[] = [{ key: 1, value: "1" }, { key: 2, value: "2" }];
        let selectDef = new DorfSelectDefinition<number>({ multiple: true, optionsToSelect: opts });

        // WHEN
        let selectMeta = new DorfSelectMetadata<number>(selectDef);

        // THEN
        expect(selectMeta.tag).toEqual("select");
        expect(selectMeta.multiple).toBeTruthy();
        expect(selectMeta.optionsToSelect).toEqual(opts);
    });
});