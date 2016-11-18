# DORF `extras` property from the definition
This example shows how to cusomize `FieldDefinition` and how to improve existing library mechanisms.

1. `FieldDefinition` supports `extras` property which may be used for adding additional creation options. All `extras` properties will be presented directly on `FieldMetadata`.
2. For the input fields there was `placeholder` property added.
3. In order to support new property inside `DorfInputComponent` an extension of the existing one was introduced.
4. Extension has its own HTML template which is based on the original one, but supports also a `placeholder` property.
5. `PersonDetailComponent` got an improved template for switching between `custom-input` and `dorf-input`.
6. For all the definitions there was another `extras` property added - `order` field.
7. To use `order` for real ordering an extension of `DorfMapper` was introduced. Another possibility was to use this property directly inside `PersonDetailComponent`.