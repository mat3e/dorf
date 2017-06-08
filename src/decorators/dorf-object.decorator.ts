import { DorfField } from '../fields/base/dorf-field';
import { DorfCssClasses } from '../base/dorf-css-classes';
import { DorfDefinitionBase } from '../fields/base/abstract-dorf-field.definition';
import { IDorfDefinitionBase } from '../fields/base/abstract-dorf-field.definition';
import { IDorfChooseDefinition, DorfChooseDefinition } from '../fields/base/abstract-dorf-choose.definition';
import { IDorfNestedDefinition, DorfNestedDefinition } from '../fields/base/dorf-nested.definition';
import { IDorfCheckboxDefinition, DorfCheckboxDefinition } from '../fields/dorf-checkbox.definition';
import { IDorfSelectDefinition, DorfSelectDefinition } from '../fields/dorf-select.definition';
import { IDorfRadioDefinition, DorfRadioDefinition } from '../fields/dorf-radio.definition';
import { IDorfInputDefinition, DorfInputDefinition } from '../fields/dorf-input.definition';

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
 *   @DorfInput({
 *     type: "text",
 *     label: "Name",
 *     updateModelOnChange: true
 *   })
 *   private _name: string;
 *
 *   @DorfSelect({
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
 *   @DorfRadio({
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
 *   @DorfCheckbox({
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
// TODO: verify https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#object-spread-and-rest
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
            }, updateDefinition: {
                value: (fieldName: string, def: IDorfDefinitionBase<any>) => {
                    let oldDef = this.fieldDefinitions[fieldName];
                    if (oldDef instanceof DorfChooseDefinition) {
                        oldDef.asyncOptionsToSelect = (def as IDorfChooseDefinition<any>).asyncOptionsToSelect;
                    }
                }
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
 *   @DorfInput({
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
export function DorfInput(options: IDorfInputDefinition<any>) {
    return createPropertyDecorator(new DorfInputDefinition<any>(options));
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
 *   @DorfSelect({
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
export function DorfSelect(options: IDorfSelectDefinition<any>) {
    return createPropertyDecorator(new DorfSelectDefinition<any>(options));
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
 *   @DorfCheckbox({
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
export function DorfCheckbox(options: IDorfCheckboxDefinition<any>) {
    return createPropertyDecorator(new DorfCheckboxDefinition<any>(options));
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
 *   @DorfRadio({
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
export function DorfRadio(options: IDorfRadioDefinition<any>) {
    return createPropertyDecorator(new DorfRadioDefinition<any>(options));
}

/**
 * @whatItDoes Marks that field in {@link DorfObject} is an another, nested DorfObject.
 *
 * @experimental
 */
export function DorfNestedObject(options: IDorfNestedDefinition<any>) {
    return createPropertyDecorator(new DorfNestedDefinition<any>(options));
}

/**
 * @whatItDoes Helper for wrapping a property decorator.
 *
 * @howToUse Should be used also for creating the decorators for custom fields.
 *
 * ### Example
 *
 * ```
 * export function CustomDecorator(options: IDorfCustomDefinition) {
 *   return createPropertyDecorator(new DorfCustomDefinition(options));
 * }
 * ```
 *
 * @stable
 */
export function createPropertyDecorator(definition: DorfDefinitionBase<any>) {
    return function (targetProto: any, propName: string) {
        setDefinitionInObject(targetProto, propName, definition);
    };
}

/**
 * Logic behind adding a field definition.
 *
 * @internal
 */
function setDefinitionInObject(targetProto: any, propName: string, definition: DorfDefinitionBase<any>) {
    targetProto.fieldDefinitions = targetProto.fieldDefinitions || {};
    targetProto.fieldDefinitions[propName] = definition;
}