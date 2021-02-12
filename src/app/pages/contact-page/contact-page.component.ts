import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private af: AngularFirestore) {
    this.createForm();
  }

  createForm() {
      this.form = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.email]],
        message: ['', Validators.required],
    });
  }

  onSubmit() {
    const {firstName, lastName, email, message} = this.form.value;
    const date = Date();
    const html = `
      <div>From: ${firstName} ${lastName}</div>
      <div>Email: <a href="mailto:${email}">${email}</a></div>
      <div>Date: ${date}</div>
      <div>Message: ${message}</div>
    `;
    let formRequest = {firstName, lastName, email, message, date, html};
      try {
          this.af.collection('messages').add(formRequest).then(result => {
              alert("Thank you for your message!")
          }).catch(error => {
              alert("Something went wrong please try again")
          })
      } catch (error) {
          alert("Something went wrong please try again")
      }

    this.form.reset();
  }

  ngOnInit(): void {
    
  }

}
