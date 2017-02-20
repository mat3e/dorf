import { DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { Person1, Person2, Person1DetailComponent, Person2DetailComponent } from '../util/classes'

import { DorfButtonsComponent } from '../../src/base/dorf-buttons.component';
import { DorfFieldWrapperComponent } from '../../src/fields/base/dorf-field-wrapper.component';
import { DorfCheckboxComponent } from '../../src/fields/dorf-checkbox.component';
import { DorfSelectComponent } from '../../src/fields/dorf-select.component';
import { DorfRadioComponent } from '../../src/fields/dorf-radio.component';
import { DorfInputComponent } from '../../src/fields/dorf-input.component';
import { DorfMapper } from '../../src/base/dorf-mapper';

import { DorfConfigService, DorfSupportingService } from '../../src/dorf-config.service';

import { DorfForm } from '../../src/decorators/dorf-form.decorator';

// TODO: tests for custom config and mapper, test for fieldDefinitions from 2 sources
describe('DorfForm', () => {

    let SUT1: Person1DetailComponent;
    let SUT2: Person2DetailComponent;

    let fixture1: ComponentFixture<Person1DetailComponent>;
    let fixture2: ComponentFixture<Person2DetailComponent>;
    let debugElem1: DebugElement;
    let debugElem2: DebugElement;
    let htmlElem1: HTMLInputElement;
    let htmlElem2: HTMLInputElement;

    beforeEach(async(() => {
        let dorfConfigService = new DorfConfigService(new DorfSupportingService({
            css: { form: 'sut' }
        }));

        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [
                DorfFieldWrapperComponent,
                DorfInputComponent,
                DorfSelectComponent,
                DorfRadioComponent,
                DorfCheckboxComponent,
                DorfButtonsComponent,
                Person1DetailComponent,
                Person2DetailComponent
            ],
            providers: [{ provide: DorfConfigService, useValue: dorfConfigService }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture1 = TestBed.createComponent(Person1DetailComponent);
        fixture2 = TestBed.createComponent(Person2DetailComponent);

        SUT1 = fixture1.componentInstance;
        SUT2 = fixture2.componentInstance;
        SUT1.domainObject = new Person1();
        SUT2.domainObject = new Person2();

        // bindings
        fixture1.detectChanges();
        fixture1.whenStable().then(() => {

            debugElem1 = fixture1.debugElement.query(By.css('.sut'));
            htmlElem1 = debugElem1.nativeElement;
            (SUT1 as any).ngOnChanges();
        });
        fixture2.detectChanges();
        fixture2.whenStable().then(() => {

            debugElem2 = fixture2.debugElement.query(By.css('.sut'));
            htmlElem2 = debugElem2.nativeElement;
            (SUT2 as any).ngOnChanges();
        });
    });

    it('returns component with DORF properties for plain old DorfDomainObject', async(() => {
        fixture1.whenStable().then(() => {

            expect(SUT1.domainObject).toBeDefined();
            expect((SUT1 as any).dorfObjectInForm).toBeDefined();
            expect((SUT1 as any).dorfObjectInForm).toEqual('domainObject');
            expect(SUT1[(SUT1 as any).dorfObjectInForm]).toBe(SUT1.domainObject);

            expect(SUT1.config).toBeDefined()
            expect(SUT1.config.css.form).toEqual('sut');

            expect((SUT1 as any).mapper).toBeDefined();
            expect((SUT1 as any).mapper instanceof DorfMapper).toBeTruthy();

            expect((SUT1 as any).validator).toBeDefined();
            expect((SUT1 as any).validator).toEqual(Validators.nullValidator);

            expect((SUT1 as any).fieldsMetadata).toBeDefined();
            expect((SUT1 as any).fieldsMetadata.length).toEqual(2);

            expect((SUT1 as any).form).toBeDefined();
            expect(Object.keys((SUT1 as any).form.controls).length).toEqual(2);

            expect((SUT1 as any).ngOnChanges).toBeDefined();

            expect((Reflect as any).getMetadata('annotations', SUT1.constructor).length).toEqual(1);
            expect((Reflect as any).getMetadata('annotations', SUT1.constructor)[0].template).toBeDefined();

            // template
            fixture1.detectChanges();
            fixture1.whenStable().then(() => {
                let inputs = debugElem1.queryAll(By.css('input'));
                expect(inputs.length).toEqual(2);
            });
        });
    }));

    it('returns component with DORF properties for @DorfObject()', async(() => {
        fixture2.whenStable().then(() => {

            expect(SUT2.domainObject).toBeDefined();
            expect((SUT2 as any).dorfObjectInForm).toBeDefined();
            expect((SUT2 as any).dorfObjectInForm).toEqual('domainObject');
            expect(SUT2[(SUT2 as any).dorfObjectInForm]).toBe(SUT2.domainObject);

            expect(SUT2.config).toBeDefined()
            expect(SUT2.config.css.form).toEqual('sut');

            expect((SUT2 as any).mapper).toBeDefined();
            expect((SUT2 as any).mapper instanceof DorfMapper).toBeTruthy();

            expect((SUT2 as any).validator).toBeDefined();
            expect((SUT2 as any).validator).toEqual(Validators.nullValidator);

            expect((SUT2 as any)._fieldsMetadata).toBeDefined();
            expect((SUT2 as any)._fieldsMetadata.length).toEqual(2);
            expect((SUT2 as any)._multipleFieldsInSection).toBeTruthy();
            expect((SUT2 as any)._dividedFieldsMetadata).toBeDefined();
            expect((SUT2 as any)._dividedFieldsMetadata.length).toEqual(1);
            expect((SUT2 as any).fieldsMetadata.length).toEqual(1);

            expect((SUT2 as any).form).toBeDefined();
            expect(Object.keys((SUT2 as any).form.controls).length).toEqual(2);

            expect((SUT2 as any).ngOnChanges).toBeDefined();

            expect((Reflect as any).getMetadata('annotations', SUT2.constructor).length).toEqual(1);
            expect((Reflect as any).getMetadata('annotations', SUT2.constructor)[0].template).toBeDefined();

            // template
            fixture2.detectChanges();
            fixture2.whenStable().then(() => {
                let inputs = debugElem2.queryAll(By.css('input'));
                expect(inputs.length).toEqual(2);
            });
        });
    }));

    it('uses methods defined in form component', async(() => {
        // GIVEN
        let resetSpy = spyOn(SUT1, 'onDorfReset').and.callThrough();
        let submitSpy = spyOn(SUT1, 'onDorfSubmit').and.callThrough();

        // template
        fixture1.detectChanges();
        fixture1.whenStable().then(() => {
            let buttons = debugElem1.queryAll(By.css('button'));
            expect(buttons.length).toEqual(2);

            // WHEN
            buttons[0].triggerEventHandler('click', null);
            buttons[1].triggerEventHandler('click', null);

            // THEN
            expect(resetSpy).toHaveBeenCalledTimes(1);
            expect(submitSpy).toHaveBeenCalledTimes(1);
        });
    }));
});
