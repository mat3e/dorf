import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { OptionType, DorfChooseDefinition } from '../src/fields/base/abstract-dorf-choose.definition';
import { DorfSelectDefinition } from '../src/fields/dorf-select.definition';

describe('DorfChooseDefinition', () => {
    it('should get optionsToSelect from asyncOptionsToSelect', (done: DoneFn) => {
        // GIVEN
        let opts: OptionType<number>[] = [{
            key: 1,
            value: '1'
        }, {
            key: 2,
            value: '2'
        }, {
            key: 3,
            value: '3'
        }];
        let asyncOpts: Observable<OptionType<number>[]> = Observable.of(opts);

        // WHEN
        let def: DorfChooseDefinition<number> = new DorfSelectDefinition<number>({
            asyncOptionsToSelect: asyncOpts
        });
        asyncOpts.subscribe(null, null, () => { done(); });

        // THEN
        expect(def.optionsToSelect).toEqual(opts);
    });
});