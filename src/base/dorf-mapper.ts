import { DorfConfigService } from '../dorf-config.service';

import { IDorfDefinitionBase } from '../fields/base/abstract-dorf-field.definition';
import { IDorfFieldMetadata, DorfFieldMetadata } from '../fields/base/abstract-dorf-field.metadata';
import { DorfNestedMetadata } from '../fields/base/dorf-nested.metadata';
import { DorfInputDefinition } from '../fields/dorf-input.definition';
import { DorfInputMetadata } from '../fields/dorf-input.metadata';
import { DorfRadioDefinition } from '../fields/dorf-radio.definition';
import { DorfRadioMetadata } from '../fields/dorf-radio.metadata';
import { DorfSelectDefinition } from '../fields/dorf-select.definition';
import { DorfSelectMetadata } from '../fields/dorf-select.metadata';
import { DorfCheckboxDefinition } from '../fields/dorf-checkbox.definition';
import { DorfCheckboxMetadata } from '../fields/dorf-checkbox.metadata';
import { DorfField } from '../fields/base/dorf-field';

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
    [propertyName: string]: IDorfDefinitionBase<any>;
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

    constructor(private _config: DorfConfigService) { }

    /**
     * Main method for transpiling.
     */
    mapObjectWithDefinitionsToFieldsMetadata<DomObj>(
        domainObject: DomObj,
        fieldDefinitions: PropertiesToDorfDefinitionsMap<DomObj>,
        parent: DorfNestedMetadata<any> = undefined
    ): IDorfFieldMetadata<any>[] {

        let fields: DorfFieldMetadata<any, IDorfDefinitionBase<any>>[] = [];
        let order = 0;

        // tslint:disable-next-line:forin
        for (let key in fieldDefinitions) {

            let definition = fieldDefinitions[key];
            let metaOptions = this.getMetadataOptions(key, domainObject, parent);

            let metadata = new (this.getMetadataForTag(definition.tag))(definition, metaOptions);
            if (metadata.order === undefined || metadata.order === null) {
                metadata.order = order;
            }
            ++order;

            if (metadata instanceof DorfNestedMetadata) {
                metadata.nestedFieldsMetadata
                    = this.mapObjectWithDefinitionsToFieldsMetadata(metadata.value, metadata.definitionsForNestedObject, metadata);
            }

            fields.push(metadata);
        }

        return fields.sort((a, b) => a.order - b.order);
    }

    /**
     * Creates {@link IDorfFieldMetadata} for the particular property, identified by `propertyName`.
     * Property comes from domain object, passed as `obj`.
     */
    protected getMetadataOptions<DomObj>(propertyName: string, obj: DomObj, parent: DorfNestedMetadata<any>): IDorfFieldMetadata<any> {
        return {
            key: propertyName,
            value: obj[propertyName],
            setDomainObjValue: (val: DomObj[keyof DomObj]) => { obj[propertyName] = val; },
            parentCss: parent && parent.css
        };
    }

    /**
     * Returns metadata constructor for a given tag.
     * Takes into account both DORF predefined fields and custom fields, defined by a DORF consumer.
     */
    protected getMetadataForTag(tag: string) {
        let field = this._config.getFieldForTag(tag);
        if (field) {
            return field.metadata as any;
        }

        throw new Error(`Unknown DORF tag: ${tag}`);
    }
}
