import { PropertiesToDorfDefinitionsMap } from './dorf-mapper';
import { IDorfDefinitionBase } from '../fields/base/abstract-dorf-field.definition';
import { IDorfChooseDefinition, DorfChooseDefinition } from '../fields/base/abstract-dorf-choose.definition';

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
// TODO: function for modifying definition after the object is created, like updateDefinition(propName, newDef);
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

    /**
     * Allows changing the definition e.g. inside the form component.
     * Support is very limited here. For now it is allowed only for {@link DorfChooseDefinition} - for its async options.
     */
    updateDefinition(fieldName: string, def: IDorfDefinitionBase<any>) {
        let oldDef = this.fieldDefinitions[fieldName];
        if (oldDef instanceof DorfChooseDefinition) {
            oldDef.asyncOptionsToSelect = (def as IDorfChooseDefinition<any>).asyncOptionsToSelect;
        }
    }
}
