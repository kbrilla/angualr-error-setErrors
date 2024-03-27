import {
  Component,
  HostBinding,
  HostListener,
  OnInit,
  computed,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <!-- does not work as formGroup directive present -->

    <form [formGroup]="form">
    <input [formControl]="form.controls.field" />
    Form valid: {{form.valid}}
    </form> 

    <!-- does not work as formControl directive present -->

    <!-- <form>
    <input [formControl]="form.controls.field" />
    Form valid: {{form.valid}}
    </form> -->

    <!-- works as no directives present -->
    <!-- <form>
    Form valid: {{form.valid}}
    </form> -->

    <p>
    lastRecivedEventInfo: 
    {{ message() | json }}
    </p> 
  `,
  imports: [ReactiveFormsModule, JsonPipe],
})
export class App implements OnInit {
  ngOnInit(): void {
    this.form.controls.field.setErrors({ someError: {} });
  }
  name = 'Angular';
  message = signal({});

  form = new FormGroup({ field: new FormControl(0,[Validators.required]) });

  constructor() {
    this.form.statusChanges.pipe(takeUntilDestroyed()).subscribe((status) => {
      this.message.set({
        statusRecived: status,
        formValid: this.form.valid,
        fieldErrors: this.form.controls.field.errors
      })
    })
  }
}

bootstrapApplication(App);
