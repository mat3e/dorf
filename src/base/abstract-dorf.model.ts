import { PropertiesToDorfDefinitionsMap } from './dorf-mapper';

/**
 * @whatItDoes Defines a Domain Object. Enfoces the existence of field definitions.
 *
 * @howToUse
 * This should be a base class for a domain object.
 *
 * ### Example
 *
 * ```
 * class Person extends DorfDomainObject {
 *
 *   constructor(private name: string, private surname: string) {
 *     super();
 *   }
 *
 *   // @Override
 *   get fieldDefinitions(): PropertiesToDorfDefinitionsMap<Person> {
 *     return {
 *       "name": this.nameDef,
 *       "surname": this.surnameDef
 *     };
 *   }
 *
 *   private get nameDef(): DorfInputDefinition<string> {
 *     return new DorfInputDefinition({
 *       label: "Name",
 *       type: "text"
 *     });
 *   }
 *
 *   private get surnameDef(): DorfInputDefinition<string> {
 *     return new DorfInputDefinition({
 *       label: "Surname",
 *       type: "text"
 *     });
 *   }
 * }
 * ```
 *
 * @description
 * Either extending this class or using {@link DorfObject} and the related annotations
 * is a proper way of acting with Domain Objects in DORF.
 *
 * @stable
 */
export abstract class DorfDomainObject {
    /**
     * Used in {@link DorfMapper} called from {@link AbstractDorfFormComponent} to create metadata for all the form fields.
     */
    abstract fieldDefinitions: PropertiesToDorfDefinitionsMap<DorfDomainObject>;

    /**
     * Indicates a `DorfObject` instance. Needed within form decorators.
     */
    get isDorfObject() {
        return true;
    }
}
