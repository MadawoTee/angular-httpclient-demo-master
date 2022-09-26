import { Component, OnInit, NgZone } from '@angular/core';
import { PersonService } from '../../shared/person.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css'],
})

export class AddPersonComponent implements OnInit {
  personForm: FormGroup;
  PersonArr: any = [];

  ngOnInit() {
    this.addPerson();
  }

  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    public personService: PersonService
  ) {}

  addPerson() {
    this.personForm = this.fb.group({
      issue_name: [''],
      issue_message: [''],
    });
  }

  submitForm() {
    this.personService.CreatePerson(this.personForm.value).subscribe((res) => {
      console.log('Person added!');
      this.ngZone.run(() => this.router.navigateByUrl('/person-list'));
    });
  }
}
