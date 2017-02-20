import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { DorfConfigService } from '../../src/dorf-config.service';
import { DorfField } from '../../src/fields/base/dorf-field';
import { OptionType } from '../../src/fields/base/dorf-choose.definition';
import { DorfSelectDefinition } from '../../src/fields/dorf-select.definition';
import { DorfSelectMetadata } from '../../src/fields/dorf-select.metadata';
import { DorfSelectComponent } from '../../src/fields/dorf-select.component';

describe('DorfSelectComponent', () => {

    // we need a string array, but it is build out of string options
    let selectDef: DorfSelectDefinition<string>;
    let selectMeta: DorfSelectMetadata<any>;

    /**
     * System Under Test - DorfSelectComponent with multiple string values.
     */
    let SUT: DorfSelectComponent<string[]>;
    let opts: OptionType<string>[] = [{
        key: 'http://9gag.com',
        value: '9gag'
    }, {
        key: 'http://thecodinglove.com/',
        value: 'the_coding_love();'
    }, {
        key: 'https://github.com/',
        value: 'GitHub'
    }];

    let fixture: ComponentFixture<DorfSelectComponent<string[]>>;
    let debugElem: DebugElement;
    let htmlElem: HTMLSelectElement;

    beforeEach(async(() => {
        let dorfConfigServiceStub = new DorfConfigService({
            dorfFields: [{
                tag: DorfField.SELECT,
                css: {
                    field: 'sut'
                }
            }]
        });

        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [DorfSelectComponent],
            providers: [{ provide: DorfConfigService, useValue: dorfConfigServiceStub }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DorfSelectComponent);

        SUT = fixture.componentInstance;

        selectDef = new DorfSelectDefinition<string>({
            optionsToSelect: opts,
            multiple: true
        });

        selectMeta = new DorfSelectMetadata<any>(selectDef, {
            key: 'tested',
            value: [opts[0].key]
        });

        SUT.metadata = selectMeta;

        let group: { [key: string]: FormControl } = {};
        group[selectMeta.key] = selectMeta.formControl;

        fixture.detectChanges();

        fixture.whenStable().then(() => {
            debugElem = fixture.debugElement.query(By.css('.sut'));
            htmlElem = debugElem.nativeElement;
        });
    });

    it('should support defined \'optionsToSelect\'', async(() => {
        fixture.whenStable().then(() => {

            let elements: DebugElement[] = fixture.debugElement.queryAll(By.css('option'));

            expect(elements.length).toEqual(3);
            expect((elements[0].nativeElement as HTMLOptionElement).selected).toBeTruthy();
            for (let i = 0; i < elements.length; ++i) {
                let option = elements[i].nativeElement as HTMLOptionElement;
                expect(option.value).toContain(opts[i].key); // multiple, so it will be 'i: opts[i].key'
                expect(option.textContent.trim()).toEqual(opts[i].value);
            }
        });
    }));

    it('should support \'multiple\' option', async(() => {
        fixture.whenStable().then(() => {
            expect(htmlElem.multiple).toBeTruthy();
        });
    }));
});
