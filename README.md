[![npm version](https://img.shields.io/npm/v/dorf.svg)](https://www.npmjs.com/package/dorf)
## Domain Object Reactive Forms

### [wiki](https://github.com/mat3e/dorf/wiki)

Angular 2 gives a great support for creating [Reactive Forms](https://angular.io/docs/ts/latest/cookbook/dynamic-form.html), which are sometimes called also _Dynamic_ or _Model-driven Forms_.

This library is about taking _Reactive Forms_ to the next level by coupling them with _Domain Objects_.

Example | Summary
--- | ---
[Simple Form](https://plnkr.co/edit/5I5eKSuxcWnWbYjKQeTF?p=preview) | Form for creating and upading a simple _Domain Object_
[Readonly Form](https://plnkr.co/edit/a6Z4pb?p=preview) | Supporting `disabled` attribute in form

### Want to create a form field for object's property?
1. Create  `DorfFieldDefinition` which contains info about a label, validators and more for each _Domain Object_'s property you want to expose.
    ```typescript
    static get nameDefinition(): DorfInputDefinition<string> {
        return {
            label: "Name",
            validator: Validators.required,
            type: "text"
        };
    }
    ```

2. Create _Component_ which extends `AbstractDorfDetailsComponent` and uses a template similar to _dorf-details.view.html_ from the library (or even _dorf-details.view.html_ itself).
    ```typescript
    @Component({
        templateUrl: "../../node_modules/dorf/src/dorf-details.view.html"
    })
    export class ExampleComponent extends AbstractDorfDetailsComponent<ExampleModel> implements OnInit { 
        /* ... */
        constructor(config: DorfService) {
            super(config);
        }
        /* ... */
	}
    ```

3. Inside your _Component_ override `domainObject` property for returning _Domain Object_ (usually it should be an `@Input` property):
    ```typescript
    @Input() domainObject: ExampleModel
    ```

    and `ieldDefinitions` for returning _propertyName-fieldDefinition_ map for your object:
    
    ```typescript
    protected get fieldDefinitions(): PropertiesToDorfDefinitionsMap<ExampleModel> {
        return {
            "name": ExampleModel.nameDefinition
        }
    }
    ```

4. Define `onSubmit` method and ways of communication if you need.

5. You are done! Enjoy your _Reactive Form_.
