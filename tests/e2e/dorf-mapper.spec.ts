import { Validators } from "@angular/forms";

import { DorfConfigService } from "../../src/dorf-config.service";

import { DorfDomainObject } from "../../src/abstract-dorf.model";
import { OptionType } from "../../src/fields/abstract-dorf-choose.component";
import { DorfInputDefinition, DorfInputMetadata } from "../../src/fields/dorf-input.component";
import { DorfSelectDefinition, DorfSelectMetadata } from "../../src/fields/dorf-select.component";
import { DorfFieldDefinition } from "../../src/fields/abstract-dorf-field.component";

import { PropertiesToDorfDefinitionsMap, DorfMapper } from "../../src/dorf-mapper";

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
        get fieldDefinitions(): PropertiesToDorfDefinitionsMap<DorfDomainObject> {
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
        let mapper = new DorfMapper(new DorfConfigService());
        let testObj = new TestDomainObject();

        // WHEN
        let result = mapper.mapObjectWithDefinitionsToFieldsMetadata(testObj, testObj.fieldDefinitions);

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

    it("throws error when unknown definition provided", () => {
        // GIVEN
        let mapper = new DorfMapper(new DorfConfigService());
        let unknownDef = {
            tag: "unknown"
        } as DorfFieldDefinition<any>;
        let map = {
            test: unknownDef
        }

        // WHEN + THEN
        expect(() => {
            mapper.mapObjectWithDefinitionsToFieldsMetadata({}, map);
        }).toThrowError(`Unknown DORF tag: ${unknownDef.tag}`);
    });
});