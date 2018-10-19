import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { newEvent } from '../util/events';

import { DorfConfigService } from '../../src/dorf-config.service';
import { CHECKBOX } from '../../src/fields/base/constants';
import { DorfCheckboxDefinition, IDorfCheckboxDefinition } from '../../src/fields/dorf-checkbox.definition';
import { DorfCheckboxMetadata } from '../../src/fields/dorf-checkbox.metadata';
import { DorfCheckboxComponent } from '../../src/fields/dorf-checkbox.component';

describe('DorfCheckboxComponent', () => {

    // depends on the test we have either a boolean or a number value
    let inputDef: IDorfCheckboxDefinition<boolean | number>;
    let inputMeta: DorfCheckboxMetadata<boolean | number>;

    /**
     * System Under Test - DorfCheckboxComponent.
     */
    let SUT: DorfCheckboxComponent<boolean | number>;

    let fixture: ComponentFixture<DorfCheckboxComponent<boolean | number>>;
    let debugElem: DebugElement;
    let htmlElem: HTMLInputElement;

    beforeEach(async(() => {
        let dorfConfigServiceStub = new DorfConfigService({
            dorfFields: [{
                tag: CHECKBOX,
                css: {
                    htmlField: 'sut'
                }
            }]
        });

        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [DorfCheckboxComponent],
            providers: [{ provide: DorfConfigService, useValue: dorfConfigServiceStub }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DorfCheckboxComponent) as ComponentFixture<DorfCheckboxComponent<boolean | number>>;
        SUT = fixture.componentInstance;
        changeComponent();
    });

    it('should support boolean values by default', async(() => {
        fixture.whenStable().then(() => {
            fixture.detectChanges();

            expect(htmlElem.checked).toBeTruthy();
            expect(inputMeta.formControl.value).toBeTruthy();
        });
    }));

    it('should be mapped to a defined values', async(() => {
        fixture.whenStable().then(() => {

            changeComponent({
                mapping: {
                    trueValue: 1,
                    falseValue: -1
                }
            });

            expect(htmlElem.checked).toBeTruthy();
            expect(inputMeta.formControl.value).toEqual(1);

            // WHEN
            htmlElem.focus();
            htmlElem.click();
            htmlElem.dispatchEvent(newEvent('input'));
            htmlElem.blur();

            // THEN
            expect(htmlElem.checked).toBeFalsy();
            expect(inputMeta.formControl.value).toEqual(-1);
        });
    }));

    it('should support innerLabel', async(() => {
        fixture.whenStable().then(() => {
            let innerLabel = 'inner!';
            changeComponent({
                innerLabel
            });

            expect(htmlElem.parentElement.innerText.trim()).toEqual(innerLabel);
        });
    }));

    it('should support standard label', async(() => {
        fixture.whenStable().then(() => {
            let label = 'not inner!';
            changeComponent({
                label
            });

            expect(htmlElem.parentElement.innerText.trim()).toEqual(''); // label outside test context
        });
    }));

    function changeComponent(def: IDorfCheckboxDefinition<boolean | number> = null) {
        if (def && def.mapping) {
            inputDef = new DorfCheckboxDefinition<boolean | number>(def);
            inputMeta = new DorfCheckboxMetadata<boolean | number>(inputDef, {
                key: 'tested',
                value: def.mapping.trueValue
            });
        } else {
            inputDef = new DorfCheckboxDefinition<boolean | number>(def);
            inputMeta = new DorfCheckboxMetadata<boolean | number>(inputDef, {
                key: 'tested',
                value: true
            });
        }

        SUT.metadata = inputMeta;

        let group: { [key: string]: FormControl } = {};
        group[inputMeta.key] = inputMeta.formControl;

        fixture.detectChanges();

        fixture.whenStable().then(() => {
            SUT.ngOnChanges(); // seems like ngOnInit works with detectChanges and this one doesn't
            debugElem = fixture.debugElement.query(By.css('.sut'));
            htmlElem = debugElem.nativeElement;
        });
    }
});
