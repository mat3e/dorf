import { PropertiesToDorfDefinitionsMap } from "../dorf-mapper";

/**
 * Domain Object should contain data about field definitions.
 * DorfPropertiesToDefinitionsMap is used in DorfMapper called from AbstractDorfFormComponent to create metadata for all the form fields.
 *
 * In reality Domain Objcect doesn't have to extend this class, but it might be helpful.
 * When no additional backend calls needed for creating FieldDefinitions it is better to define them here.
 */
export abstract class DorfDomainObject {
    abstract fieldDefinitions: PropertiesToDorfDefinitionsMap<DorfDomainObject>;

    get isDorfObject() {
        return true;
    }
}
