import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { OptionType, DorfChooseDefinition } from '../src/fields/base/abstract-dorf-choose.definition';
import { DorfSelectDefinition } from '../src/fields/dorf-select.definition';

describe('DorfChooseDefinition', () => {
    it('throws an error when no "optionsToSelect" nor "asyncOptionsToSelect" set', () => {
        // GIVEN
        let msg = `Expected 'asyncOptionsToSelect' to be Promise or Observable when no 'optionsToSelect' specified`;

        // WHEN
        let def: DorfChooseDefinition<any> = new DorfSelectDefinition<any>();
        let getterUsage = () => {
            return def.optionsToSelect;
        }

        // THEN
        expect(getterUsage).toThrowError(msg);
    });

    it('should get "optionsToSelect" from "asyncOptionsToSelect"', (done: DoneFn) => {
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

    it('allows overriding "optionsToSelect" and "asyncOptionsToSelect"', (done: DoneFn) => {
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
        asyncOpts.subscribe(null, null, () => { done(); });

        let def: DorfChooseDefinition<number> = new DorfSelectDefinition<number>();
        expect(def['_optionsToSelect']).toBeUndefined();
        expect(def['_asyncOptionsToSelect']).toBeUndefined();

        // WHEN
        def.asyncOptionsToSelect = asyncOpts;
        expect(def['_optionsToSelect']).toBeNull();

        // THEN
        expect(def.optionsToSelect).toEqual(opts);
    });
});
