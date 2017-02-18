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
 *     general: {
 *       group: "form-group",
 *       error: "error-message",
 *       label: "control-label",
 *       field: "form-control"
 *     },
 *     checkbox: {
 *       field: "no-class",
 *       label: "checkbox-inline"
 *     },
 *     radio: {
 *       field: "radio-inline"
 *     }
 *   }
 * })
 * ```
 *
 * @description
 * There are different levels where CSS classes from this interface may be applied.
 * <ul>
 *  <li>General, {@link DorfConfigService Service} level - applicable only if no other styles defined</li>
 *  <li>General, field level on the {@link DorfConfigService Service} - overrides the above classes</li>
 *  <li>Definition level - applicable for the future component, the highest priority</li>
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
}

/**
 * @whatItDoes Implementation of {@link IDorfFieldCssClasses} for fast creation with an empty values.
 *
 * @stable
 */
export class DorfFieldCssClasses implements IDorfFieldCssClasses {
    group: string = '';
    label: string = '';
    field: string = '';
    error: string = '';

    constructor(options?: IDorfFieldCssClasses) {
        if (options) {
            this.group = options.group || this.group;
            this.label = options.label || this.label;
            this.field = options.field || this.field;
            this.error = options.error || this.error;
        }
    }
}

/**
 * @whatItDoes Represents CSS classes for default DORF buttons.
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
}

/**
 * @whatItDoes Implementation of {@link IDorfFieldCssClasses} for fast creation with an empty values.
 *
 * @stable
 */
export class DorfButtonsCssClasses implements IDorfButtonsCssClasses {
    save: string = '';
    reset: string = '';
    group: string = '';

    constructor(options?: IDorfButtonsCssClasses) {
        if (options) {
            this.save = options.save || this.save;
            this.reset = options.reset || this.reset;
            this.group = options.group || this.group;
        }
    }
}

/**
 * @whatItDoes Extends {@link IDorfFieldCssClasses} to provide fields for the form and the fieldset.
 *
 * @howToUse
 * Form and fieldset classes are defined just once, during adding [DORF module]{@link DorfModule}.
 *
 * ### Example
 *
 * ```
 * DorfModule.forRoot({
 *   css: {
 *     general: {
 *       form: "form-inline",
 *       fieldset: "red-border",
 *       group: "form-group",
 *       error: "error-message",
 *       label: "control-label",
 *       field: "form-control"
 *     },
 *     checkbox: {
 *       field: "no-class",
 *       label: "checkbox-inline"
 *     },
 *     radio: {
 *       field: "radio-inline"
 *     }
 *   }
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
 * @whatItDoes Contract for declaring CSS inside {@link DorfConfigService}.
 *
 * @howToUse
 * During adding [DORF module]{@link DorfModule}.
 *
 * ### Example
 *
 * ```
 * DorfModule.forRoot({
 *   css: {
 *     general: {
 *       form: "form-inline",
 *       fieldset: "red-border",
 *       group: "form-group",
 *       error: "error-message",
 *       label: "control-label",
 *       field: "form-control"
 *     },
 *     checkbox: {
 *       field: "no-class",
 *       label: "checkbox-inline"
 *     },
 *     radio: {
 *       field: "radio-inline"
 *     }
 *   }
 * })
 * ```
 *
 * @stable
 */
export interface IDorfServiceCss {
    general?: IDorfGeneralCssClasses;
    input?: IDorfFieldCssClasses;
    radio?: IDorfFieldCssClasses;
    select?: IDorfFieldCssClasses;
    checkbox?: IDorfFieldCssClasses;
}

/**
 * @whatItDoes Implementation of {@link IDorfServiceCss} for fast creation.
 *
 * @stable
 */
export class DorfServiceCss implements IDorfServiceCss {
    general: IDorfGeneralCssClasses = this.createGeneralCss();
    input: IDorfFieldCssClasses = new DorfFieldCssClasses();
    radio: IDorfFieldCssClasses = new DorfFieldCssClasses();
    select: IDorfFieldCssClasses = new DorfFieldCssClasses();
    checkbox: IDorfFieldCssClasses = new DorfFieldCssClasses();

    constructor(options?: IDorfServiceCss) {
        if (options) {
            this.general = this.createGeneralCss(options.general);
            this.input = new DorfFieldCssClasses(options.input);
            this.radio = new DorfFieldCssClasses(options.radio);
            this.select = new DorfFieldCssClasses(options.select);
            this.checkbox = new DorfFieldCssClasses(options.checkbox);
        }
    }

    private createGeneralCss(genOpts?: IDorfGeneralCssClasses) {
        let result = new DorfFieldCssClasses(genOpts) as IDorfGeneralCssClasses;
        result.form = '';
        result.fieldset = '';
        result.section = '';
        result.buttons = new DorfButtonsCssClasses();
        if (genOpts) {
            result.form = genOpts.form || result.form;
            result.fieldset = genOpts.fieldset || result.fieldset;
            result.section = genOpts.section || result.section;
            result.buttons = new DorfButtonsCssClasses(genOpts.buttons);
        }

        return result;
    }
}