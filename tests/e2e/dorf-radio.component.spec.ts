import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { DorfConfigService } from '../../src/dorf-config.service';
import { DorfField } from '../../src/fields/base/dorf-field';
import { OptionType } from '../../src/fields/base/abstract-dorf-choose.definition';
import { DorfRadioDefinition } from '../../src/fields/dorf-radio.definition';
import { DorfRadioMetadata } from '../../src/fields/dorf-radio.metadata';
import { DorfRadioComponent } from '../../src/fields/dorf-radio.component';

describe('DorfRadioComponent', () => {

    let radioDef: DorfRadioDefinition<string>;
    let radioMeta: DorfRadioMetadata<string>;

    /**
     * System Under Test - DorfRadioComponent with the string value.
     */
    let SUT: DorfRadioComponent<string>;
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

    let fixture: ComponentFixture<DorfRadioComponent<string>>;

    beforeEach(async(() => {
        let dorfConfigServiceStub = new DorfConfigService({
            dorfFields: [{
                tag: DorfField.RADIO,
                css: {
                    htmlField: 'sut'
                }
            }]
        });

        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [DorfRadioComponent],
            providers: [{ provide: DorfConfigService, useValue: dorfConfigServiceStub }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DorfRadioComponent);

        SUT = fixture.componentInstance;

        radioDef = new DorfRadioDefinition<string>({
            optionsToSelect: opts
        });

        radioMeta = new DorfRadioMetadata<string>(radioDef, {
            key: 'tested',
            value: opts[0].key
        });

        SUT.metadata = radioMeta;

        let group: { [key: string]: FormControl } = {};
        group[radioMeta.key] = radioMeta.formControl;

        fixture.detectChanges();
    });

    it('should support defined \'optionsToSelect\'', async(() => {
        fixture.whenStable().then(() => {

            // radios
            let elements: DebugElement[] = fixture.debugElement.queryAll(By.css('input'));

            expect(elements.length).toEqual(3);
            expect(radioMeta.formControl.value).toEqual(opts[0].key);
            expect((elements[0].nativeElement as HTMLInputElement).checked).toBeTruthy();
            for (let i = 0; i < elements.length; ++i) {
                expect((elements[i].nativeElement as HTMLInputElement).getAttribute('ng-reflect-value')).toEqual(opts[i].key);
            }

            // labels
            elements = fixture.debugElement.queryAll(By.css('label'));

            expect(elements.length).toEqual(3);
            for (let i = 0; i < elements.length; ++i) {
                expect((elements[i].nativeElement as HTMLLabelElement).textContent.trim()).toEqual(opts[i].value);
            }
        });
    }));
});
