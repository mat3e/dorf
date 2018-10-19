import { DorfInputDefinition, IDorfInputDefinition } from '../../src/fields/dorf-input.definition';
import { DorfSelectDefinition, IDorfSelectDefinition } from '../../src/fields/dorf-select.definition';

import { DorfCheckbox, DorfInput, DorfObject, DorfRadio, DorfSelect } from '../../src/decorators/dorf-object.decorator';

describe('DorfObject', () => {

    @DorfObject()
    class TestDomainObject { }

    let obj = new TestDomainObject();

    it('adds "isDorfObject" and "fieldDefinitions" to annotated object', () => {
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
    };

    @DorfObject()
    class TestDomainObject {
        @DorfInput(def1)
        private _name: string;

        @DorfInput({ type: 'text', label: 'Surname', updateModelOnChange: true })
        private _surname: string;
    }

    let obj = new TestDomainObject();

    it('adds definitions to a "fieldDefinitions" map', () => {
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
    };

    @DorfObject()
    class TestDomainObject {
        @DorfSelect(def)
        private _favColor: number;
    }

    let obj = new TestDomainObject();

    it('adds definitions to a "fieldDefinitions" map', () => {
        expect(obj['fieldDefinitions']._favColor).toBeDefined();
        expect(obj['fieldDefinitions']._favColor).toEqual(new DorfSelectDefinition<number>(def));
    });
});

describe('DorfCheckbox', () => {

    @DorfObject()
    class TestDomainObject {
        @DorfCheckbox({
            label: 'Is smart?',
            mapping: { trueValue: 'yes', falseValue: 'no' },
            updateModelOnChange: true
        })
        private _smart: string;
    }

    let obj = new TestDomainObject();

    it('adds definitions to a "fieldDefinitions" map', () => {
        expect(obj['fieldDefinitions']._smart).toBeDefined();
    });
});

describe('DorfRadio', () => {

    @DorfObject()
    class TestDomainObject {
        @DorfRadio({
            optionsToSelect: [{ key: 'm', value: 'male' }, { key: 'f', value: 'female' }],
            label: 'Gender',
            updateModelOnChange: true
        })
        private _gender: string;
    }

    let obj = new TestDomainObject();

    it('adds definitions to a "fieldDefinitions" map', () => {
        expect(obj['fieldDefinitions']._gender).toBeDefined();
    });
});
