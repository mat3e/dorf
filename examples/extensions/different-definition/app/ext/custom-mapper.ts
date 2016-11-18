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
    DorfFieldMetadata
} from "dorf";

import { IBackendDefinition } from "../person/backend-definition";

export class CustomMapper extends DorfMapper {
    constructor(config: DorfConfigService) {
        super(config);
    }

    mapObjectWithDefinitionsToFieldsMetadata<T>(domainObject: T, fieldDefinitions: PropertiesToDorfDefinitionsMap<T>): DorfFieldMetadata<any, DorfFieldDefinition<any>>[] {
        return super.mapObjectWithDefinitionsToFieldsMetadata(domainObject, this.fixDefinitions(fieldDefinitions));
    }

    // @Override
    protected getMetadataOptions<T>(propertyName: string, obj: T): IDorfFieldMetadata<any> {
        return {
            key: propertyName,
            value: obj[propertyName].value
        };
    }

    /**
     * FieldDefinitions are in fact IBackendDefinitions and should be "fixed",
     * converted to sth understandable by mapper.
     */
    private fixDefinitions<T>(fieldDefinitions: PropertiesToDorfDefinitionsMap<T>) {
        let result: PropertiesToDorfDefinitionsMap<T> = {};

        for (let key in fieldDefinitions) {
            // converting each backend definition into truthly, well-known field definition
            let currDef = fieldDefinitions[key] as IBackendDefinition<any>;

            if (currDef.modifier === "Hidden") {
                // this case should be mapped into DorfInputDefiniton with password type
                result[key] = new DorfInputDefinition({
                    label: currDef.label,
                    type: "password"
                })
            } else if (currDef.possibleValues && currDef.possibleValues.length === 2) {
                // just 2 options to choose from - radio button; no chance for options and "Hidden" modifier
                let constructorOpts = this.extractStandardOptions(currDef) as IDorfSelectDefinition<any>;
                constructorOpts.optionsToSelect = currDef.possibleValues;
                result[key] = new DorfRadioDefinition(constructorOpts);
            } else if (currDef.possibleValues) {
                // not 2 options to choose from - ideal select definition
                let constructorOpts = this.extractStandardOptions(currDef) as IDorfRadioDefinition<any>;
                constructorOpts.optionsToSelect = currDef.possibleValues;
                result[key] = new DorfSelectDefinition(constructorOpts);
            } else {
                // default - text here
                let constructorOpts = this.extractStandardOptions(currDef) as IDorfInputDefinition<any>;
                constructorOpts.type = "text";
                result[key] = new DorfInputDefinition(constructorOpts);
            }
        }

        return result;
    }

    private extractStandardOptions<T>(backendDef: IBackendDefinition<T>): IDorfFieldDefinition<T> {
        return {
            label: backendDef.label,
            validator: backendDef.modifier === "NotNull" ? Validators.required : Validators.nullValidator
        }
    }
}
