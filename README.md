[![npm version](https://img.shields.io/npm/v/dorf.svg)](https://www.npmjs.com/package/dorf)

## Domain Object Reactive Forms

Angular's [Reactive Forms](https://angular.io/docs/ts/latest/cookbook/dynamic-form.html) (a.k.a. _Dynamic_ or _Model-driven Forms_) are great.

This library is about taking them to the next level by coupling with _Domain Objects_.

#### [Live example](https://embed.plnkr.co/6H2jto/)

### Want to create a form for an object?
1. Add some annotations to the object.
    ```typescript
    @DorfObject()
    export class Person {
        @DorfInput<string>({
            label: "Name", 
            type: "text",
            validator: Validators.required, 
            errorMessage: "Name is required",
            updateModelOnChange: true
        })
        name: string;

        @DorfInput<string>({
            label: "Surname", 
            type: "text",
            validator: Validators.required, 
            errorMessage: "Surname is required",
            updateModelOnChange: true
        })
        surname: string;
    }
    ```

2. Create a _Component_ form which implements `IDorfForm` and uses some annotations. E.g. you should pass the above object as an annotated (`@DorfObjectInputWrapper()`) property.
    ```typescript
    @DorfForm() // must be above the Component annotation!
    @Component({
        moduleId: module.id,
        selector: "person-details"
        // no template or templateUrl = default one from DORF
    })
    export class PersonDetailComponent implements IDorfForm {
        @DorfObjectInputWrapper() domainObject: Person; // has Angular's @Input() behavior as well!

        constructor(public config: DorfConfigService) { }

        onSubmit() {
            let result = this["form"].value;
            console.log(result);
        }
    }
    ```
3. You are done! **Really!** Enjoy your _Reactive Form_.

### Vision
The aim of this library is to speed up boring things like a creation of the ordinary forms and styling them. Library is not strictly connected with any CSS framework. You can just pass the classes as `DorfConfigService` parameters. 

Future plans include:

 - More examples (many of them already in the repository), more online examples, more tests and a nicer documentation
 - CSS closer to the field definitions (e.g. a possibility to have a different class for `select` and for the `input`)
 - Material Design (either testing with [a css library](http://materializecss.com/getting-started.html) or connecting with [an official Angular's library](https://material.angular.io/))
 - Reactive grids. _Seriously?_ Who knows, it is another boring, ordinary things (and `isListField` is already presented in the `field definition` ;))
