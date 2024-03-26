import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  OnInit,
  computed,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
    <br/>
    {{ message() | json }}
    </p> 
    <p>
    Form valid: {{form.valid}}
    <br/>
    Form status current: {{form.status}}
    <br/>
    Form status from last statusCahgne: {{message().statusRecived}}
    </p>
  `,
  imports: [ReactiveFormsModule, JsonPipe],
})
export class App implements OnInit {
  ngOnInit(): void {
    this.form.controls.field.setErrors({ someError: {} });
  }
  name = 'Angular';
  message = signal<any>({});

  form = new FormGroup({ field: new FormControl(0) });

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
