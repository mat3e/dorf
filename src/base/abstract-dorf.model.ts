import { PropertiesToDorfDefinitionsMap } from './dorf-mapper';
import { IDorfDefinitionBase } from '../fields/base/abstract-dorf-field.definition';
import { IDorfChooseDefinition, DorfChooseDefinition } from '../fields/base/abstract-dorf-choose.definition';

/**
 * Base class which may define Domain Object. Enfoces the existence of field definitions.
 * To act with DORF it is needed to either extend this class to or use [@DorfObject()]{@link DorfObject} and the related annotations.
 *
 * @example
 * ```
 *
 *  //
 *  class Person extends DorfDomainObject {
 *
 *    constructor(private name: string, private surname: string) {
 *      super();
 *    }
 *
 *    // @Override
 *    get fieldDefinitions(): PropertiesToDorfDefinitionsMap<Person> {
 *      return {
 *        "name": this.nameDef,
 *        "surname": this.surnameDef
 *      };
 *    }
 *
 *    private get nameDef(): DorfInputDefinition<string> {
 *      return new DorfInputDefinition({
 *        label: "Name",
 *        type: "text"
 *      });
 *    }
 *
 *    private get surnameDef(): DorfInputDefinition<string> {
 *      return new DorfInputDefinition({
 *        label: "Surname",
 *        type: "text"
 *      });
 *    }
 *  }
 * ```
 *
 * @stable
 */
export abstract class DorfDomainObject {
    /**
     * Object property requires its [definition]{@link IDorfDefinitionBase} here, to be presented in DORF form.
     * Stores [key-value pairs]{@link PropertiesToDorfDefinitionsMap}, where key is the property name on Object.
     *
     * @example
     * ```
     *
     *  //
     *  get fieldDefinitions(): PropertiesToDorfDefinitionsMap<Person> {
     *     return {
     *        "name": new DorfInputDefinition({
     *           label: "Name",
     *           type: "text"
     *        }),
     *        "surname": new DorfInputDefinition({
     *           label: "Surname",
     *           type: "text"
     *        }),
     *     };
     *  }
     * ```
     */
    abstract fieldDefinitions: PropertiesToDorfDefinitionsMap<DorfDomainObject>;

    /**
     * Indicates a `DorfObject` instance. Needed by decorators.
     */
    get isDorfObject() {
        return true;
    }

    /**
     * Allows changing the definition later, e.g. inside the form component.
     * Support is very limited here. For now it is allowed only for {@link DorfChooseDefinition} - for its async options.
     *
     * @param fieldName {string} property name on Object, key in {@link PropertiesToDorfDefinitionsMap}
     * @param def {IDorfDefinitionBase<any>} new definition, which is the source of changes
     */
    updateDefinition(fieldName: string, def: IDorfDefinitionBase<any>) {
        let oldDef = this.fieldDefinitions[fieldName];
        if (oldDef instanceof DorfChooseDefinition) {
            oldDef.asyncOptionsToSelect = (def as IDorfChooseDefinition<any>).asyncOptionsToSelect;
        }
    }
}
