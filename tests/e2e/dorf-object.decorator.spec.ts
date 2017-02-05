import { IDorfInputDefinition, DorfInputDefinition } from '../../src/fields/dorf-input.component';
import { IDorfSelectDefinition, DorfSelectDefinition } from '../../src/fields/dorf-select.component';

import { DorfObject, DorfInput, DorfSelect, DorfCheckbox, DorfRadio } from '../../src/decorators/dorf-object.decorator';

describe('DorfObject', () => {

    @DorfObject()
    class TestDomainObject { }

    let obj = new TestDomainObject();

    it('adds \'isDorfObject\' and \'fieldDefinitions\' to annotated object', () => {
        expect(obj['isDorfObject']).toBeDefined();
        expect(obj['isDorfObject']).toBeTruthy();
        expect(obj['fieldDefinitions']).toBeDefined();
        expect(obj['fieldDefinitions']).toEqual({});
    });
});

describe('DorfInput', () => {

    let def1: IDorfInputDefinition<string> = {
        type: 'text',
        label: 'Name',
        updateModelOnChange: true
    }

    @DorfObject()
    class TestDomainObject {
        @DorfInput<string>(def1)
        private _name: string;

        @DorfInput<string>({ type: 'text', label: 'Surname', updateModelOnChange: true })
        private _surname: string;
    }

    let obj = new TestDomainObject();

    it('adds definitions to a \'fieldDefinitions\' map', () => {
        expect(obj['fieldDefinitions']._name).toBeDefined();
        expect(obj['fieldDefinitions']._name).toEqual(new DorfInputDefinition<string>(def1));
        expect(obj['fieldDefinitions']._surname).toBeDefined();

        expect(Object.keys(obj['fieldDefinitions']).length).toEqual(2);
    });
});

describe('DorfSelect', () => {

    let def: IDorfSelectDefinition<number> = {
        optionsToSelect: [{ key: 1, value: 'red' }, { key: 2, value: 'green' }, { key: 3, value: 'blue' }],
        label: 'Favourite color',
        updateModelOnChange: true
    }

    @DorfObject()
    class TestDomainObject {
        @DorfSelect<number>(def)
        private _favColor: number;
    }

    let obj = new TestDomainObject();

    it('adds definitions to a \'fieldDefinitions\' map', () => {
        expect(obj['fieldDefinitions']._favColor).toBeDefined();
        expect(obj['fieldDefinitions']._favColor).toEqual(new DorfSelectDefinition<number>(def));
    });
});

describe('DorfCheckbox', () => {

    @DorfObject()
    class TestDomainObject {
        @DorfCheckbox<string>({
            label: 'Is smart?',
            mapping: { trueValue: 'yes', falseValue: 'no' },
            updateModelOnChange: true
        })
        private _smart: string;
    }

    let obj = new TestDomainObject();

    it('adds definitions to a \'fieldDefinitions\' map', () => {
        expect(obj['fieldDefinitions']._smart).toBeDefined();
    });
});

describe('DorfRadio', () => {

    @DorfObject()
    class TestDomainObject {
        @DorfRadio<string>({
            optionsToSelect: [{ key: 'm', value: 'male' }, { key: 'f', value: 'female' }],
            label: 'Gender',
            updateModelOnChange: true
        })
        private _gender: string;
    }

    let obj = new TestDomainObject();

    it('adds definitions to a \'fieldDefinitions\' map', () => {
        expect(obj['fieldDefinitions']._gender).toBeDefined();
    });
});
