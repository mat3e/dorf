import { Validators } from '@angular/forms';

import { DorfFieldCssClasses } from '../src/base/dorf-css-classes';

import { DorfFieldDefinition } from '../src/fields/base/abstract-dorf-field.definition';
import { DorfInputDefinition } from '../src/fields/dorf-input.definition';
import { DorfSelectDefinition } from '../src/fields/dorf-select.definition';
import { DorfFieldMetadata } from '../src/fields/base/abstract-dorf-field.metadata';
import { DorfInputMetadata } from '../src/fields/dorf-input.metadata';
import { DorfSelectMetadata } from '../src/fields/dorf-select.metadata';
import { DorfField } from '../src/fields/base/dorf-field';

describe('DorfFieldMetadata', () => {
    it('should get values from the definition', () => {
        // GIVEN
        let def1 = new DorfInputDefinition();
        let def2 = new DorfSelectDefinition();

        // WHEN
        let meta1: DorfFieldMetadata<any, DorfFieldDefinition<any>> = new DorfInputMetadata(def1);
        let meta2: DorfFieldMetadata<any, DorfFieldDefinition<any>> = new DorfSelectMetadata(def2);

        // THEN
        expect(meta1.tag).toEqual(DorfField.INPUT);
        expect(meta2.tag).toEqual(DorfField.SELECT);
        expect(meta1.validator).toEqual(Validators.nullValidator);
        expect(meta2.validator).toEqual(Validators.nullValidator);
        expect(meta1.asyncValidator).toBeNull();
        expect(meta2.asyncValidator).toBeNull();
        expect(meta1.onSummary).toBeFalsy();
        expect(meta2.onSummary).toBeFalsy();
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
