/**
 * @whatItDoes Represents CSS classes for DORF buttons.
 *
 * @stable
 */
export interface IDorfButtonsCssClasses {
    /**
     * Classes for 'Save' button.
     */
    save?: string;

    /**
     * Classes for 'Reset' button.
     */
    reset?: string;

    /**
     * Classes for a section which groups all the buttons.
     */
    group?: string;

    /**
     * Classes to be used with custom templates.
     */
    [key: string]: string | any;
}

/**
 * @whatItDoes Implementation of {@link IDorfFieldCssClasses} for a fast creation with an empty values.
 *
 * @stable
 */
export class DorfButtonsCssClasses implements IDorfButtonsCssClasses {
    save: string = '';
    reset: string = '';
    group: string = '';
    [key: string]: string | any;

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
 *     field: "form-control"
 *   },
 *   dorfFields: [{
 *     tag: DorfField.CHECKBOX,
 *     css: {
 *       field: "no-class",
 *       label: "checkbox-inline"
 *     }
 *   }, {
 *     tag: DorfField.RADIO,
 *     css: {
 *       field: "radio-inline",
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
export interface IDorfFieldCssClasses {
    /**
     * Classes at the grouping div, which contains field, label and error.
     */
    group?: string;

    /**
     * Classes for a label.
     */
    label?: string;

    /**
     * Classes for the field.
     */
    field?: string;

    /**
     * Classes for the error, below the field.
     */
    error?: string;

    /**
     * Classes to be used with custom templates.
     */
    [key: string]: string | any;
}

/**
 * @whatItDoes Implementation of {@link IDorfFieldCssClasses} for a fast creation with an empty values.
 *
 * @stable
 */
export class DorfFieldCssClasses implements IDorfFieldCssClasses {
    group: string = '';
    label: string = '';
    field: string = '';
    error: string = '';
    [key: string]: string | any;

    constructor(options?: IDorfFieldCssClasses) {
        if (options) {
            this.group = options.group || this.group;
            this.label = options.label || this.label;
            this.field = options.field || this.field;
            this.error = options.error || this.error;

            for (let cls in options) {
                if (!this.hasOwnProperty(cls)) {
                    this[cls] = options[cls];
                }
            }
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
 *     field: "form-control",
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
 *       field: "no-class",
 *       label: "checkbox-inline"
 *     }
 *   }, {
 *     tag: DorfField.RADIO,
 *     css: {
 *       field: "radio-inline",
 *       label: "checkbox-inline"
 *     }
 *   }]
 * })
 * ```
 *
 * @stable
 */
export interface IDorfGeneralCssClasses extends IDorfFieldCssClasses {
    /**
     * CSS classes for a whole form.
     */
    form?: string;

    /**
     * CSS classes for a fieldset around all the form fields.
     */
    fieldset?: string;

    /**
     * CSS classes for a group of DORF grouping divs (each grouping div contains field, label and error).
     * Classes assigned here are usually connected with a grid system (e.g. `'row'` class from Bootstrap).
     */
    section?: string;

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
export class DorfGeneralCssClasses extends DorfFieldCssClasses implements IDorfGeneralCssClasses {
    form: string = '';
    fieldset: string = '';
    section: string = '';
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