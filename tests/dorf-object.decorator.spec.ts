import { DorfCheckbox, DorfInput, DorfNestedObject, DorfObject, DorfRadio, DorfSelect } from '../src/decorators/dorf-object.decorator';
import { DorfInputDefinition } from '../src/fields/dorf-input.definition';
import { DorfSelectDefinition } from '../src/fields/dorf-select.definition';
import { DorfRadioDefinition } from '../src/fields/dorf-radio.definition';
import { DorfCheckboxDefinition } from '../src/fields/dorf-checkbox.definition';
import { DorfNestedDefinition } from '../src/fields/base/dorf-nested.definition';

describe('DorfObject', () => {
    it('provides additional things for a class', () => {
        // GIVEN
        class TestClass {
            constructor(public prop1: string, public prop2: number) {
            }
        }

        // WHEN
        DorfObject()(TestClass);
        let resultObj = new TestClass('prop1', 2);

        // THEN
        expect(resultObj.prop1).toEqual('prop1');
        expect(resultObj.prop2).toEqual(2);

        expect(Object.keys(TestClass.prototype).length).toEqual(2);
        expect((resultObj as any).fieldDefinitions).toEqual({});
        expect((resultObj as any).isDorfObject).toBeTruthy();
        expect(typeof (resultObj as any).updateDefinition).toEqual('function');
    });
});

describe('Field decorator', () => {
    it('adds a new "fieldDefinitions" entry', () => {
        // GIVEN
        let testedFn: Function = () => { };

        // WHEN
        DorfInput(null)(testedFn.prototype, 'a');
        DorfSelect(null)(testedFn.prototype, 'b');
        DorfCheckbox(null)(testedFn.prototype, 'c');
        DorfRadio(null)(testedFn.prototype, 'd');
        DorfNestedObject(null)(testedFn.prototype, 'e');

        // THEN
        expect(testedFn.prototype.fieldDefinitions).toBeDefined();

        expect(Object.keys(testedFn.prototype.fieldDefinitions).length).toEqual(5);

        expect(testedFn.prototype.fieldDefinitions.a).toBeDefined();
        expect(testedFn.prototype.fieldDefinitions.a instanceof DorfInputDefinition).toBeTruthy();
        expect(testedFn.prototype.fieldDefinitions.b).toBeDefined();
        expect(testedFn.prototype.fieldDefinitions.b instanceof DorfSelectDefinition).toBeTruthy();
        expect(testedFn.prototype.fieldDefinitions.c).toBeDefined();
        expect(testedFn.prototype.fieldDefinitions.c instanceof DorfCheckboxDefinition).toBeTruthy();
        expect(testedFn.prototype.fieldDefinitions.d).toBeDefined();
        expect(testedFn.prototype.fieldDefinitions.d instanceof DorfRadioDefinition).toBeTruthy();
        expect(testedFn.prototype.fieldDefinitions.e).toBeDefined();
        expect(testedFn.prototype.fieldDefinitions.e instanceof DorfNestedDefinition).toBeTruthy();
    });
});
