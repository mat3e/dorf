import { DorfService } from "../dorf.service";
import { DorfConfigService } from "../dorf.service";

describe("DorfService", () => {
    it("should have default values for isButtonVisible and isDisabled", () => {
        // GIVEN + WHEN
        let service = new DorfService();

        // THEN
        expect(service.isDisabled).toBeFalsy();
        expect(service.isButtonVisible).toBeTruthy();
    });

    it("should get values from the provided config", () => {
        // GIVEN + WHEN
        let name = "class";
        let i = 1;

        let service = new DorfService({
            formClass: `${name}${i++}`,
            errorClass: `${name}${i++}`,
            fieldClass: `${name}${i++}`,
            labelClass: `${name}${i++}`,
            groupingClass: `${name}${i++}`
        });

        i = 1;

        // THEN
        expect(service.formClass).toEqual(`${name}${i++}`);
        expect(service.errorClass).toEqual(`${name}${i++}`);
        expect(service.fieldClass).toEqual(`${name}${i++}`);
        expect(service.labelClass).toEqual(`${name}${i++}`);
        expect(service.groupingClass).toEqual(`${name}${i++}`);

        expect(service.isDisabled).toBeFalsy();
        expect(service.isButtonVisible).toBeTruthy();
    });
});