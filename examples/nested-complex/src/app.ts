import { Component, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import {
    DorfModule,
    DorfField
} from 'dorf'

import { IPerson, Person } from './person/model'
import { PersonDetailComponent } from './person/person-detail.component'

@Component({
    selector: 'my-app',
    template: `
    <h2>Person in form: {{activeIndex >= 0 ? activePerson.fullname : "new person"}}</h2>
    <person-details [domainObject]="activePerson" (createUpdate)=onCreateUpdate($event)></person-details>
    <hr/>
    <table class="table table-striped">
    <tbody>
        <tr *ngFor="let p of people; let i = index;">
            <td>{{p.fullname}}</td><td><button (click)=onClick(i)>edit</button></td>
        </tr>
    </tbody>
    </table>
    `
})
export class App {
    activeIndex = -1;
    activePerson = new Person();

    people: Person[] = [];

    onClick(index: number) {
        this.activeIndex = index;
        this.activePerson = this.people[index];
    }

    onCreateUpdate(person: IPerson) {
        this.activeIndex >= 0 ? this.people[this.activeIndex] = new Person(person)
            : this.people.push(new Person(person));

        this.reset();
    }

    private reset() {
        this.activeIndex = -1;
        this.activePerson = new Person();
    }
}

@NgModule({
    imports: [
        BrowserModule,

        DorfModule.forRoot({
            css: {
                //section: 'row',
                group: 'form-group row',
                label: 'col-2 col-form-label',
                field: 'form-control', // div around should have col-10; probably dorf-field
                error: 'form-control-feedback',
                buttons: {
                    save: 'btn btn-primary',
                    reset: 'hidden'
                }
            },
            dorfFields: [{
                tag: DorfField.CHECKBOX,
                css: {
                    group: 'form-check',
                    innerLabel: 'form-check-label',
                    field: 'form-check-input'
                }
            }, {
                tag: DorfField.RADIO,
                css: {
                    group: 'form-check form-check-inline row',
                    field: 'form-check-input',
                    innerLabel: 'form-check-label'
                }
            }]
        })
    ],
    declarations: [
        App,
        PersonDetailComponent
    ],
    bootstrap: [App]
})
export class AppModule { }