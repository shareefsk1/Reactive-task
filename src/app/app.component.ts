import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userForm!: FormGroup;
  users: any = [];
  editingUser: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      company: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  // set the currently edited user object and populate the form fields
  editUser(index: number) {
    const user = this.users[index];
    this.editingUser = user;
    this.userForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      company: user.company,
      gender: user.gender,
      dob: user.dob,
      password: user.password,
      confirmPassword: user.confirmPassword
    });
  }

  // submit the user form and update the user object in the array
  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    const updatedUser = {
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
      company: this.userForm.value.company,
      gender: this.userForm.value.gender,
      dob: this.userForm.value.dob,
      password: this.userForm.value.password,
      confirmPassword: this.userForm.value.confirmPassword
    };

    const index = this.users.indexOf(this.editingUser);
    if (index === -1) {
      this.users.push(updatedUser);
    } else {
      this.users[index] = updatedUser;
      this.editingUser = null;
    }
    this.userForm.reset();
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
  }

  resetForm() {
    this.userForm.reset();
  }


}
