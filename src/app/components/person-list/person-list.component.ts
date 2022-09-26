import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../shared/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
})

export class PersonListComponent implements OnInit {
  PeopleList: any = [];

  ngOnInit() {
    this.loadEmployees();
  }

  constructor(public personService: PersonService) {}

  // Issues list
  loadEmployees() {
    return this.personService.GetPeople().subscribe((data: {}) => {
      this.PeopleList = data;
    });
  }

  // Delete issue
  deleteIusse(data) {
    var index = (index = this.PeopleList.map((x) => {
      return x.firstName;
    }).indexOf(data.firstName));
    return this.personService.DeletePerson(data.id).subscribe((res) => {
      this.PeopleList.splice(index, 1);
      console.log('Person deleted!');
    });
  }
}
