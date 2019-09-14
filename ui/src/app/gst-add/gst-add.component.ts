import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { BusinessService } from '../business.service';

@Component({
  selector: 'app-gst-add',
  templateUrl: './gst-add.component.html',
  styleUrls: ['./gst-add.component.css']
})
export class GstAddComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private bs: BusinessService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      reference: ['', Validators.required ],
      account_no: ['', Validators.required ],
      description: ['', Validators.required ],
      start_bal: [''],
      mutation: [''],
      end_bal: ['', Validators.required]
    });
  }

  addBusiness(reference, account_no, description, start_bal,mutation,end_bal ) {
    this.bs.addBusiness(reference, account_no, description, start_bal,mutation, end_bal);
  }

  ngOnInit() {
  }

}
