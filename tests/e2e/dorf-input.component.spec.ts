import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { newEvent } from '../util/events';

import { DorfConfigService } from '../../src/dorf-config.service';
import { DorfField } from '../../src/fields/base/dorf-field';
import { InputType, DorfInputDefinition } from '../../src/fields/dorf-input.definition';
import { DorfInputMetadata } from '../../src/fields/dorf-input.metadata';
import { DorfInputComponent } from '../../src/fields/dorf-input.component';

describe('DorfInputComponent', () => {

    let inputDef: DorfInputDefinition<number>;
    let inputMeta: DorfInputMetadata<number>;

    /**
     * System Under Test - DorfInputComponent with the numeric value.
     */
    let SUT: DorfInputComponent<number>;
    let type = 'number' as InputType;
    let initial = 7;
    let errorMsg = 'Field is required!';
    let setterStub: jasmine.Spy;

    let fixture: ComponentFixture<DorfInputComponent<number>>;
    let debugElem: DebugElement;
    let htmlElem: HTMLInputElement;

    beforeEach(async(() => {
        let dorfConfigServiceStub = new DorfConfigService({
            dorfFields: [{
                tag: DorfField.INPUT,
                css: {
                    htmlField: 'sut',
                    error: 'error'
                }
            }]
        });

        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [DorfInputComponent],
            providers: [{ provide: DorfConfigService, useValue: dorfConfigServiceStub }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DorfInputComponent);

        SUT = fixture.componentInstance;

        inputDef = new DorfInputDefinition<number>({
            // first test
            type,

            // second test
            validator: Validators.required,
            errorMessage: errorMsg,

            // third test
            updateModelOnChange: true
        });

        setterStub = jasmine.createSpy('setterStub');

        inputMeta = new DorfInputMetadata<number>(inputDef, {
            key: 'tested',

            // second test
            value: initial,

            // third test
            setDomainObjValue: setterStub
        });

        SUT.metadata = inputMeta;

        let group: { [key: string]: FormControl } = {};
        group[inputMeta.key] = inputMeta.formControl;

        fixture.detectChanges();

        fixture.whenStable().then(() => {
            debugElem = fixture.debugElement.query(By.css('.sut'));
            htmlElem = debugElem.nativeElement;
        });
    });

    it('should take care about a value type', async(() => {
        fixture.whenStable().then(() => {

            expect(htmlElem.type).toBe(type);
            expect(htmlElem.valueAsNumber).toBe(initial);
            expect(inputMeta.formControl.value).toBe(initial);

            // WHEN
            // trying to spoil the value
            htmlElem.value = 'wrong value';
            htmlElem.dispatchEvent(newEvent('input'));
            fixture.detectChanges();

            // THEN
            // nothing (null) set
            expect(inputMeta.formControl.value).toBeNull();

            // WHEN
            // proper value
            htmlElem.valueAsNumber = 8;
            htmlElem.dispatchEvent(newEvent('input'));
            fixture.detectChanges();

            // THEN
            expect(inputMeta.formControl.value).toBe(8);
        });
    }));

    it('should support "required" validator', async(() => {
        fixture.whenStable().then(() => {

            // WHEN
            // trying to spoil the value
            htmlElem.focus();
            htmlElem.value = null;
            htmlElem.dispatchEvent(newEvent('input'));
            htmlElem.blur();

            // THEN
            fixture.detectChanges();
            expect(inputMeta.formControl.valid).toBeFalsy();
        });
    }));

    it('should support "updateModelOnChange"', () => {
        fixture.whenStable().then(() => {

            // WHEN
            // proper value
            htmlElem.focus();
            htmlElem.valueAsNumber = 8;
            htmlElem.dispatchEvent(newEvent('input'));
            htmlElem.blur();

            // THEN
            fixture.detectChanges();
            expect(setterStub).toHaveBeenCalled();
            expect(setterStub.calls.count()).toEqual(1);
        });
    });
});
