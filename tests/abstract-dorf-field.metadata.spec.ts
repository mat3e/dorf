import { FormControl } from '@angular/forms';

import { IDorfDefinitionBase, IDorfFieldDefinition } from '../src/fields/base/abstract-dorf-field.definition';
import { DorfInputDefinition } from '../src/fields/dorf-input.definition';
import { DorfSelectDefinition } from '../src/fields/dorf-select.definition';
import { DorfFieldMetadata, DorfMetadataBase } from '../src/fields/base/abstract-dorf-field.metadata';
import { DorfInputMetadata } from '../src/fields/dorf-input.metadata';
import { DorfSelectMetadata } from '../src/fields/dorf-select.metadata';
import { SELECT } from '../src/fields/base/constants';

describe('DorfMetadataBase', () => {
    it('gets the values from options and definition', () => {
        // GIVEN
        let def = new DorfSelectDefinition();

        // WHEN
        let meta: DorfMetadataBase<any, IDorfDefinitionBase<any>> = new DorfSelectMetadata(def, { key: 'abc' });

        // THEN
        expect(meta.tag).toEqual(SELECT);
        expect(meta.key).toEqual('abc');
    });

    it('supports additional properties, from definition "extras"', () => {
        // GIVEN
        let VAL = 'bar';
        let def = new DorfSelectDefinition({ extras: { foo: VAL } });

        // WHEN
        let meta: DorfMetadataBase<any, IDorfDefinitionBase<any>> = new DorfSelectMetadata(def);

        // THEN
        expect((meta as any).foo).toEqual(VAL);
    });

    it('uses "parentCss" to determine style', () => {
        // GIVEN
        let CLASS = 'xyz';
        let def = new DorfSelectDefinition();
        let options = { key: 'xx', parentCss: { htmlField: CLASS } };

        // WHEN
        let meta: DorfMetadataBase<any, IDorfDefinitionBase<any>> = new DorfSelectMetadata(def, options);

        // THEN
        expect(meta.parentCss).toBeDefined();
        expect(meta.getCss('htmlField')).toEqual(CLASS);
    });

    it('returns direct css class before "parentCss"', () => {
        // GIVEN
        let CLASS1 = 'xyz';
        let CLASS2 = 'abc';
        let def = new DorfSelectDefinition({
            css: {
                htmlField: CLASS1
            }
        });
        let options = { key: 'xx', parentCss: { htmlField: CLASS2 } };

        // WHEN
        let meta: DorfMetadataBase<any, IDorfDefinitionBase<any>> = new DorfSelectMetadata(def, options);

        // THEN
        expect(meta.getCss('htmlField')).toEqual(CLASS1);
    });
});

describe('DorfFieldMetadata', () => {
    it('should get values from the definition', () => {
        // GIVEN
        let def1 = new DorfInputDefinition();
        let def2 = new DorfSelectDefinition();

        // WHEN
        let meta1: DorfFieldMetadata<any, IDorfFieldDefinition<any>> = new DorfInputMetadata(def1);
        let meta2: DorfFieldMetadata<any, IDorfFieldDefinition<any>> = new DorfSelectMetadata(def2);

        // THEN
        expect(meta1.onSummary).toBeFalsy();
        expect(meta2.onSummary).toBeFalsy();
    });

    it('should get values from the provided options', () => {
        // GIVEN
        let def1 = new DorfSelectDefinition({ optionsToSelect: null, updateModelOnChange: true });
        let def2 = new DorfSelectDefinition({ optionsToSelect: null, updateModelOnChange: false });
        let setter = (val: any) => { console.log(val); };

        // WHEN
        let meta1: DorfFieldMetadata<any, IDorfFieldDefinition<any>>
            = new DorfSelectMetadata(def1, { key: 'bbb', setDomainObjValue: setter });
        let meta2: DorfFieldMetadata<any, IDorfFieldDefinition<any>>
            = new DorfSelectMetadata(def2, { key: 'ccc', setDomainObjValue: setter });

        // THEN
        expect((meta1 as any)._setDomainObjValue).toEqual(setter);
        // without `updateModelOnChange` here should be a noop setter
        expect((meta2 as any)._setDomainObjValue).not.toEqual(setter);
    });

    it('generates formControl and caches the value', () => {
        // GIVEN
        let def = new DorfInputDefinition();
        let meta: DorfFieldMetadata<any, IDorfFieldDefinition<any>> = new DorfInputMetadata(def);
        let extractor = spyOn(meta as any, 'extractFormControl').and.returnValue(new FormControl());

        // WHEN
        let called = meta.formControl;
        called = meta.formControl;

        // THEN
        expect(extractor).toHaveBeenCalledTimes(1);
    });
});
