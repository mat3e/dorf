import { DorfFieldCssClasses, IDorfGeneralCssClasses, DorfServiceCss } from "../src/base/dorf-css-classes.model";

describe("DorfFieldCssClasses", () => {
    it("sets no classes by default", () => {
        // GIVEN + WHEN
        let classes = new DorfFieldCssClasses();

        // THEN
        expect(classes.error).toEqual("");
        expect(classes.field).toEqual("");
        expect(classes.group).toEqual("");
        expect(classes.label).toEqual("");
    });
});

describe("DorfServiceCss", () => {
    it("sets no classes by default", () => {
        // GIVEN + WHEN
        let serviceCss = new DorfServiceCss();

        // THEN
        expect(serviceCss.input).toEqual(new DorfFieldCssClasses());
        expect(serviceCss.radio).toEqual(new DorfFieldCssClasses());
        expect(serviceCss.select).toEqual(new DorfFieldCssClasses());
        expect(serviceCss.checkbox).toEqual(new DorfFieldCssClasses());

        let general: IDorfGeneralCssClasses = new DorfFieldCssClasses();
        general.form = "";
        general.fieldset = "";
        expect(serviceCss.general).toEqual(general);
    });
});