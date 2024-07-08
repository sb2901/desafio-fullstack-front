import { CommonModule } from '@angular/common';
import { Component , ChangeDetectionStrategy, EventEmitter, Input, Output} from '@angular/core';

import { inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  RouterLink, RouterModule, RouterOutlet } from '@angular/router';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'contact-detail',
  standalone: true,
  imports: [ ReactiveFormsModule, RouterModule, CommonModule, RouterOutlet, RouterLink,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatButtonModule
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {


  @Input() costumer!:any;
  @Input() contact!: any;
  @Input() index!: number;


  typeControl = new FormControl('', [Validators.required]);
  valueControl = new FormControl('', [Validators.required]);

  protected contactForm = new FormGroup({
    type: this.typeControl,
    value:this.valueControl,
  })

  constructor(){ }

  ngOnInit() {
    console.log(this.contact);
    this.contactForm.patchValue(this.contact);

    this.valueControl.events.subscribe((event) => {
      this.contact.value = event.source.value;
    });
    
  }

  /**
   * 
   */
  onDelete(){
    this.costumer.contact.splice(this.index, 1); // Removes one item, at index 3
  }
  

}
