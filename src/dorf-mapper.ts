import { DorfInputMetadata } from "./dorf-input.component";
import { DorfRadioMetadata } from "./dorf-radio.component";
import { DorfSelectMetadata } from "./dorf-select.component";
import { 
    DorfTag,
    IDorfFieldMetadata, 
    DorfFieldDefinition, 
    DorfFieldMetadata 
} from "./abstract-dorf-field.component";

/**
 * The most important thing, which should be defined for each domain object.
 */
export interface PropertiesToDorfDefinitionsMap<T> {
    [propertyName: string]: DorfFieldDefinition<any>
}

/**
 * The heart of the solution.
 * Mapper goes through predefined map and create metadata needed for form fields.
 */
export class DorfMapper {
    mapObjectWithDefinitionsToFieldsMetadata<T>(domainObject: T, fieldDefinitions: PropertiesToDorfDefinitionsMap<T>): DorfFieldMetadata<any>[] {

        let fields: DorfFieldMetadata<any>[] = [];
        let order = 1;

        for (let key in fieldDefinitions) {

            let definition = fieldDefinitions[key];
            let metaOptions = this.getMetadataOptions(key, domainObject); 
            metaOptions.order = order;

            fields.push(new this.tagToMetadataMap[definition.tag](definition, metaOptions));
            ++order;
        }

        return fields;
    }

    protected getMetadataOptions<T>(propertyName: string, obj: T): IDorfFieldMetadata<any> {
        return {
            key: propertyName,
            value: obj[propertyName]
        };
    }

    // consider putting it in the DorfService and things from there to definitions
    protected get tagToMetadataMap(): { [tag: string]: any } {
        return {
            // FIXME: type => enum
            "input": DorfInputMetadata,
            "radio": DorfRadioMetadata,
            "select": DorfSelectMetadata
        }
    }
}
