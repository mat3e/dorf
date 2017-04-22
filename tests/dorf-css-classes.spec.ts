import {
    DorfFieldCssClasses,
    DorfButtonsCssClasses,
    IDorfGeneralCssClasses,
    DorfMultipleLabelsCssClasses,
    DorfGeneralCssClasses
} from '../src/base/dorf-css-classes';

describe('DorfFieldCssClasses', () => {
    it('sets no classes by default', () => {
        // GIVEN + WHEN
        let classes = new DorfFieldCssClasses();

        // THEN
        expect(classes.error).toEqual('');
        expect(classes.fieldGeneralization).toEqual('');
        expect(classes.dorfField).toEqual('');
        expect(classes.htmlField).toEqual('');
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

describe('DorfMultipleLabelsCssClasses', () => {
    it('sets no classes by default', () => {
        // GIVEN + WHEN
        let classes = new DorfMultipleLabelsCssClasses();

        // THEN
        expect(classes.error).toEqual('');
        expect(classes.fieldGeneralization).toEqual('');
        expect(classes.dorfField).toEqual('');
        expect(classes.htmlField).toEqual('');
        expect(classes.group).toEqual('');
        expect(classes.label).toEqual('');
        expect(classes.innerLabel).toEqual('');
    });
});

describe('DorfGeneralCssClasses', () => {
    it('sets no classes by default', () => {
        // GIVEN
        let general: IDorfGeneralCssClasses = new DorfMultipleLabelsCssClasses(); // empty
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
        expect(css.fieldGeneralization).toEqual(general.fieldGeneralization);
        expect(css.dorfField).toEqual(general.dorfField);
        expect(css.htmlField).toEqual(general.htmlField);
        expect(css.fieldset).toEqual(general.fieldset);
        expect(css.form).toEqual(general.form);
        expect(css.group).toEqual(general.group);
        expect(css.label).toEqual(general.label);
        expect(css.innerLabel).toEqual(general.innerLabel);
        expect(css.section).toEqual(general.section);
    });
});
