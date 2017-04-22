/**
 * Possible class types - from Angular's NgClass.
 */
// TODO: objects support as in NgClass from Angular - allowing objects to be passed
export type NgDorfClassType = string | string[] | Set<string> | { [klass: string]: any };

/**
 * @whatItDoes Common part of CSS classes.
 *
 * @stable
 */
export interface IDorfCommonCssClasses {
    /**
     * Classes for a section which groups all the buttons/field elements (label, control, error).
     */
    group?: NgDorfClassType;

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
     * Classes for 'Save' button.
     */
    save?: NgDorfClassType;

    /**
     * Classes for 'Reset' button.
     */
    reset?: NgDorfClassType;
}

/**
 * @whatItDoes Implementation of {@link IDorfFieldCssClasses} for a fast creation with an empty values.
 *
 * @stable
 */
export class DorfButtonsCssClasses implements IDorfButtonsCssClasses {
    save: NgDorfClassType = '';
    reset: NgDorfClassType = '';
    group: NgDorfClassType = '';
    [key: string]: NgDorfClassType;

    constructor(options?: IDorfButtonsCssClasses) {
        if (options) {
            this.save = options.save || this.save;
            this.reset = options.reset || this.reset;
            this.group = options.group || this.group;

            for (let cls in options) {
                if (!this.hasOwnProperty(cls)) {
                    this[cls] = options[cls];
                }
            }
        }
    }
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
 *     group: "form-group",
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

/**
 * @whatItDoes Implementation of {@link IDorfFieldCssClasses} for a fast creation with an empty values.
 *
 * @stable
 */
export class DorfFieldCssClasses implements IDorfFieldCssClasses {
    group: NgDorfClassType = '';
    label: NgDorfClassType = '';
    fieldGeneralization: NgDorfClassType = '';
    dorfField: NgDorfClassType = '';
    htmlField: NgDorfClassType = '';
    error: NgDorfClassType = '';
    [key: string]: NgDorfClassType;

    constructor(options?: IDorfFieldCssClasses) {
        if (options) {
            this.group = options.group || this.group;
            this.label = options.label || this.label;
            this.fieldGeneralization = options.fieldGeneralization || this.fieldGeneralization;
            this.dorfField = options.dorfField || this.dorfField;
            this.htmlField = options.htmlField || this.htmlField;
            this.error = options.error || this.error;

            for (let cls in options) {
                if (!this.hasOwnProperty(cls)) {
                    this[cls] = options[cls];
                }
            }
        }
    }
}

export interface IDorfMultipleLabelsCssClasses extends IDorfFieldCssClasses {
    /**
     * Classes for a label which is around the field. Used especially with a checkbox or radio buttons.
     */
    innerLabel?: NgDorfClassType;
}

/**
 * @whatItDoes Implementation of {@link IDorfMultipleLabelsCssClasses} for a fast creation with an empty values.
 *
 * @stable
 */
export class DorfMultipleLabelsCssClasses extends DorfFieldCssClasses implements IDorfMultipleLabelsCssClasses {
    innerLabel: NgDorfClassType = '';

    constructor(options?: IDorfFieldCssClasses) {
        super(options);
        if (options) {
            this.innerLabel = options.innerLabel || this.innerLabel;
        }
    }
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
 *     group: "form-group",
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
     * CSS classes for a group of DORF grouping/wrapping divs (each grouping div contains HTML field, label and error).
     * Classes assigned here are usually connected with a grid system (e.g. `'row'` class from Bootstrap).
     */
    section?: NgDorfClassType;

    /**
     * CSS classes for various buttons connected with form.
     */
    buttons?: IDorfButtonsCssClasses;
}

/**
 * @whatItDoes Implementation of {@link IDorfGeneralCssClasses} for a fast creation with an empty values.
 *
 * @stable
 */
export class DorfGeneralCssClasses extends DorfMultipleLabelsCssClasses implements IDorfGeneralCssClasses {
    form: NgDorfClassType = '';
    fieldset: NgDorfClassType = '';
    section: NgDorfClassType = '';
    buttons: IDorfButtonsCssClasses = new DorfButtonsCssClasses();

    constructor(options?: IDorfGeneralCssClasses) {
        super(options);

        if (options) {
            this.form = options.form || this.form;
            this.fieldset = options.fieldset || this.fieldset;
            this.section = options.section || this.section;
            this.buttons = new DorfButtonsCssClasses(options.buttons);
        }
    }
}