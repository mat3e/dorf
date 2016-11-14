# DORF simple form
Example of fast form creation in DORF.

**Note:** to run this example you need to include package.json in this directory and add a dorf dependency. It will be improved with the next patches.

Person is DorfDomainObject with definitions assigned to all the fields. It is a good practice to couple definitions directly with the class, as in the example. Alternatively it is possible to store all the definitions inside DetailComponent.

In the example DorfForm works for both adding and updating, thanks to the usage of ngOnInit and ngOnChanges hooks. Two-way communication (for and from the form) is shown in the example.