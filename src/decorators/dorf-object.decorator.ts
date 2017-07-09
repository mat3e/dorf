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
 * @Annotation
 *
 * Adds information to the class, which is interpreted later by DORF mechanisms.
 * Adds `fieldDefinitions`, based on property annotations. Results in something like [`DorfDomainObject` extension]{@link DorfDomainObject}.
 *
 * Class should be decorated with `@DorfObject()`.
 * Then, chosen properties should be annotated as well.
 *
 * @example
 * ```
 *
 *  //
 *  @DorfObject()
 *  class TestDomainObject {
 *    @DorfInput({
 *      type: "text",
 *      label: "Name",
 *      updateModelOnChange: true
 *    })
 *    private _name: string;
 *
 *    @DorfSelect({
 *      optionsToSelect: [{
 *        key: 1,
 *        value: "red"
 *      }, {
 *        key: 2,
 *        value: "green"
 *      }, {
 *        key: 3,
 *        value: "blue"
 *      }],
 *      label: "Favourite color",
 *      updateModelOnChange: true
 *    })
 *    private _favColor: number;
 *
 *    @DorfRadio({
 *      optionsToSelect: [{
 *        key: "m",
 *        value: "male"
 *      }, {
 *        key: "f",
 *        value: "female"
 *      }],
 *      label: "Gender",
 *      updateModelOnChange: true
 *    })
 *    private _gender: string;
 *
 *    @DorfCheckbox({
 *      label: "Is smart?",
 *      mapping: {
 *        trueValue: "yes",
 *        falseValue: "no"
 *      },
 *      updateModelOnChange: true
 *    })
 *    private _smart: string;
 *  }
 * ```
 *
 * @stable
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
                    let newDef = def as IDorfChooseDefinition<any>;
                    if (oldDef instanceof DorfChooseDefinition && newDef.asyncOptionsToSelect) {
                        oldDef.asyncOptionsToSelect = newDef.asyncOptionsToSelect;
                    }
                }
            }
        });
    };
}

/**
 * @Annotation
 *
 * Assignes {@link DorfInputDefinition} to a field.
 * Field should be decorated with `@DorfInput()` with parameters.
 *
 * @example
 * ```
 *
 *  //
 *  @DorfObject()
 *  class TestDomainObject {
 *    @DorfInput({
 *      type: "text",
 *      label: "Name",
 *      updateModelOnChange: true
 *    })
 *    private _name: string;
 *  }
 * ```
 *
 * @stable
 */
export function DorfInput(options: IDorfInputDefinition<any>) {
    return createPropertyDecorator(new DorfInputDefinition<any>(options));
}

/**
 * @Annotation
 *
 * Assignes {@link DorfSelectDefinition} to a field.
 * Field should be decorated with `@DorfSelect()` with parameters.
 *
 * @example
 * ```
 *
 *  //
 *  @DorfObject()
 *  class TestDomainObject {
 *    @DorfSelect({
 *      optionsToSelect: [{
 *        key: 1,
 *        value: "red"
 *      }, {
 *        key: 2,
 *        value: "green"
 *      }, {
 *        key: 3,
 *        value: "blue"
 *      }],
 *      label: "Favourite color",
 *      updateModelOnChange: true
 *    })
 *    private _favColor: number;
 *  }
 * ```
 *
 * @stable
 */
export function DorfSelect(options: IDorfSelectDefinition<any>) {
    return createPropertyDecorator(new DorfSelectDefinition<any>(options));
}

/**
 * @Annotation
 *
 * Assignes {@link DorfCheckboxDefinition} to a field.
 * Field should be decorated with `@DorfCheckbox()` with parameters.
 *
 * @example
 * ```
 *
 *  //
 *  @DorfObject()
 *  class TestDomainObject {
 *    @DorfCheckbox({
 *      label: "Is smart?",
 *      mapping: {
 *        trueValue: "yes",
 *        falseValue: "no"
 *      },
 *      updateModelOnChange: true
 *    })
 *    private _smart: string;
 *  }
 * ```
 *
 * @stable
 */
export function DorfCheckbox(options: IDorfCheckboxDefinition<any>) {
    return createPropertyDecorator(new DorfCheckboxDefinition<any>(options));
}

/**
 * @Annotation
 *
 * Assignes {@link DorfRadioDefinition} to a field.
 * Field should be decorated with `@DorfRadio()` with parameters.
 *
 * @example
 * ```
 *
 *  //
 *  @DorfObject()
 *  class TestDomainObject {
 *    @DorfRadio({
 *      optionsToSelect: [{
 *        key: "m",
 *        value: "male"
 *      }, {
 *        key: "f",
 *        value: "female"
 *      }],
 *      label: "Gender",
 *      updateModelOnChange: true
 *    })
 *    private _gender: string;
 *  }
 * ```
 *
 * @stable
 */
export function DorfRadio(options: IDorfRadioDefinition<any>) {
    return createPropertyDecorator(new DorfRadioDefinition<any>(options));
}

/**
 * @Annotation
 *
 * Indicates that field in {@link DorfObject} is a nested `DorfObject`.
 *
 * @experimental
 */
export function DorfNestedObject(options: IDorfNestedDefinition<any>) {
    return createPropertyDecorator(new DorfNestedDefinition<any>(options));
}

/**
 * Helper for wrapping a property decorator.
 * Should be used also for creating custom fields.
 *
 * @example
 * ```
 *
 *  //
 *  export function CustomDecorator(options: IDorfCustomDefinition) {
 *    return createPropertyDecorator(new DorfCustomDefinition(options));
 *  }
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
 * @hidden
 * @internal
 */
function setDefinitionInObject(targetProto: any, propName: string, definition: DorfDefinitionBase<any>) {
    targetProto.fieldDefinitions = targetProto.fieldDefinitions || {};
    targetProto.fieldDefinitions[propName] = definition;
}
