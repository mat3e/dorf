import { Validators } from '@angular/forms';

import { DorfConfigService } from '../../src/dorf-config.service';

import { DorfDomainObject } from '../../src/base/abstract-dorf.model';
import { OptionType } from '../../src/fields/base/abstract-dorf-choose.definition';
import { DorfInputDefinition } from '../../src/fields/dorf-input.definition';
import { DorfInputMetadata } from '../../src/fields/dorf-input.metadata';
import { DorfSelectDefinition } from '../../src/fields/dorf-select.definition';
import { DorfSelectMetadata } from '../../src/fields/dorf-select.metadata';
import { DorfFieldDefinition } from '../../src/fields/base/abstract-dorf-field.definition';

import { PropertiesToDorfDefinitionsMap, DorfMapper } from '../../src/base/dorf-mapper';

describe('DorfMapper', () => {

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
                id: this.idDef,
                _job: this.jobDef
            }
        }

        private get idDef() {
            return new DorfInputDefinition<number>({
                type: 'number',
                label: 'Unique ID',
                validator: Validators.pattern('[0-9]{3}'),
                order: 2
            })
        }

        private get jobDef() {
            let opts: OptionType<number>[] = [{
                key: 1,
                value: 'doctor'
            }, {
                key: 2,
                value: 'postman'
            }];

            return new DorfSelectDefinition({
                label: 'Job',
                optionsToSelect: opts,
                order: 1
            });
        }
    }

    it('maps from domain object and its definitions to fields metadata', () => {
        // GIVEN
        let mapper = new DorfMapper(new DorfConfigService());
        let testObj = new TestDomainObject();

        // WHEN
        let result = mapper.mapObjectWithDefinitionsToFieldsMetadata(testObj, testObj.fieldDefinitions);

        // THEN
        expect(result.length).toEqual(2);

        // according to the ordering:
        let idMeta = result[1];
        let jobMeta = result[0];

        expect(idMeta instanceof DorfInputMetadata).toBeTruthy();
        expect((idMeta as DorfInputMetadata<number>).type).toEqual('number');
        expect(idMeta.formControl.value).toEqual(999);
        expect(idMeta.label).toEqual('Unique ID');

        expect(jobMeta instanceof DorfSelectMetadata).toBeTruthy();
        expect((jobMeta as DorfSelectMetadata<number>).optionsToSelect.length).toEqual(2);
        expect(jobMeta.formControl.value).toEqual(2);
        expect(jobMeta.label).toEqual('Job');
    });

    it('throws error when unknown definition provided', () => {
        // GIVEN
        let mapper = new DorfMapper(new DorfConfigService());
        let unknownDef = {
            tag: 'unknown'
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
