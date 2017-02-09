import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { newEvent } from '../util/events';

import { DorfConfigService } from '../../src/dorf-config.service';
import {
    ICheckboxMapping,
    DorfCheckboxDefinition,
    DorfCheckboxMetadata,
    DorfCheckboxComponent
} from '../../src/fields/dorf-checkbox.component';

describe('DorfCheckboxComponent', () => {

    // depends on the test we have either a boolean or a number value
    let inputDef: DorfCheckboxDefinition<boolean | number>;
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
            css: { checkbox: { field: 'sut' } }
        });

        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [DorfCheckboxComponent],
            providers: [{ provide: DorfConfigService, useValue: dorfConfigServiceStub }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DorfCheckboxComponent);
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
                trueValue: 1,
                falseValue: -1
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

    function changeComponent(mapping: ICheckboxMapping<boolean | number> = null) {
        if (mapping) {
            inputDef = new DorfCheckboxDefinition<boolean | number>({
                mapping
            });
            inputMeta = new DorfCheckboxMetadata<boolean | number>(inputDef, {
                key: 'tested',
                value: mapping.trueValue
            });
        } else {
            inputDef = new DorfCheckboxDefinition<boolean | number>();
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
