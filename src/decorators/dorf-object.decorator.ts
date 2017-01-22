import { DorfFieldDefinition } from "../fields/abstract-dorf-field.component";
import { IDorfCheckboxDefinition, DorfCheckboxDefinition } from "../fields/dorf-checkbox.component";
import { IDorfSelectDefinition, DorfSelectDefinition } from "../fields/dorf-select.component";
import { IDorfRadioDefinition, DorfRadioDefinition } from "../fields/dorf-radio.component";
import { IDorfInputDefinition, DorfInputDefinition } from "../fields/dorf-input.component";

// TODO: use makeParamDecorator and makeDecorator

/**
 * @whatItDoes Adds some information to the class, interpreted later by Dorf mechanisms.
 * Added things are 'fieldDefinitions' and 'isDorfObject' getter.
 * 
 * @howToUse
 *
 * Class should be decorated with annotation with brackets (similar as in Angular). @DorfObject().
 *
 * ### Example
 *
 * ```
 * @DorfObject()
 * class TestDomainObject {
 *   @DorfInput<string>({
 *     type: "text",
 *     label: "Name",
 *     updateModelOnChange: true
 *   })
 *   private _name: string;
 *   
 *   @DorfSelect<number>({
 *     optionsToSelect: [{
 *       key: 1,
 *       value: "red"
 *     }, {
 *       key: 2,
 *       value: "green"
 *     }, {
 *       key: 3,
 *       value: "blue"
 *     }],
 *     label: "Favourite color",
 *     updateModelOnChange: true
 *   })
 *   private _favColor: number;
 * 
 *   @DorfRadio<string>({
 *     optionsToSelect: [{
 *       key: "m",
 *       value: "male"
 *     }, {
 *       key: "f",
 *       value: "female"
 *     }],
 *     label: "Gender",
 *     updateModelOnChange: true
 *   })
 *   private _gender: string;
 * 
 *   @DorfCheckbox<string>({
 *     label: "Is smart?",
 *     mapping: {
 *       trueValue: "yes",
 *       falseValue: "no"
 *     },
 *     updateModelOnChange: true
 *   })
 *   private _smart: string;
 * }
 * ```
 * 
 * @stable
 * @Annotation
 */
export function DorfObject() {
    return function <D extends Function>(targetConstructor: D) {

        Object.defineProperties(targetConstructor.prototype, {
            isDorfObject: {
                get: function () {
                    return true;
                },
                enumerable: true,
                configurable: true
            }, fieldDefinitions: {
                value: targetConstructor.prototype.fieldDefinitions || {},
                enumerable: true,
                configurable: true
            }
        });
    }
}

/**
 * @whatItDoes Assignes {@link DorfInputDefinition} to a field from {@link DorfObject}.
 * 
 * @howToUse
 *
 * Field should be decorated with @DorfInput with parameters.
 *
 * ### Example
 *
 * ```
 * @DorfObject()
 * class TestDomainObject {
 *   @DorfInput<string>({
 *     type: "text",
 *     label: "Name",
 *     updateModelOnChange: true
 *   })
 *   private _name: string;
 * }
 * ```
 * 
 * @stable
 * @Annotation
 */
export function DorfInput<T>(definition: IDorfInputDefinition<T>) { // TODO: reflect-metadata and design:type without generic?
    return createPropertyDecorator<T>(new DorfInputDefinition(definition));
}


/**
 * @whatItDoes Assignes {@link DorfSelectDefinition} to a field from {@link DorfObject}.
 * 
 * @howToUse
 *
 * Field should be decorated with @DorfSelect with parameters.
 *
 * ### Example
 *
 * ```
 * @DorfObject()
 * class TestDomainObject {
 *   @DorfSelect<number>({
 *     optionsToSelect: [{
 *       key: 1,
 *       value: "red"
 *     }, {
 *       key: 2,
 *       value: "green"
 *     }, {
 *       key: 3,
 *       value: "blue"
 *     }],
 *     label: "Favourite color",
 *     updateModelOnChange: true
 *   })
 *   private _favColor: number;
 * }
 * ```
 * 
 * @stable
 * @Annotation
 */
export function DorfSelect<T>(definition: IDorfSelectDefinition<T>) {
    return createPropertyDecorator<T>(new DorfSelectDefinition(definition));
}

/**
 * @whatItDoes Assignes {@link DorfCheckboxDefinition} to a field from {@link DorfObject}.
 * 
 * @howToUse
 *
 * Field should be decorated with @DorfCheckbox with parameters.
 *
 * ### Example
 *
 * ```
 * @DorfObject()
 * class TestDomainObject {
 *   @DorfCheckbox<string>({
 *     label: "Is smart?",
 *     mapping: {
 *       trueValue: "yes",
 *       falseValue: "no"
 *     },
 *     updateModelOnChange: true
 *   })
 *   private _smart: string;
 * }
 * ```
 * 
 * @stable
 * @Annotation
 */
export function DorfCheckbox<T>(definition: IDorfCheckboxDefinition<T>) {
    return createPropertyDecorator<T>(new DorfCheckboxDefinition(definition));
}

/**
 * @whatItDoes Assignes {@link DorfRadioDefinition} to a field from {@link DorfObject}.
 * 
 * @howToUse
 *
 * Field should be decorated with @DorfRadio with parameters.
 *
 * ### Example
 *
 * ```
 * @DorfObject()
 * class TestDomainObject {
 *   @DorfRadio<string>({
 *     optionsToSelect: [{
 *       key: "m",
 *       value: "male"
 *     }, {
 *       key: "f",
 *       value: "female"
 *     }],
 *     label: "Gender",
 *     updateModelOnChange: true
 *   })
 *   private _gender: string;
 * }
 * ```
 * 
 * @stable
 * @Annotation
 */
export function DorfRadio<T>(definition: IDorfRadioDefinition<T>) {
    return createPropertyDecorator<T>(new DorfRadioDefinition(definition));
}

/**
 * Helper for wrapping a property decorator.
 * Should be used also with custom fields.
 */
export function createPropertyDecorator<T>(definition: DorfFieldDefinition<T>) {
    return function (targetProto: any, propName: string) {
        setDefinitionInObject(targetProto, propName, definition);
    }
}

/**
 * Logic behind adding a field definition.
 */
function setDefinitionInObject<T>(targetProto: any, propName: string, definition: DorfFieldDefinition<T>) {
    targetProto.fieldDefinitions = targetProto.fieldDefinitions || {};
    targetProto.fieldDefinitions[propName] = definition;
}