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

import { Costumer } from '../../../../interfaces/costumer';
import { Contact } from '../../../../interfaces/contact';



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


  @Input() costumer!:Costumer;
  @Input() contact!: Contact;
  @Input() index!: number;


  typeControl = new FormControl('', [Validators.required]);
  valueControl = new FormControl('', [Validators.required]);

  protected contactForm = new FormGroup({
    type: this.typeControl,
    value:this.valueControl,
  })

  constructor(){ }

  ngOnInit() {

    this.contactForm.patchValue(this.contact as any);

    this.valueControl.events.subscribe((event) => {
      this.contact.value = event.source.value as string;

    });

    /**
     * Validação conforme o tipo de campo
     */
    this.typeControl.valueChanges.subscribe( (value) => {
   
      this.valueControl.setValue("");
      let code = value;
      if(code as unknown  === 1){
        this.valueControl.setValidators([Validators.required, Validators.email]);
      }else {
        this.valueControl.setValidators([Validators.required, Validators.pattern("^[0-9]*$")]);
      } 
     
   });
    
  }

  /**
   * 
   */
  onDelete(){
    this.costumer.contact?.splice(this.index, 1); // Removes one item, at index 3
  }
  

}
