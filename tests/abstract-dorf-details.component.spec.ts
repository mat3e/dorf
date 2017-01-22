import { FormControl } from "@angular/forms";

import { DorfConfigService } from "../src/dorf-config.service";
import { DorfFieldMetadata } from "../src/fields/abstract-dorf-field.component";
import { PropertiesToDorfDefinitionsMap, DorfMapper } from "../src/dorf-mapper";
import { DorfInputDefinition, DorfInputMetadata } from "../src/fields/dorf-input.component";

import { AbstractDorfFormComponent } from "../src/abstract-dorf-form.component";

describe("AbstractDorfFormComponent", () => {

    class TestSpies {
        formControls: jasmine.Spy[];
        metadataElements: jasmine.Spy[];
        mapper: jasmine.Spy;

        constructor() {
            this.formControls = [];
            this.metadataElements = [];
        }
    }
    let spies = new TestSpies();

    class TestMocks {
        service: DorfConfigService;
        formControls: FormControl[];
        metadataElements: DorfFieldMetadata<any, any>[];
        mapper: DorfMapper;

        constructor() {
            this.service = new DorfConfigService();
            this.service.isDisabled = true;

            this.formControls = [];
            this.metadataElements = [];
            this.mapper = new DorfMapper(this.service);
        }
    }
    let mocks = new TestMocks();

    /**
     * Class for tests.
     */
    class TestDomainObject {
        private id = 999;
        private name = "test";
    }
    let domObj: TestDomainObject;

    let propertiesNum = 0;

    let fakeDefinitions: PropertiesToDorfDefinitionsMap<TestDomainObject> = {};

    beforeEach(() => {
        domObj = new TestDomainObject();

        for (let prop in domObj) {
            mocks.formControls[propertiesNum] = new FormControl();
            mocks.metadataElements[propertiesNum] = new DorfInputMetadata(new DorfInputDefinition<any>(), { key: prop });

            spies.formControls[propertiesNum] = spyOn(mocks.formControls[propertiesNum], "disable").and.stub();
            spies.metadataElements[propertiesNum] = spyOn(mocks.metadataElements[propertiesNum], "extractFormControl").and.returnValue(mocks.formControls[propertiesNum]);

            ++propertiesNum;
        }

        spies.mapper = spyOn(mocks.mapper, "mapObjectWithDefinitionsToFieldsMetadata").and.returnValue(mocks.metadataElements);
    })

    /**
     * AbstractDorfFormComponent has to be extended somehow.
     */
    class TestDetailComponent extends AbstractDorfFormComponent<TestDomainObject> {
        // @Override
        domainObject: TestDomainObject;

        // @Override
        protected get fieldDefinitions(): PropertiesToDorfDefinitionsMap<TestDomainObject> {
            return fakeDefinitions;
        }

        constructor() {
            super(mocks.service, mocks.mapper);
        }
    }

    it("inits form metadata and applies configurations to the form", () => {
        // GIVEN
        let SUT = new TestDetailComponent();
        SUT.domainObject = domObj;

        // WHEN
        SUT.ngOnChanges();

        // THEN
        // definitions were mapped
        expect(spies.mapper).toHaveBeenCalledTimes(1);
        expect(spies.mapper.calls.argsFor(0)[0]).toBe(domObj);
        expect(spies.mapper.calls.argsFor(0)[1]).toBe(fakeDefinitions);
        expect(SUT.fieldsMetadata).toBe(mocks.metadataElements);

        // each property has its metadata which has its form control
        expect(mocks.metadataElements.length).toEqual(propertiesNum);
        expect(mocks.formControls.length).toEqual(propertiesNum);
        for (let i = 0; i < propertiesNum; ++i) {
            expect(spies.metadataElements[i]).toHaveBeenCalledTimes(1);
            expect(spies.formControls[i]).toHaveBeenCalledTimes(1);
        }

        // and a group of those controls is created
        expect(SUT.form).toBeDefined();
        for (let i = 0; i < propertiesNum; ++i) {
            expect(SUT.form.get(mocks.metadataElements[i].key)).toBe(mocks.formControls[i]);
        }
    });
});