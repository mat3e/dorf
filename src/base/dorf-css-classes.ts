import { DorfConfigService } from '../dorf-config.service';
import { IDorfDefinitionBase } from '../fields/base/abstract-dorf-field.definition';

/**
 * Possible class types - from Angular's NgClass.
 */
// TODO: objects support as in NgClass from Angular - allowing objects to be passed
export type NgDorfClassType = string | IDorfCommonCssClasses;

/**
 * @whatItDoes Common part of CSS classes.
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
 * @whatItDoes Represents CSS classes for DORF buttons.
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
 * @whatItDoes Represents CSS classes for typical things connected with a DORF field.
 *
 * @howToUse
 * E.g. during adding [DORF module]{@link DorfModule}.
 *
 * ### Example
 *
 * ```
 * DorfModule.forRoot({
 *   css: {
 *     wrapper: "form-group",
 *     error: "error-message",
 *     label: "control-label",
 *     htmlField: "form-control"
 *   },
 *   dorfFields: [{
 *     tag: DorfField.CHECKBOX,
 *     css: {
 *       htmlField: "no-class",
 *       label: "checkbox-inline"
 *     }
 *   }, {
 *     tag: DorfField.RADIO,
 *     css: {
 *       htmlField: "radio-inline",
 *       label: "checkbox-inline"
 *     }
 *   }]
 * })
 * ```
 *
 * @description
 * There are different levels where CSS classes from this interface may be applied.
 * <ul>
 *  <li>General, {@link DorfConfigService} level - applicable only if no other styles defined</li>
 *  <li>Field level on the [dorfFields array]{@link DorfConfigService#dorfFields} - overrides the above classes</li>
 *  <li>Definition level - the highest priority</li>
 * </ul>
 *
 * @stable
 */
export interface IDorfFieldCssClasses extends IDorfCommonCssClasses {
    /**
     * Classes for what groups all field elements (label, control, error).
     */
    wrapper?: NgDorfClassType;

    /**
     * Classes for a label.
     */
    label?: NgDorfClassType;

    /**
     * Classes assigned to the [dorf-field]{@link DorfFieldComponent}, which stores one of the DORF fields at a time.
     */
    fieldGeneralization?: NgDorfClassType;

    /**
     * Classes assigned to the concrete field component, under [dorf-field]{@link DorfFieldComponent}.
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

export interface IDorfMultipleLabelsCssClasses extends IDorfFieldCssClasses {
    /**
     * Classes for a label which is around the field. Used especially with a checkbox or radio buttons.
     */
    innerLabel?: NgDorfClassType;
}

/**
 * @whatItDoes Extends {@link IDorfFieldCssClasses} to provide some additional classes and fallback, default ones for fields.
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
     * CSS classes for a group of DORF grouping/wrapping divs (each grouping div contains HTML field, label and error).
     * Classes assigned here are usually connected with a grid system (e.g. `'row'` class from Bootstrap).
     */
    section?: NgDorfClassType;
}

/**
 * @whatItDoes Extends {@link IDorfFieldCssClasses} to provide some additional classes and fallback, default ones for fields.
 *
 * @howToUse
 * Form, fieldset, section and button classes are defined just once, during adding [DORF module]{@link DorfModule}.
 *
 * ### Example
 *
 * ```
 * DorfModule.forRoot({
 *   css: {
 *     wrapper: "form-group",
 *     error: "error-message",
 *     label: "control-label",
 *     htmlField: "form-control",
 *     form: 'pure-form pure-form-aligned',
 *     buttons: {
 *       save: 'pure-button pure-button-primary',
 *       reset: 'hidden',
 *       group: 'pure-controls'
 *     }
 *   },
 *   dorfFields: [{
 *     tag: DorfField.CHECKBOX,
 *     css: {
 *       htmlField: "no-class",
 *       label: "checkbox-inline"
 *     }
 *   }, {
 *     tag: DorfField.RADIO,
 *     css: {
 *       htmlField: "radio-inline",
 *       label: "checkbox-inline"
 *     }
 *   }]
 * })
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
 * @whatItDoes Implementation of {@link IDorfCommonCssClasses} for a fast creation with an empty values.
 *
 * @stable
 */
export class DorfCssClasses implements IDorfCommonCssClasses {
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
