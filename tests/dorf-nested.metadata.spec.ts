import { DorfField } from '../src/fields/base/dorf-field';
import { DorfNestedDefinition } from './../src/fields/base/dorf-nested.definition';
import { DorfNestedMetadata } from '../src/fields/base/dorf-nested.metadata';

describe('DorfSelectMetadata', () => {
    it('should get value for "transparentFlow" and "columnsNumber" from the definition', () => {
        // GIVEN
        let def = new DorfNestedDefinition<number>({ columnsNumber: 7, transparentFlow: true });

        // WHEN
        let meta = new DorfNestedMetadata<number>(def);

        // THEN
        expect(meta.columnsNumber).toEqual(7);
        expect(meta.transparentFlow).toBeTruthy(); // having both columns and flow to true doesn't make sense anyway
    });
});
