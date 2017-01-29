/**
 * Possible CSS classes which can be defined at different levels.
 * <ul>
 *  <li>General, {@link DorfConfigService Service} level - applicable only if no other styles defined</li>
 *  <li>General, field level on the {@link DorfConfigService Service}</li>
 *  <li>Definition level - applicable for the future component, the highest priority</li>
 * </ul>
 */
export class IDorfFieldCssClasses {
    /**
     * Class at the div, which contains field, label and error.
     */
    group?: string;

    /**
     * Class for a label.
     */
    label?: string;

    /**
     * Class for the field.
     */
    field?: string;

    /**
     * Class for the error, below the field.
     */
    error?: string;
}

/**
 * Implementation of {@link IDorfFieldCssClasses} for fast creation.
 */
export class DorfFieldCssClasses implements IDorfFieldCssClasses {
    group = "";
    label = "";
    field = "";
    error = "";

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
 * Form and fieldset classes are defined just once, inside form.
 */
export interface IDorfGeneralCssClasses extends IDorfFieldCssClasses {
    /**
     * CSS class for a whole form.
     */
    form?: string;

    /**
     * CSS class for a fieldset around all the form fields.
     */
    fieldset?: string;
}

/**
 * Contract for declaring CSS options inside {@link DorfConfigService}.
 */
export interface IDorfServiceCss {
    general?: IDorfGeneralCssClasses;
    input?: IDorfFieldCssClasses;
    radio?: IDorfFieldCssClasses;
    select?: IDorfFieldCssClasses;
    checkbox?: IDorfFieldCssClasses;
}

/**
 * Implementation of {@link IDorfServiceCss} for fast creation.
 */
export class DorfServiceCss implements IDorfServiceCss {
    general = this.createGeneralCss();
    input: IDorfFieldCssClasses = new DorfFieldCssClasses();
    radio: IDorfFieldCssClasses = new DorfFieldCssClasses();
    select: IDorfFieldCssClasses = new DorfFieldCssClasses();
    checkbox: IDorfFieldCssClasses = new DorfFieldCssClasses();

    constructor(options?: IDorfServiceCss) {
        if (options) {
            this.general = this.createGeneralCss(options.general) || this.general;
            this.input = new DorfFieldCssClasses(options.input) || this.input;
            this.radio = new DorfFieldCssClasses(options.radio) || this.radio;
            this.select = new DorfFieldCssClasses(options.select) || this.select;
            this.checkbox = new DorfFieldCssClasses(options.checkbox) || this.checkbox;
        }
    }

    private createGeneralCss(options?: IDorfGeneralCssClasses) {
        let result = new DorfFieldCssClasses(options) as IDorfGeneralCssClasses;
        result.form = "";
        result.fieldset = "";
        if (options) {
            result.form = options.form;
            result.fieldset = options.fieldset;
        }

        return result;
    }
}