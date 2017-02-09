import { DorfFieldDefinition } from '../fields/base/abstract-dorf-field.component';
import { IDorfCheckboxDefinition, DorfCheckboxDefinition } from '../fields/dorf-checkbox.component';
import { IDorfSelectDefinition, DorfSelectDefinition } from '../fields/dorf-select.component';
import { IDorfRadioDefinition, DorfRadioDefinition } from '../fields/dorf-radio.component';
import { IDorfInputDefinition, DorfInputDefinition } from '../fields/dorf-input.component';

// TODO: use makeParamDecorator and makeDecorator?

/**
 * @whatItDoes Adds some information to the class, interpreted later by DORF mechanisms.
 *
 * @howToUse
 *
 * Class should be decorated with annotation with brackets (similar as in Angular) - `@DorfObject()`.
 * Then properties which should be exposed in the form, should be annotated as well.
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
 * @description
 * Adds `fieldDefinitions`, based on property annotations and `isDorfObject` getter which returns `true`,
 * which makes an output object similar to [DorfDomainObject extension]{@link DorfDomainObject}.
 *
 * @stable
 * @Annotation
 */
export function DorfObject() {
    return function <D extends Function>(targetConstructor: D) {

        Object.defineProperties(targetConstructor.prototype, {
            isDorfObject: {
                get() {
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
    };
}

/**
 * @whatItDoes Assignes {@link DorfInputDefinition} to a field from {@link DorfObject}.
 *
 * @howToUse
 *
 * Field should be decorated with `@DorfInput()` with parameters.
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
// TODO: reflect-metadata and design:type without generic? Do we need this typing?
export function DorfInput<T>(options: IDorfInputDefinition<T>) {
    return createPropertyDecorator<T>(new DorfInputDefinition<T>(options));
}

/**
 * @whatItDoes Assignes {@link DorfSelectDefinition} to a field from {@link DorfObject}.
 *
 * @howToUse
 *
 * Field should be decorated with `@DorfSelect()` with parameters.
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
export function DorfSelect<T>(options: IDorfSelectDefinition<T>) {
    return createPropertyDecorator<T>(new DorfSelectDefinition<T>(options));
}

/**
 * @whatItDoes Assignes {@link DorfCheckboxDefinition} to a field from {@link DorfObject}.
 *
 * @howToUse
 *
 * Field should be decorated with `@DorfCheckbox()` with parameters.
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
export function DorfCheckbox<T>(options: IDorfCheckboxDefinition<T>) {
    return createPropertyDecorator<T>(new DorfCheckboxDefinition<T>(options));
}

/**
 * @whatItDoes Assignes {@link DorfRadioDefinition} to a field from {@link DorfObject}.
 *
 * @howToUse
 *
 * Field should be decorated with `@DorfRadio()` with parameters.
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
export function DorfRadio<T>(options: IDorfRadioDefinition<T>) {
    return createPropertyDecorator<T>(new DorfRadioDefinition<T>(options));
}

/**
 * @whatItDoes Helper for wrapping a property decorator.
 *
 * @howToUse Should be used also for creating the decorators for custom fields.
 *
 * ### Example
 *
 * ```
 * export function CustomDecorator<T>(options: IDorfCustomDefinition<T>) {
 *   return createPropertyDecorator<T>(new DorfCustomDefinition<T>(options));
 * }
 * ```
 *
 * @stable
 */
export function createPropertyDecorator<T>(definition: DorfFieldDefinition<T>) {
    return function (targetProto: any, propName: string) {
        setDefinitionInObject<T>(targetProto, propName, definition);
    };
}

/**
 * Logic behind adding a field definition.
 *
 * @internal
 */
function setDefinitionInObject<T>(targetProto: any, propName: string, definition: DorfFieldDefinition<T>) {
    targetProto.fieldDefinitions = targetProto.fieldDefinitions || {};
    targetProto.fieldDefinitions[propName] = definition;
}