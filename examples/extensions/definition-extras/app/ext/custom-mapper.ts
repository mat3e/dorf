import {
    PropertiesToDorfDefinitionsMap,
    DorfMapper,
    DorfConfigService,
    DorfFieldDefinition,
    IDorfFieldMetadata,
    DorfFieldMetadata
} from "dorf";

export class CustomMapper extends DorfMapper {
    constructor(config: DorfConfigService) {
        super(config);
    }

    // @Override
    mapObjectWithDefinitionsToFieldsMetadata<T>(domainObject: T, fieldDefinitions: PropertiesToDorfDefinitionsMap<T>): DorfFieldMetadata<any, DorfFieldDefinition<any>>[] {
        return super.mapObjectWithDefinitionsToFieldsMetadata(domainObject, fieldDefinitions).sort((a, b) => a["order"] - b["order"]);
    }
}
