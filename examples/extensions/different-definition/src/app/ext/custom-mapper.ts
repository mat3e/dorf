import { Validators } from '@angular/forms';
import {
    PropertiesToDorfDefinitionsMap,
    DorfMapper,
    DorfConfigService,
    IDorfFieldDefinition,
    DorfFieldDefinition,
    IDorfInputDefinition,
    DorfInputDefinition,
    IDorfRadioDefinition,
    DorfRadioDefinition,
    IDorfSelectDefinition,
    DorfSelectDefinition,
    IDorfFieldMetadata,
    DorfFieldMetadata,
    DorfNestedMetadata
} from 'dorf';

import { IBackendDefinition } from '../person/backend-definition';

export class CustomMapper extends DorfMapper {
    constructor(config: DorfConfigService) {
        super(config);
    }

    mapObjectWithDefinitionsToFieldsMetadata<T>(
        domainObject: T,
        fieldDefinitions: PropertiesToDorfDefinitionsMap<T>,
        parent: DorfNestedMetadata<any> = undefined
    ): IDorfFieldMetadata<any>[] {
        return super.mapObjectWithDefinitionsToFieldsMetadata(domainObject, this.fixDefinitions(fieldDefinitions), parent);
    }

    // @Override
    protected getMetadataOptions<T>(propertyName: string, obj: T): IDorfFieldMetadata<any> {
        return {
            key: propertyName,
            value: obj[propertyName].value
        };
    }

    /**
     * FieldDefinitions are in fact IBackendDefinitions and should be 'fixed',
     * converted to sth understandable by mapper.
     */
    private fixDefinitions<T>(fieldDefinitions: any) {
        let result: PropertiesToDorfDefinitionsMap<T> = {};

        // tslint:disable-next-line:forin
        for (let key in fieldDefinitions) {
            // converting each backend definition into truthly, well-known field definition
            let currDef = fieldDefinitions[key] as IBackendDefinition<any>;

            // this case should be mapped into DorfInputDefiniton with password type
            if (currDef.modifier === 'Hidden') {
                result[key] = new DorfInputDefinition({
                    label: currDef.label,
                    type: 'password'
                })
            }
            // just 2 options to choose from = radio button
            else if (currDef.possibleValues && currDef.possibleValues.length === 2) {
                let constructorOpts = this.extractStandardOptions(currDef) as IDorfSelectDefinition<any>;
                constructorOpts.optionsToSelect = currDef.possibleValues;
                result[key] = new DorfRadioDefinition(constructorOpts);
            }
            // more than 2 options to choose from = ideal for a select definition
            else if (currDef.possibleValues) {
                let constructorOpts = this.extractStandardOptions(currDef) as IDorfRadioDefinition<any>;
                constructorOpts.optionsToSelect = currDef.possibleValues;
                result[key] = new DorfSelectDefinition(constructorOpts);
            }
            // last chance - 'value' exists; we are creating an input text field for this value
            else if ((currDef as any).hasOwnProperty('value')) {
                let constructorOpts = this.extractStandardOptions(currDef) as IDorfInputDefinition<any>;
                constructorOpts.type = 'text';
                result[key] = new DorfInputDefinition(constructorOpts);
            }
        }

        return result;
    }

    private extractStandardOptions<T>(backendDef: IBackendDefinition<T>): IDorfFieldDefinition<T> {
        return {
            label: backendDef.label,
            validator: backendDef.modifier === 'NotNull' ? Validators.required : Validators.nullValidator
        }
    }
}

