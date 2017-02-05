import { DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { Person1, Person2, Person1DetailComponent, Person2DetailComponent } from '../util/classes'

import { DorfCheckboxComponent } from '../../src/fields/dorf-checkbox.component';
import { DorfSelectComponent } from '../../src/fields/dorf-select.component';
import { DorfRadioComponent } from '../../src/fields/dorf-radio.component';
import { DorfInputComponent } from '../../src/fields/dorf-input.component';
import { DorfMapper } from '../../src/dorf-mapper';

import { DorfConfigService } from '../../src/dorf-config.service';

import { DorfForm } from '../../src/decorators/dorf-form.decorator';

// TODO: tests for custom properties from IDorfForm
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
        let dorfConfigService = new DorfConfigService({
            css: { general: { form: 'sut' } }
        });

        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [
                DorfInputComponent,
                DorfSelectComponent,
                DorfRadioComponent,
                DorfCheckboxComponent,
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
            expect(SUT1.config.css.general.form).toEqual('sut');

            expect((SUT1 as any).mapper).toBeDefined();
            expect((SUT1 as any).mapper instanceof DorfMapper).toBeTruthy();

            expect((SUT1 as any).validator).toBeDefined();
            expect((SUT1 as any).validator).toEqual(Validators.nullValidator);

            expect((SUT1 as any).fieldsMetadata).toBeDefined();
            expect(Object.keys((SUT1 as any).fieldsMetadata).length).toEqual(2);

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
            expect(SUT2.config.css.general.form).toEqual('sut');

            expect((SUT2 as any).mapper).toBeDefined();
            expect((SUT2 as any).mapper instanceof DorfMapper).toBeTruthy();

            expect((SUT2 as any).validator).toBeDefined();
            expect((SUT2 as any).validator).toEqual(Validators.nullValidator);

            expect((SUT2 as any).fieldsMetadata).toBeDefined();
            expect(Object.keys((SUT2 as any).fieldsMetadata).length).toEqual(2);

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
});
