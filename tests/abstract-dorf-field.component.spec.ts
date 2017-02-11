import { Validators } from '@angular/forms';

import { DorfFieldCssClasses } from '../src/base/dorf-css-classes.model';

import { DorfInputDefinition, DorfInputMetadata } from '../src/fields/dorf-input.component';
import { DorfSelectDefinition, DorfSelectMetadata } from '../src/fields/dorf-select.component';

import { DorfTag, DorfFieldDefinition, DorfFieldMetadata } from '../src/fields/base/abstract-dorf-field.component';

describe('DorfFieldDefinition', () => {
    it('should have default values for validators, "isListField" and "css"', () => {
        // GIVEN + WHEN
        let def1: DorfFieldDefinition<any> = new DorfInputDefinition();
        let def2: DorfFieldDefinition<any> = new DorfSelectDefinition();

        // THEN
        expect(def1.validator).toEqual(Validators.nullValidator);
        expect(def2.validator).toEqual(Validators.nullValidator);
        expect(def1.asyncValidator).toBeNull();
        expect(def2.asyncValidator).toBeNull();
        expect(def1.isListField).toBeFalsy();
        expect(def2.isListField).toBeFalsy();
        expect(def1.css).toEqual(new DorfFieldCssClasses());
        expect(def2.css).toEqual(new DorfFieldCssClasses());
    });
});

describe('DorfFieldMetadata', () => {
    it('should get values from the definition', () => {
        // GIVEN
        let def1 = new DorfInputDefinition();
        let def2 = new DorfSelectDefinition();

        // WHEN
        let meta1: DorfFieldMetadata<any, DorfFieldDefinition<any>> = new DorfInputMetadata(def1);
        let meta2: DorfFieldMetadata<any, DorfFieldDefinition<any>> = new DorfSelectMetadata(def2);

        // THEN
        expect(meta1.tag).toEqual(DorfTag.INPUT);
        expect(meta2.tag).toEqual(DorfTag.SELECT);
        expect(meta1.validator).toEqual(Validators.nullValidator);
        expect(meta2.validator).toEqual(Validators.nullValidator);
        expect(meta1.asyncValidator).toBeNull();
        expect(meta2.asyncValidator).toBeNull();
        expect(meta1.isListField).toBeFalsy();
        expect(meta2.isListField).toBeFalsy();
        expect(meta1.css).toEqual(new DorfFieldCssClasses());
        expect(meta2.css).toEqual(new DorfFieldCssClasses());
    });

    it('should get values from the provided options', () => {
        // GIVEN
        let def1 = new DorfInputDefinition();
        let def2 = new DorfSelectDefinition({ optionsToSelect: null, updateModelOnChange: true });
        let def3 = new DorfSelectDefinition({ optionsToSelect: null, updateModelOnChange: false });
        let setter = (val: any) => { console.log(val); };

        // WHEN
        let meta1: DorfFieldMetadata<any, DorfFieldDefinition<any>> = new DorfInputMetadata(def1, { key: 'aaa', value: null });
        let meta2: DorfFieldMetadata<any, DorfFieldDefinition<any>> = new DorfSelectMetadata(def2, { key: 'bbb', setDomainObjValue: setter });
        let meta3: DorfFieldMetadata<any, DorfFieldDefinition<any>> = new DorfSelectMetadata(def3, { key: 'ccc', setDomainObjValue: setter });

        // THEN
        expect(meta1.key).toEqual('aaa');
        expect(meta2.key).toEqual('bbb');
        expect(meta2['_setDomainObjValue']).toEqual(setter);
        expect(meta3.key).toEqual('ccc');
        // without `updateModelOnChange` here should be a noop setter
        expect(meta3['_setDomainObjValue']).not.toEqual(setter);
    });
});
