import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  email = new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.emailRegx)]);
  tofAccepted = new FormControl(false, Validators.required);
  accepted = false;
  registrationForm = new FormGroup({
    email: this.email,
    tofAccepted: this.tofAccepted
  });
  @ViewChild('atofDialog') callAtofDialog!: TemplateRef<any>;

  constructor(
    public atofDialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  openAcceptTermsOfReferenceDialog() {

    const callAtofDialogRef = this.atofDialog.open(this.callAtofDialog, {
      height: '400px',
      width: '500px'
    });

    callAtofDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed...' + this.registrationForm.value.tofAccepted);
    });
  }

  acceptedTof() {
    this.accepted = true;
    this.tofAccepted.setValue(true);
  }

  notAcceptedTof() {
    this.accepted = false;
    this.tofAccepted.setValue(false);
  }

  onSubmit() {
    if (!this.registrationForm.valid && this.accepted == false) {
      return;
    }
    console.log(this.registrationForm.value);
    sessionStorage.setItem('registered', this.registrationForm.value);
    this.router.navigate(['/dashboard']); 
  }

}

