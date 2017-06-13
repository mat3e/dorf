import { DorfConfigService } from '../dorf-config.service';
import { IDorfDefinitionBase } from '../fields/base/abstract-dorf-field.definition';

// TODO: objects support as in NgClass from Angular - allowing objects to be passed
/**
 * General type, used in DORF CSS interfaces.
 * Classes should be passed as string values with spaces, but some definitions, like e.g. buttons, are nested within other definitions.
 */
export type NgDorfClassType = string | IDorfCommonCssClasses;

/**
 * Common part of CSS classes. Interfaces are not strict, so additional fields may be defined and used in DORF extensions.
 *
 * @stable
 */
export interface IDorfCommonCssClasses {
    /**
     * Classes to be used with custom templates.
     */
    [key: string]: NgDorfClassType;
}

/**
 * Represents CSS classes for DORF buttons.
 *
 * @stable
 */
export interface IDorfButtonsCssClasses extends IDorfCommonCssClasses {
    /**
     * Classes for a section which groups all the buttons.
     */
    group?: NgDorfClassType;

    /**
     * Classes for 'Save' button.
     */
    save?: NgDorfClassType;

    /**
     * Classes for 'Reset' button.
     */
    reset?: NgDorfClassType;
}

/**
 * Represents CSS classes for typical things connected with DORF field.
 * Should be used e.g. when including [DORF module]{@link DorfModule}.
 *
 * There are various places, where CSS classes from this interface may be applied.
 * <ol>
 *  <li>General, {@link DorfConfigService} level - applicable only if no other styles defined</li>
 *  <li>Field level on the [`dorfFields` array]{@link DorfConfigService#dorfFields} - overrides the above classes</li>
 *  <li>Definition level - the closest to the field, the highest priority</li>
 * </ol>
 *
 * @example
 * ```
 *
 *  //
 *  DorfModule.forRoot({
 *    css: {
 *      wrapper: "form-group",
 *      error: "error-message",
 *      label: "control-label",
 *      htmlField: "form-control"
 *    },
 *    dorfFields: [{
 *      tag: DorfField.CHECKBOX,
 *      css: {
 *        htmlField: "no-class",
 *        label: "checkbox-inline"
 *      }
 *    }, {
 *      tag: DorfField.RADIO,
 *      css: {
 *        htmlField: "radio-inline",
 *        label: "checkbox-inline"
 *      }
 *    }]
 *  })
 * ```
 *
 * @stable
 */
export interface IDorfFieldCssClasses extends IDorfCommonCssClasses {
    /**
     * Classes for wrapper, which groups all field elements (label, control, error).
     */
    wrapper?: NgDorfClassType;

    /**
     * Classes for a label.
     */
    label?: NgDorfClassType;

    /**
     * Classes assigned to the [`dorf-field`]{@link DorfFieldComponent}, which stores one of the fields at a time.
     */
    fieldGeneralization?: NgDorfClassType;

    /**
     * Classes assigned to the concrete field component, under [`dorf-field`]{@link DorfFieldComponent}, e.g. to `dorf-input`.
     */
    dorfField?: NgDorfClassType;

    /**
     * Classes for the HTML control.
     */
    htmlField?: NgDorfClassType;

    /**
     * Classes for the error, below the field.
     */
    error?: NgDorfClassType;
}

/**
 * Some fields, like radio and checkbox, may have 2 labels and corresponding CSS classes.
 *
 * @stable
 */
export interface IDorfMultipleLabelsCssClasses extends IDorfFieldCssClasses {
    /**
     * Classes for a label which is around the field. Used especially with a checkbox or radio buttons.
     */
    innerLabel?: NgDorfClassType;
}

/**
 * Classes available in the form and the fallback classes for field (applicable if nowhere else defined).
 *
 * @stable
 */
export interface IDorfGeneralCssClasses extends IDorfMultipleLabelsCssClasses {
    /**
     * CSS classes for a whole form.
     */
    form?: NgDorfClassType;

    /**
     * CSS classes for a fieldset around all the form fields.
     */
    fieldset?: NgDorfClassType;

    /**
     * CSS classes for a legend under the fieldset.
     */
    legend?: NgDorfClassType;

    /**
     * CSS classes for a group of DORF wrapping divs (each wrapping div contains HTML field, label and error).
     * Classes assigned here are usually connected with a grid system (e.g. `'row'` class from Bootstrap).
     */
    section?: NgDorfClassType;
}

/**
 * The most general set of classes, used for the form component and for the fallbacks.
 * Form, fieldset, section and button classes are defined just once, during adding [DORF module]{@link DorfModule}.
 *
 * @example
 * ```
 *
 *  //
 *  DorfModule.forRoot({
 *    css: {
 *      wrapper: "form-group",
 *      error: "error-message",
 *      label: "control-label",
 *      htmlField: "form-control",
 *      form: 'pure-form pure-form-aligned',
 *      buttons: {
 *        save: 'pure-button pure-button-primary',
 *        reset: 'hidden',
 *        group: 'pure-controls'
 *      }
 *    },
 *    dorfFields: [{
 *      tag: DorfField.CHECKBOX,
 *      css: {
 *        htmlField: "no-class",
 *        label: "checkbox-inline"
 *      }
 *    }, {
 *      tag: DorfField.RADIO,
 *      css: {
 *        htmlField: "radio-inline",
 *        label: "checkbox-inline"
 *      }
 *    }]
 *  })
 * ```
 *
 * @stable
 */
export interface IDorfGeneralWithButtonsCssClasses extends IDorfGeneralCssClasses {
    /**
     * CSS classes for various buttons connected with form.
     */
    buttons?: IDorfButtonsCssClasses;
}

/**
 * Implementation of {@link IDorfCommonCssClasses} for a fast creation with an empty values.
 *
 * @stable
 */
export class DorfCssClasses implements IDorfCommonCssClasses {
    /** @inheritdoc */
    [key: string]: NgDorfClassType;

    constructor(options?: IDorfCommonCssClasses) {
        let populateOptions = (opts: IDorfCommonCssClasses, target: IDorfCommonCssClasses) => {
            for (let cls in opts) {
                if (!target.hasOwnProperty(cls)) {
                    let val = opts[cls];
                    if (typeof val === 'string') {
                        target[cls] = val;
                    } else {
                        target[cls] = {};
                        populateOptions(val, target[cls] as IDorfCommonCssClasses);
                    }
                }
            }
        }

        if (options) {
            populateOptions(options, this);
        }
    }
}
