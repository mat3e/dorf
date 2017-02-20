import { DorfFieldCssClasses, DorfButtonsCssClasses, IDorfGeneralCssClasses, DorfGeneralCssClasses } from '../src/base/dorf-css-classes';

describe('DorfFieldCssClasses', () => {
    it('sets no classes by default', () => {
        // GIVEN + WHEN
        let classes = new DorfFieldCssClasses();

        // THEN
        expect(classes.error).toEqual('');
        expect(classes.field).toEqual('');
        expect(classes.group).toEqual('');
        expect(classes.label).toEqual('');
    });
});

describe('DorfButtonsCssClasses', () => {
    it('sets no classes by default', () => {
        // GIVEN + WHEN
        let classes = new DorfButtonsCssClasses();

        // THEN
        expect(classes.save).toEqual('');
        expect(classes.reset).toEqual('');
        expect(classes.group).toEqual('');
    });
});

describe('DorfGeneralCssClasses', () => {
    it('sets no classes by default', () => {
        // GIVEN
        let general: IDorfGeneralCssClasses = new DorfFieldCssClasses(); // empty
        general.form = '';
        general.fieldset = '';
        general.section = '';
        general.buttons = new DorfButtonsCssClasses({
            save: '',
            reset: '',
            group: ''
        });

        // WHEN
        let css = new DorfGeneralCssClasses();

        // THEN
        expect(css.buttons).toEqual(general.buttons);
        expect(css.error).toEqual(general.error);
        expect(css.field).toEqual(general.field);
        expect(css.fieldset).toEqual(general.fieldset);
        expect(css.form).toEqual(general.form);
        expect(css.group).toEqual(general.group);
        expect(css.label).toEqual(general.label);
        expect(css.section).toEqual(general.section);
    });
});
