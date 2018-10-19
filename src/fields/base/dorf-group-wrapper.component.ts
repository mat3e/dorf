import { Component, Input, OnChanges } from '@angular/core';

import { DorfConfigService } from '../../dorf-config.service';

import { groupMetadata } from './util';
import { IDorfFieldMetadata } from './abstract-dorf-field.metadata';
import { DorfNestedMetadata } from './dorf-nested.metadata';

/**
 * Group - nested DORF object in practice.
 *
 * @stable
 */
// TODO: reconsider using DorfForm annotation here
@Component({
    selector: 'dorf-group-wrapper',
    template: `
    <fieldset [ngClass]="fieldsetCss">
        <label [ngClass]="legendCss">{{meta.label}}</label>
        <ng-container *ngFor="let group of groupedFieldsMetadata">
            <section *ngIf="!group.isGroupingNested" [ngClass]="sectionCss">
                <dorf-field-wrapper *ngFor="let fm of group" [metadata]="fm" [ngClass]="fm.getCss('wrapper') || config.getCssClassForNestedTag(fm.tag, 'wrapper')">
                </dorf-field-wrapper>
            </section>
            <dorf-group-wrapper *ngIf="group.isGroupingNested" [group]="group"></dorf-group-wrapper>
        </ng-container>
    </fieldset>
    `
})
export class DorfGroupWrapperComponent<T> implements OnChanges {
    /**
     * Differs from standard DORF field - {@link DorfNestedMetadata} is needed here.
     */
    @Input('group')
    meta: DorfNestedMetadata<any>;

    groupedFieldsMetadata: (IDorfFieldMetadata<any>[] | DorfNestedMetadata<any>)[];

    constructor(public config: DorfConfigService) { }

    ngOnChanges(): void {
        this.groupedFieldsMetadata = groupMetadata(this.meta.nestedFieldsMetadata, this.meta.columnsNumber || this.config.columnsNumber)
    }

    get fieldsetCss() { return this.getCss('fieldset'); }
    get legendCss() { return this.getCss('legend'); }
    get sectionCss() { return this.getCss('section'); }

    protected getCss(cssClass: string) {
        let result = this.meta.getCss(cssClass);
        if (this.meta.parentCss) {
            result = result || this.config.getCssClassForNestedTag(this.meta.tag, cssClass);
        } else {
            result = result || this.config.getCssClassForTag(this.meta.tag, cssClass);
        }
        return result;
    }
}
