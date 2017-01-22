import { DorfConfigService } from "./dorf-config.service";

import {
    DorfTag,
    IDorfFieldDefinition,
    DorfFieldDefinition,
    IDorfFieldMetadata,
    DorfFieldMetadata
} from "./fields/abstract-dorf-field.component";

import { DorfInputDefinition, DorfInputMetadata } from "./fields/dorf-input.component";
import { DorfRadioDefinition, DorfRadioMetadata } from "./fields/dorf-radio.component";
import { DorfSelectDefinition, DorfSelectMetadata } from "./fields/dorf-select.component";
import { DorfCheckboxDefinition, DorfCheckboxMetadata } from "./fields/dorf-checkbox.component";

/**
 * The most important thing, which should be defined for each domain object.
 */
export interface PropertiesToDorfDefinitionsMap<T> {
    [propertyName: string]: IDorfFieldDefinition<any>
}

/**
 * The heart of the solution.
 * Mapper goes through predefined map and create metadata needed for form fields.
 */
export class DorfMapper {
    /*
    it depends on field components and components depend on the service, that's why we have this here;
    without `any` there are problems with calling a constructor
    */
    private _fields: DorfTag<typeof DorfFieldDefinition, any>[] = [{
        tag: DorfTag.CHECKBOX,
        definition: DorfCheckboxDefinition,
        metadata: DorfCheckboxMetadata
    }, {
        tag: DorfTag.INPUT,
        definition: DorfInputDefinition,
        metadata: DorfInputMetadata
    }, {
        tag: DorfTag.RADIO,
        definition: DorfRadioDefinition,
        metadata: DorfRadioMetadata
    }, {
        tag: DorfTag.SELECT,
        definition: DorfSelectDefinition,
        metadata: DorfSelectMetadata
    }];

    constructor(private _config: DorfConfigService) {
        this._fields = this._fields.concat(this._config.additionalMetadataKinds);
    }

    mapObjectWithDefinitionsToFieldsMetadata<T>(domainObject: T, fieldDefinitions: PropertiesToDorfDefinitionsMap<T>): DorfFieldMetadata<any, DorfFieldDefinition<any>>[] {

        let fields: DorfFieldMetadata<any, DorfFieldDefinition<any>>[] = [];

        for (let key in fieldDefinitions) {

            let definition = fieldDefinitions[key];
            let metaOptions = this.getMetadataOptions(key, domainObject);

            let metadata = new (this.getMetadataForTag(definition.tag))(definition, metaOptions);

            fields.push(metadata);
        }

        return fields;
    }

    protected getMetadataOptions<T>(propertyName: string, obj: T): IDorfFieldMetadata<any> {
        return {
            key: propertyName,
            value: obj[propertyName],
            setDomainObjValue: (val: T) => { obj[propertyName] = val; }
        };
    }

    protected getMetadataForTag(tag: string) {
        for (let i = 0; i < this._fields.length; ++i) {
            let currField = this._fields[i];
            if (currField.tag === tag) {
                return currField.metadata;
            }
        }

        throw new Error(`Unknown DORF tag: ${tag}`);
    }
}
