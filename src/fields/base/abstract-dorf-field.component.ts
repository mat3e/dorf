import { Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { DorfFieldMetadata } from './abstract-dorf-field.metadata';
import { DorfNestedMetadata } from './dorf-nested.metadata';
import { IDorfFieldDefinition } from './abstract-dorf-field.definition';
import { IDorfCommonCssClasses, DorfCssClasses } from '../../base/dorf-css-classes';
import { DorfConfigService } from '../../dorf-config.service';

/**
 * @whatItDoes Base for each DORF field.
 *
 * @howToUse
 * Each custom field should be defined by a `Component` which extends this one.
 * Subclass shouldn't contain annotations inside, e.g. on properties or methods.
 *
 * ### Example
 *
 * ```
 * @Component({
 *   moduleId: module.id,
 *   selector: "star",
 *   styleUrls: ["star-rating.component.css"],
 *   templateUrl: "star-rating.component.html"
 * })
 * export class StarRatingComponent<T> extends AbstractDorfFieldComponent<T, StarRatingMetadata<T>> implements IStarRatingDefinition<T> {
 *
 *   constructor(config: DorfConfigService) {
 *     super(config);
 *   }
 *
 *   setValue(val: number) {
 *     this.formControl.setValue(val + 1);
 *   }
 *
 *   get max() { return this.metadata.max; }
 *
 *   get stars() { return new Array(this.max); }
 *   get value() { return this.formControl.value; }
 * }
 * ```
 *
 * @description
 * Custom DORF field, extending this class, should take care of using `metadata` inside HTML template.
 *
 * `@Component()` annotation should be set on the subclass level and then no more annotations inside
 * (e.g. no `@Input()` or `@Output()` on properties).
 * If there is no way to go without additional annotations in subclass, `metadata` should be listed directly
 * in the subclass once again, with the corresponding `@Input`s annotations.
 *
 * @stable
 */
// TODO: decorator which adds the same behavior as this class/DorfField factory method
export abstract class AbstractDorfFieldComponent<T, M extends DorfFieldMetadata<T, IDorfFieldDefinition<T>>> {
    @Input()
    metadata: M;

    constructor(public config: DorfConfigService) { }

    get key() { return this.metadata.key; }
    get label() { return this.metadata.label; }
    get htmlFieldCss() { return this.getCss('htmlField'); }
    get labelCss() { return this.getCss('label'); }

    // TODO: is there a way for `touch`? FormControl.markAsTouched is triggered on blur on elemenent with formControl directive
    get invalid() { return this.metadata.invalid; }

    get formControl() { return this.metadata.formControl; }

    protected getCss(cssClass: string) {
        let result = this.metadata.getCss(cssClass);
        if (this.metadata.isNested) {
            result = result || this.config.getCssClassForNestedTag(this.metadata.tag, cssClass);
        } else {
            result = result || this.config.getCssClassForTag(this.metadata.tag, cssClass);
        }
        return result;
    }
}
