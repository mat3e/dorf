import {
    PropertiesToDorfDefinitionsMap,
    DorfMapper,
    DorfConfigService,
    DorfFieldDefinition,
    IDorfFieldMetadata,
    DorfFieldMetadata
} from 'dorf';

export class CustomMapper extends DorfMapper {
    constructor(config: DorfConfigService) {
        super(config);
    }

    // @Override
    // tslint:disable-next-line:max-line-length
    mapObjectWithDefinitionsToFieldsMetadata<T>(domainObject: T, fieldDefinitions: PropertiesToDorfDefinitionsMap<T>): DorfFieldMetadata<any, DorfFieldDefinition<any>>[] {
        return super.mapObjectWithDefinitionsToFieldsMetadata(domainObject, fieldDefinitions).sort((a, b) => a['order'] - b['order']);
    }
}
