import { Input, Component } from '@angular/core';

import { DorfFieldDefinition } from './dorf-field.definition';
import { DorfFieldMetadata } from './dorf-field.metadata';
import { AbstractDorfFieldComponent } from './abstract-dorf-field.component';

/**
 * @whatItDoes Contains label information for DORF field.
 *
 * @howToUse
 * It is used within a {@link DorfFieldWrapperComponent}.
 *
 * ##Example
 * ```
 * <dorf-label></dorf-label>
 * ```
 *
 * @description
 * Label consumes full [metadata]{@link DorfFieldMetadata} to allow various customizations.
 *
 * @stable
 */
@Component({
    moduleId: `${module.id}`,
    selector: 'dorf-label',
    templateUrl: './dorf-label.component.html'
})
export class DorfFieldWrapperComponent<T, M extends DorfFieldMetadata<T, DorfFieldDefinition<T>>> extends AbstractDorfFieldComponent<T, M>{ }