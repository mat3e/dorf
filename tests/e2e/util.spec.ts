import { groupMetadata } from '../../src/fields/base/util';
import { IDorfFieldMetadata, DorfMetadataBase } from '../../src/fields/base/abstract-dorf-field.metadata';
import { IDorfNestedDefinition } from '../../src/fields/base/dorf-nested.definition';
import { DorfNestedMetadata } from '../../src/fields/base/dorf-nested.metadata';
import { DorfInputDefinition } from '../../src/fields/dorf-input.definition';
import { DorfInputMetadata } from '../../src/fields/dorf-input.metadata';

// TODO: group tests in loops - without groups, with transparent, with not transparent, 3 last cases separately
let def = new DorfInputDefinition();

/**
 * Helper for tests, for automation.
 */
class Sample {
    expectedOrder: string[];
    numberOfColumns: number;
    rows: number;

    source: DorfMetadataBase<any, any>[];
    nested: DorfNestedMetadata<any>;

    /**
     * Should be executed when starting a test.
     *
     * @param expectedOrder order of elements, ignoring groups
     * @param numberOfColumns how many columns do we want to have
     * @param rows number of 'rows' according to the given conditions; it is calculated automatically for transparentFlow
     * @param nestedDef conditions for creating a nestedMetadata
     */
    // tslint:disable-next-line:max-line-length
    constructor(expectedOrder: string[], numberOfColumns: number, rows: number = -1, nestedDef: IDorfNestedDefinition<any> = { transparentFlow: true }) {
        this.nested = new DorfNestedMetadata(nestedDef);
        this.nested.nestedFieldsMetadata = [
            new DorfInputMetadata(def, { key: 'a' }),
            new DorfInputMetadata(def, { key: 'b' }),
            new DorfInputMetadata(def, { key: 'c' }),
            new DorfInputMetadata(def, { key: 'd' })
        ];

        this.expectedOrder = expectedOrder;
        this.numberOfColumns = numberOfColumns;

        this.rows = rows !== -1 ? rows : Math.ceil(this.expectedOrder.length / this.numberOfColumns);
    }
}

describe('groupMetadata', () => {

    describe('- no groups:', () => {
        let runs: any[] = [
            [
                'always groups elements - one per line',
                new Sample(['1', '2', '3', '4'], 1), // one column (default from service)
                [
                    new DorfInputMetadata(def, { key: '1' }),
                    new DorfInputMetadata(def, { key: '2' }),
                    new DorfInputMetadata(def, { key: '3' }),
                    new DorfInputMetadata(def, { key: '4' })
                ] // 4 elements
            ], [
                'divides into columns',
                new Sample(['1', '2', '3', '4'], 2),
                [
                    new DorfInputMetadata(def, { key: '1' }),
                    new DorfInputMetadata(def, { key: '2' }),
                    new DorfInputMetadata(def, { key: '3' }),
                    new DorfInputMetadata(def, { key: '4' })
                ]
            ]
        ];

        runs.forEach((run) => {
            it(run[0], () => {
                // GIVEN
                let sample = run[1] as Sample;
                sample.source = run[2];

                // WHEN
                let result = groupMetadata(sample.source, sample.numberOfColumns) as IDorfFieldMetadata<any>[][];

                let flattenResultKeys: string[] = [];
                for (let row of result) {
                    let flattenRow = row.map((e) => e.key);
                    flattenResultKeys = flattenResultKeys.concat(flattenRow);
                };

                // THEN
                expect(result.length).toEqual(sample.rows);
                expect(flattenResultKeys).toEqual(sample.expectedOrder);
            })
        })
    });

    describe('- transparentFlow:', () => {
        let runs: any[] = [
            [
                'adds fields in the middle without problems',
                new Sample(['1', '2', '3', '4', 'a', 'b', 'c', 'd', '6'], 3),
                (sample: Sample) => [
                    new DorfInputMetadata(def, { key: '1' }),
                    new DorfInputMetadata(def, { key: '2' }),
                    new DorfInputMetadata(def, { key: '3' }),
                    new DorfInputMetadata(def, { key: '4' }),
                    sample.nested,
                    new DorfInputMetadata(def, { key: '6' })
                ]
            ], [
                'adds fields at the end without problems',
                new Sample(['1', '2', '3', '4', '5', '6', 'a', 'b', 'c', 'd'], 3),
                (sample: Sample) => [
                    new DorfInputMetadata(def, { key: '1' }),
                    new DorfInputMetadata(def, { key: '2' }),
                    new DorfInputMetadata(def, { key: '3' }),
                    new DorfInputMetadata(def, { key: '4' }),
                    new DorfInputMetadata(def, { key: '5' }),
                    new DorfInputMetadata(def, { key: '6' }),
                    sample.nested
                ]
            ], [
                'adds fields at the beginning without problems',
                new Sample(['a', 'b', 'c', 'd', '1', '2', '3', '4', '5', '6', '7'], 3),
                (sample: Sample) => [
                    sample.nested,
                    new DorfInputMetadata(def, { key: '1' }),
                    new DorfInputMetadata(def, { key: '2' }),
                    new DorfInputMetadata(def, { key: '3' }),
                    new DorfInputMetadata(def, { key: '4' }),
                    new DorfInputMetadata(def, { key: '5' }),
                    new DorfInputMetadata(def, { key: '6' }),
                    new DorfInputMetadata(def, { key: '7' })
                ]
            ], [
                'works with 2 groups next to each other',
                new Sample(['1', 'a', 'b', 'c', 'd', 'a', 'b', 'c', 'd', '2', '3', '4', '5', '6', '7'], 3),
                (sample: Sample) => [
                    new DorfInputMetadata(def, { key: '1' }),
                    sample.nested,
                    sample.nested,
                    new DorfInputMetadata(def, { key: '2' }),
                    new DorfInputMetadata(def, { key: '3' }),
                    new DorfInputMetadata(def, { key: '4' }),
                    new DorfInputMetadata(def, { key: '5' }),
                    new DorfInputMetadata(def, { key: '6' }),
                    new DorfInputMetadata(def, { key: '7' })
                ]
            ], [
                'works with 2 groups somewhere between fields',
                new Sample(['1', 'a', 'b', 'c', 'd', '2', '3', 'a', 'b', 'c', 'd', '4', '5', '6', '7'], 3),
                (sample: Sample) => [
                    new DorfInputMetadata(def, { key: '1' }),
                    sample.nested,
                    new DorfInputMetadata(def, { key: '2' }),
                    new DorfInputMetadata(def, { key: '3' }),
                    sample.nested,
                    new DorfInputMetadata(def, { key: '4' }),
                    new DorfInputMetadata(def, { key: '5' }),
                    new DorfInputMetadata(def, { key: '6' }),
                    new DorfInputMetadata(def, { key: '7' })
                ]
            ]
        ];

        runs.forEach((run) => {
            it(run[0], () => {
                // GIVEN
                let sample = run[1] as Sample;
                sample.source = run[2](sample); // function which builds the source

                // WHEN
                let result = groupMetadata(sample.source, sample.numberOfColumns) as IDorfFieldMetadata<any>[][];

                let flattenResultKeys: string[] = [];
                for (let row of result) {
                    let flattenRow = row.map((e) => e.key);
                    flattenResultKeys = flattenResultKeys.concat(flattenRow);
                };

                // THEN
                expect(result.length).toEqual(sample.rows);
                expect(flattenResultKeys).toEqual(sample.expectedOrder);
            })
        })
    });

    describe('- not transparentFlow:', () => {
        let runs: any[] = [
            [
                'breaks a flow at a given row',
                new Sample(['1', '2', '3', '4', null, '6', '7'], 3, 4, { columnsNumber: 3 }),
                (sample: Sample) => [
                    new DorfInputMetadata(def, { key: '1' }),
                    new DorfInputMetadata(def, { key: '2' }),
                    new DorfInputMetadata(def, { key: '3' }), // end of 1st row
                    new DorfInputMetadata(def, { key: '4' }), // 2nd row
                    sample.nested,                            // 3rd row
                    new DorfInputMetadata(def, { key: '6' }),
                    new DorfInputMetadata(def, { key: '7' })  // end of 4th row (unfinished)
                ],
                2
            ], [
                'works with a transparentFlow inside',
                new Sample(['1', '2', '3', '4', 'a', 'b', 'c', 'd', '6', null, '7', '8', '9'], 2, 8),
                (sample: Sample) => {
                    let nested2 = new DorfNestedMetadata({ columnsNumber: 3 });
                    nested2.nestedFieldsMetadata = [
                        new DorfInputMetadata(def, { key: 'a' }),
                        new DorfInputMetadata(def, { key: 'b' }),
                        sample.nested,
                        new DorfInputMetadata(def, { key: 'c' }),
                        new DorfInputMetadata(def, { key: 'd' }),
                        new DorfInputMetadata(def, { key: 'e' }),
                        new DorfInputMetadata(def, { key: 'f' })
                    ] // 4 rows with 3 columns

                    return [
                        new DorfInputMetadata(def, { key: '1' }),
                        new DorfInputMetadata(def, { key: '2' }),
                        new DorfInputMetadata(def, { key: '3' }),
                        new DorfInputMetadata(def, { key: '4' }),
                        sample.nested,
                        new DorfInputMetadata(def, { key: '6' }),
                        nested2,
                        new DorfInputMetadata(def, { key: '7' }),
                        new DorfInputMetadata(def, { key: '8' }),
                        new DorfInputMetadata(def, { key: '9' })
                    ];
                },
                4
            ]
        ];

        runs.forEach((run) => {
            it(run[0], () => {
                // GIVEN
                let sample = run[1] as Sample;
                sample.source = run[2](sample); // function which builds the source

                // WHEN
                let result
                    = groupMetadata(sample.source, sample.numberOfColumns) as (IDorfFieldMetadata<any>[] | DorfNestedMetadata<any>)[];

                let breakingIndexes: number[] = [];
                let flattenResultKeys: string[] = [];
                for (let i = 0; i < result.length; ++i) {
                    let row = result[i];
                    if (row instanceof Array) {
                        flattenResultKeys = flattenResultKeys.concat(row.map((e) => e.key));
                    } else {
                        breakingIndexes.push(i);
                        flattenResultKeys.push(null);
                    }
                };

                // THEN
                expect(result.length).toEqual(sample.rows);
                expect(flattenResultKeys).toEqual(sample.expectedOrder);
                breakingIndexes.forEach((index) => {
                    let nested = result[index] as DorfNestedMetadata<any>;
                    expect(nested.isGroupingNested).toBeTruthy();

                    let resultNested
                        // tslint:disable-next-line:max-line-length
                        = groupMetadata(nested.nestedFieldsMetadata, nested.columnsNumber) as (IDorfFieldMetadata<any>[] | DorfNestedMetadata<any>)[];

                    expect(resultNested.length).toEqual(run[3]);
                });
            })
        })
    });

    it('works with nested in nested', () => {
        // GIVEN
        let sample = new Sample(['1', '2', '3', '4', null, '5'], 2, 4, { columnsNumber: 5 });

        let nested2 = new DorfNestedMetadata({ columnsNumber: 3 });
        nested2.nestedFieldsMetadata = [
            new DorfInputMetadata(def, { key: 'a' }),
            new DorfInputMetadata(def, { key: 'b' }),
            new DorfInputMetadata(def, { key: 'c' }),
            sample.nested,
            new DorfInputMetadata(def, { key: 'd' }),
            new DorfInputMetadata(def, { key: 'e' }),
            new DorfInputMetadata(def, { key: 'f' })
        ]

        sample.source = [
            new DorfInputMetadata(def, { key: '1' }),
            new DorfInputMetadata(def, { key: '2' }),
            new DorfInputMetadata(def, { key: '3' }),
            new DorfInputMetadata(def, { key: '4' }),
            nested2,
            new DorfInputMetadata(def, { key: '5' })
        ];

        // WHEN
        let result = groupMetadata(sample.source, sample.numberOfColumns) as (IDorfFieldMetadata<any>[] | DorfNestedMetadata<any>)[];

        let breakingIndexes: number[] = [];
        let flattenResultKeys: string[] = [];
        for (let i = 0; i < result.length; ++i) {
            let row = result[i];
            if (row instanceof Array) {
                flattenResultKeys = flattenResultKeys.concat(row.map((e) => e.key));
            } else {
                breakingIndexes.push(i);
                flattenResultKeys.push(null);
            }
        };

        // THEN
        expect(result.length).toEqual(sample.rows);

        expect(flattenResultKeys).toEqual(sample.expectedOrder);
        breakingIndexes.forEach((index) => {
            let nested = result[index] as DorfNestedMetadata<any>;
            expect(nested.isGroupingNested).toBeTruthy();

            let resultNested
                // tslint:disable-next-line:max-line-length
                = groupMetadata(nested.nestedFieldsMetadata, nested.columnsNumber) as (IDorfFieldMetadata<any>[] | DorfNestedMetadata<any>)[];

            expect(resultNested.length).toEqual(3);

            // TODO: nested in nested?
        });
    });
});
