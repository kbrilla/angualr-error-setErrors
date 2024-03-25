import {
  Component,
  HostBinding,
  HostListener,
  OnInit,
  computed,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <!-- does not work as formGroup directive present -->

    <!-- <form [formGroup]="form">
    <input [formControl]="form.controls.field" />
    Form valid: {{form.valid}}
    </form> -->

    <!-- does not work as formControl directive present -->

    <!-- <form>
    <input [formControl]="form.controls.field" />
    Form valid: {{form.valid}}
    </form> -->

    <!-- works as no directives present -->
    <form>
    Form valid: {{form.valid}}
    </form>
  `,
  imports: [ReactiveFormsModule],
})
export class App implements OnInit {
  ngOnInit(): void {
    this.form.controls.field.setErrors({ someError: {} });
  }
  name = 'Angular';

  form = new FormGroup({ field: new FormControl(0) });
}

bootstrapApplication(App);
