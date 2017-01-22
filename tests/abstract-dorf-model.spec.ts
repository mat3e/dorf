import { PropertiesToDorfDefinitionsMap } from "../src/dorf-mapper";

import { DorfDomainObject } from "../src/abstract-dorf.model";

describe("DorfDomainObject", () => {
    class Test extends DorfDomainObject {
        fieldDefinitions: PropertiesToDorfDefinitionsMap<Test> = {};
    }

    it("is a DORF object", () => {
        // GIVEN + WHEN
        let obj = new Test();

        // THEN
        expect(obj.isDorfObject).toBeTruthy();
    });
});