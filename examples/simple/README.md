# DORF simple form
Example of fast form creation in DORF.

_Person_ is `DorfDomainObject` with `FieldDefinitions` assigned to all the fields. It is a good practice to couple definitions directly with the class, as in the example. Alternatively it is possible to store all the definitions inside `DetailComponent`.

In the example reactive form works for both adding and updating. Two-way communication (for and from the form) is presented in the example.