# DORF - new field supprot
It is possible to extend a list of possible fields. In this example there is a totally new `FieldComponent` - _Star Rating_.

1. Before specifing `FieldComponent` we need to specify `FieldDefinition` and `FieldMetadata`.
2. Moreover, it is needed to create an interface and use it at least as a constructor parameter for a new `FieldDefinition`. It's even better to implement this interface in all field-related classes.
3. Remember to extend existing library stuff and always call a`super` constructor.
4. Be careful with HTML template for a new component.
5. Register a new field under `dorfFields` when importing `DorfModule`.