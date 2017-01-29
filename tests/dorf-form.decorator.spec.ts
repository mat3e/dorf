import { DorfConfigService } from "../src/dorf-config.service";
import { DorfForm } from "../src/decorators/dorf-form.decorator";

describe("DorfForm", () => {
    it("returns component with DORF properties and expects DorfObject as a one of the properties", () => {
        // GIVEN
        class TestClass {
            config = new DorfConfigService();
            constructor(private prop1: string, private prop2: number) {
            }
        }

        // WHEN
        DorfForm()(TestClass);

        // THEN
        let result = new TestClass("value1", 2);

        expect(result.config).toBeDefined();
        expect((result as any).prop1).toEqual("value1");
        expect((result as any).prop2).toEqual(2);

        expect((result as any).onSubmit).toBeDefined();
        expect((result as any).validator).toBeDefined();
        expect((result as any).ngOnChanges).toBeDefined();

        expect((result as any).mapper).toBeDefined();

        // defined during ngOnChanges execution
        expect((result as any).form).toBeUndefined();
        expect((result as any).fieldsMetadata).toBeUndefined();

        expect((result as any).ngOnChanges).toThrowError("DorfForm has to contain DorfObject annotated as @DorfObjectInput()");
    });
});