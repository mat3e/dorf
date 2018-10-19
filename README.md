[![npm version](https://img.shields.io/npm/v/dorf.svg)](https://www.npmjs.com/package/dorf) [![Build Status](https://travis-ci.org/mat3e/dorf.svg?branch=master)](https://travis-ci.org/mat3e/dorf)

# Domain Object Reactive Forms
Version 4 for Angular 5+.

I'm maintaining this library in my free time. But since my son was born in 2017, I have little to no free time :)

### Model-driven forms within the model! 
[**example**](http://embed.plnkr.co/fhEfqD/)

Angular's _Reactive Forms_ (a.k.a. _Model-driven Forms_) are great. Then, the dynamic generation of such forms is the next evolution step (sometimes called _Dynamic Forms_). This library is about taking those things to yet another level by coupling forms with _Domain Objects_.

## Want to create a form for an object?
1. Add some annotations to the object.
    ```typescript
    @DorfObject()
    export class Person {
        @DorfInput({
            label: "Name", 
            type: "text",
            validator: Validators.required, 
            errorMessage: "Name is required",
            updateModelOnChange: true
        })
        name: string;

        @DorfInput({
            label: "Surname", 
            type: "text",
            validator: Validators.required, 
            errorMessage: "Surname is required",
            updateModelOnChange: true
        })
        surname: string;
    }
    ```

2. Create a _Component_ form which implements `IDorfForm` and uses some annotations. E.g. you should pass the above object as an annotated (`@DorfObjectInput()`) property.
    ```typescript
    @DorfForm() // must be above the Component annotation!
    @Component({
        selector: "person-details"
        // no template or templateUrl = default one from DORF (!)
    })
    export class PersonDetailComponent implements IDorfForm {
        @DorfObjectInput() domainObject: Person; // has Angular's @Input() behavior as well (!)

        constructor(public config: DorfConfigService) { }

        onDorfSubmit() {
            let result = this["form"].value;
            console.log(result);
        }
    }
    ```
3. You are done! **Really!** Enjoy your _Reactive Form_.

## Detailed tutorials
* [QuickStart - part I](https://mat3e.github.io/dorf/tutorial/quickstart-1.html)
* [QuickStart - part II](https://mat3e.github.io/dorf/tutorial/quickstart-2.html)
* [[wiki] QuickStart - full](https://github.com/mat3e/dorf/wiki/QuickStart)

## Documentation
[Generated API documentation](https://mat3e.github.io/dorf/api/)

## Vision
The aim of this library is to speed up boring things like a creation of the ordinary forms and styling them. Library is not strictly connected with any CSS framework. You can just pass the classes as `DorfConfigService` parameters. 

Future plans include:

 - More tests, a nice documentation and step by step tutorial on building with DORF
 - UX improvements - aria support, styles prepared for most common libraries
 - Reactive grids. It is another boring, ordinary thing (and `onSummary` is already presented in the `field definition`)
 - Angular Material module
 - Form arrays
 - Methods for speeding up the creation of custom fields (even more)

### List of the online examples
 - [Simple example](http://embed.plnkr.co/6H2jto/)
 - [Disabled form](http://embed.plnkr.co/a6Z4pb/)
 - [New field example](http://embed.plnkr.co/q4EEDa/)
 - [General example](http://embed.plnkr.co/fhEfqD/)
