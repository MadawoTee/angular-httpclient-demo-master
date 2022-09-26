import { Component, OnInit, NgZone } from '@angular/core';
import { PersonService } from '../../shared/person.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css'],
})
export class EditPersonComponent implements OnInit {
  PeopleList: any = [];
  updatePersonForm: FormGroup;

  ngOnInit() {
    this.updateForm();
  }

  constructor(
    private actRoute: ActivatedRoute,
    public personService: PersonService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.personService.GetPerson(id).subscribe((data) => {
      this.updatePersonForm = this.fb.group({
        issue_name: [data.firstName],
        issue_message: [data.lastName],
      });
    });
  }

  updateForm() {
    this.updatePersonForm = this.fb.group({
      issue_name: [''],
      issue_message: [''],
    });
  }

  submitForm() {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.personService
      .UpdatePerson(id, this.updatePersonForm.value)
      .subscribe((res) => {
        this.ngZone.run(() => this.router.navigateByUrl('/person-list'));
      });
  }
}
