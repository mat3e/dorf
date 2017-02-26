import { DorfInputMetadata } from '../src/fields/dorf-input.metadata';
import { DorfSelectMetadata } from '../src/fields/dorf-select.metadata';
import { DorfFieldComponent } from '../src/fields/base/dorf-field.component';

describe('DorfFielWrapperComponent', () => {
    it('should support built in tags', () => {
        // GIVEN
        let testData = [
            // metaWithTag, input, radio, select, checkbox
            [DorfInputMetadata, true, false, false, false],
            [DorfSelectMetadata, false, false, true, false]
        ];
        let SUT = new DorfFieldComponent<any, any>(null);

        for (let testCase of testData) {
            // WHEN
            SUT.metadata = new (testCase[0] as any)();

            // THEN
            expect(SUT.isDorfInput).toEqual(testCase[1]);
            expect(SUT.isDorfRadio).toEqual(testCase[2]);
            expect(SUT.isDorfSelect).toEqual(testCase[3]);
            expect(SUT.isDorfCheckbox).toEqual(testCase[4]);
        }
    });
});