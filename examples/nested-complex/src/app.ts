import { Component, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { DorfField, DorfModule } from 'dorf'

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
            <td>{{p.fullname}}</td><td><button (click)=onClick(i) class="btn btn-secondary">edit</button></td>
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
                section: 'row',
                wrapper: 'form-group col-6 row',
                label: 'col-2 col-form-label',
                fieldGeneralization: 'col-10',
                htmlField: 'form-control',
                error: 'form-control-feedback',
                buttons: {
                    save: 'btn btn-primary',
                    reset: 'hidden'
                }
            },
            dorfFields: [{
                tag: DorfField.CHECKBOX,
                css: {
                    dorfField: 'form-check',
                    innerLabel: 'form-check-label',
                    htmlField: 'form-check-input'
                }
            }, {
                tag: DorfField.RADIO,
                css: {
                    dorfField: 'form-check',
                    innerLabel: 'form-check-label form-check-inline',
                    htmlField: 'form-check-input'
                }
            }, {
                tag: DorfField.NESTED,
                css: {
                    wrapper: 'form-group col-4 row'
                }
            }],
            columnsNumber: 2
        })
    ],
    declarations: [
        App,
        PersonDetailComponent
    ],
    bootstrap: [App]
})
export class AppModule { }