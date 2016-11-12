import { Validators } from "@angular/forms";

import { DorfDomainObject } from "../src/abstract-dorf.model";
import { DorfInputDefinition, DorfInputMetadata } from "../src/dorf-input.component";
import { OptionType, DorfSelectDefinition, DorfSelectMetadata } from "../src/dorf-select.component";

import { PropertiesToDorfDefinitionsMap, DorfMapper } from "../src/dorf-mapper";

describe("DorfMapper", () => {

    /**
     * Simple class to be changed into fields metadata.
     */
    class TestDomainObject extends DorfDomainObject {
        private id = 999;
        private _job = 2;

        /**
         * Keys from the result have to reflect property names 1:1.
         */
        getFieldDefinitions(): PropertiesToDorfDefinitionsMap<DorfDomainObject> {
            return {
                "id": this.idDef,
                "_job": this.jobDef
            }
        }

        private get idDef() {
            return new DorfInputDefinition<number>({
                type: "number",
                label: "Unique ID",
                validator: Validators.pattern("[0-9]{3}")
            })
        }

        private get jobDef() {
            let opts: OptionType<number>[] = [{
                key: 1,
                value: "doctor"
            }, {
                key: 2,
                value: "postman"
            }];

            return new DorfSelectDefinition({
                label: "Job",
                optionsToSelect: opts
            });
        }
    }

    it("maps from domain object and its definitions to fields metadata", () => {
        // GIVEN
        let mapper = new DorfMapper();
        let testObj = new TestDomainObject();

        // WHEN
        let result = mapper.mapObjectWithDefinitionsToFieldsMetadata(testObj, testObj.getFieldDefinitions());

        // THEN
        expect(result.length).toEqual(2);

        let idMeta = result[0];
        let jobMeta = result[1];

        expect(idMeta instanceof DorfInputMetadata).toBeTruthy();
        expect((idMeta as DorfInputMetadata<number>).type).toEqual("number");
        expect(idMeta.formControl.value).toEqual(999);
        expect(idMeta.label).toEqual("Unique ID");

        expect(jobMeta instanceof DorfSelectMetadata).toBeTruthy();
        expect((jobMeta as DorfSelectMetadata<number>).optionsToSelect.length).toEqual(2);
        expect(jobMeta.formControl.value).toEqual(2);
        expect(jobMeta.label).toEqual("Job");
    });
});