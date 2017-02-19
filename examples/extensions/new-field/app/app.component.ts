import { Component } from '@angular/core';
import { IPerson, Person } from './person/model';

@Component({
    selector: 'my-app',
    template: `
    <h2>Person in form: {{activeIndex >= 0 ? activePerson.fullname : "new person"}}</h2>
    <person-details [domainObject]="activePerson" (createUpdate)=onCreateUpdate($event)>
        <hr/>
    </person-details>
    <hr/>
    <table class="pure-table pure-table-striped">
    <tbody>
        <tr *ngFor="let p of people; let i = index;">
            <td>{{p.fullname}}</td><td><button (click)=onClick(i)>edit</button></td>
        </tr>
    </tbody>
    </table>
    `
})
export class AppComponent {
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
