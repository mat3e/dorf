import { DorfConfigService } from '../dorf-config.service';

import { IDorfDefinitionBase, DorfDefinitionBase } from '../fields/base/abstract-dorf-field.definition';
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
 * Property-field definition map, which should be defined for every Domain Object.
 * This is used by [mapper]{@link DorfMapper} for creating a metadata, which is used by field components.
 * This interface should be returned by `fieldDefinitions` property from the Domain Object.
 * DORF annotations ({@link DorfObject} and the related ones) automates the creation of this map.
 *
 * @stable
 */
export interface PropertiesToDorfDefinitionsMap<DorfObj> {
    [propertyName: string]: IDorfDefinitionBase<any>;
}

/**
 * Transpiles {@link PropertiesToDorfDefinitionsMap} into fields metadata. The heart of the solution.
 *
 * @stable
 */
export class DorfMapper {

    constructor(private _config: DorfConfigService) { }

    /**
     * Main method for transpiling.
     *
     * @param domainObject {Object} object for which mapper is executed
     * @param fieldDefinitions {PropertiesToDorfDefinitionsMap<DomObj>} definitions from the object
     * @param parent {DorfNestedMetadata<any>} optional parameter, needed when mapping nested objects
     */
    mapObjectWithDefinitionsToFieldsMetadata<DomObj>(
        domainObject: DomObj,
        fieldDefinitions: PropertiesToDorfDefinitionsMap<DomObj>,
        parent?: DorfNestedMetadata<any>
    ): IDorfFieldMetadata<any>[] {

        let fields: DorfFieldMetadata<any, IDorfDefinitionBase<any>>[] = [];
        let order = 0;

        // tslint:disable-next-line:forin
        for (let key in fieldDefinitions) {

            let definition = fieldDefinitions[key] as DorfDefinitionBase<any>;
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

        return fields.sort((a: any, b: any) => a.order - b.order);
    }

    /**
     * Creates {@link IDorfFieldMetadata} for the particular property, identified by `propertyName`.
     * Property comes from Domain Object, passed as `obj`.
     */
    protected getMetadataOptions<DomObj>(propertyName: string, obj: DomObj, parent?: DorfNestedMetadata<any>): IDorfFieldMetadata<any> {
        return {
            key: propertyName,
            value: obj[propertyName],
            setDomainObjValue: (val: DomObj[keyof DomObj]) => { obj[propertyName] = val; },
            parentCss: parent && parent.css
        };
    }

    /**
     * Returns metadata constructor for a given tag.
     * Takes into account both DORF predefined fields and custom fields, defined by a DORF user.
     */
    protected getMetadataForTag(tag: string) {
        let field = this._config.getFieldForTag(tag);
        if (field) {
            return field.metadata as any;
        }

        throw new Error(`Unknown DORF tag: ${tag}`);
    }
}
