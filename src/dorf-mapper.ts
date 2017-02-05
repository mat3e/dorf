import { DorfConfigService } from './dorf-config.service';

import {
    DorfTag,
    IDorfFieldDefinition,
    DorfFieldDefinition,
    IDorfFieldMetadata,
    DorfFieldMetadata
} from './fields/base/abstract-dorf-field.component';

import { DorfInputDefinition, DorfInputMetadata } from './fields/dorf-input.component';
import { DorfRadioDefinition, DorfRadioMetadata } from './fields/dorf-radio.component';
import { DorfSelectDefinition, DorfSelectMetadata } from './fields/dorf-select.component';
import { DorfCheckboxDefinition, DorfCheckboxMetadata } from './fields/dorf-checkbox.component';

/**
 * @whatItDoes Object's property-field definition map, which should be defined for each domain object.
 *
 * @description
 * The most important thing, used by [mapper]{@link DorfMapper} for creating a metadata, which is used by field components.
 * This interface should be returned by `fieldDefinitions` property from the domain object.
 * Using DORF annotations ({@link DorfObject} and the related ones) automates the creation of this map.
 *
 * @stable
 */
export interface PropertiesToDorfDefinitionsMap<DorfObj> {
    [propertyName: string]: DorfFieldDefinition<any>;
}

/**
 * @whatItDoes Transpiles {@link PropertiesToDorfDefinitionsMap} into fields metadata.
 *
 * @description
 * The heart of the solution.
 * Mapper goes through predefined map and create metadata needed by field components.
 *
 * @stable
 */
export class DorfMapper {
    /*
    it depends on field components and components depend on the service, so we have this here;
    without `any` as a type, there are problems with calling a constructor
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

    /**
     * Main method for transpiling.
     */
    mapObjectWithDefinitionsToFieldsMetadata<DomObj>(domainObject: DomObj, fieldDefinitions: PropertiesToDorfDefinitionsMap<DomObj>):
        DorfFieldMetadata<any, DorfFieldDefinition<any>>[] {

        let fields: DorfFieldMetadata<any, DorfFieldDefinition<any>>[] = [];

        // tslint:disable-next-line:forin
        for (let key in fieldDefinitions) {

            let definition = fieldDefinitions[key];
            let metaOptions = this.getMetadataOptions(key, domainObject);

            let metadata = new (this.getMetadataForTag(definition.tag))(definition, metaOptions);

            fields.push(metadata);
        }

        return fields;
    }

    /**
     * Creates {@link IDorfFieldMetadata} for the particular property, identified by `propertyName`.
     * Property comes from domain object, passed as `obj`.
     */
    protected getMetadataOptions<DomObj>(propertyName: string, obj: DomObj): IDorfFieldMetadata<any> {
        return {
            key: propertyName,
            value: obj[propertyName],
            setDomainObjValue: (val: DomObj[keyof DomObj ]) => { obj[propertyName] = val; }
        };
    }

    /**
     * Returns metadata constructor for a given tag.
     * Takes into account both DORF predefined fields and custom fields, defined by a DORF consumer.
     */
    protected getMetadataForTag(tag: string) {
        for (let currField of this._fields) {
            if (currField.tag === tag) {
                return currField.metadata;
            }
        }

        throw new Error(`Unknown DORF tag: ${tag}`);
    }
}
