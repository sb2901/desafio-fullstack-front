import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { CostumerService } from '../../../services/costumer/costumer-service.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [ ReactiveFormsModule, RouterModule, CommonModule, ContactComponent, 
    
    MatIconModule,MatInputModule, MatFormFieldModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  costumerService = inject(CostumerService);

  public costumer :any={};
  
  public costumerForm: any; 

  private costumerId:number=0;

  constructor(){ }

  ngOnInit() {

    // Propriedades do form
    this.loadForm();
    //id do cliente
    this.loadCostumerId();
    //dados do cliente
    this.loadValues();

  }

  /**
   * Salva o registro
   */
  onSubmit(){
    if(this.costumerForm.valid){
      console.log(this.costumerForm.value);

      if(this.isNewRecord()){
        this.saveAction();
      }else {
        this.updateAction();
      }
    }
 }

 saveAction(){
  this.costumerService.add(this.costumerForm.value)
    .subscribe(this.getSubscriptionSave());
}

updateAction(){
  this.costumerService.update(this.costumerForm.value)
  .subscribe(this.getSubscriptionSave());
}

 loadValues(){
  if(this.isNewRecord()){

    this.costumer = {
      id:undefined,
      createdAt: undefined,
      name: undefined,
      contact:[]
    };
    this.costumerForm.patchValue(this.costumer);
    
  }else{
    this.costumerService.get({id:this.costumerId})
    .subscribe(
      {
          next: (list:any) => {
            console.log(list);
            this.costumerForm.patchValue(list);
            this.costumer = list;
          },
          error: (erro:any) => {
                  alert("Erro ao obter a lista de clientes");
                  console.log(erro)
          }
      });
   }
 }
 

 getSubscriptionSave() {
  return  {
    next: (e:any) => {
      this.router.navigate(['/costumer']);
    },
    error: (erro:any) => {
      console.log(erro)
    }
  };
 }

 /**
  * Deleta o registro
  */
  onDelete() {
    if(!this.isNewRecord()){
      this.costumerService.delete({id:this.costumerId})
      .subscribe(
        {
            next: () => {
              this.router.navigate(['/costumer']);
            },
            error: (erro:any) => {
                    alert("Erro");
                    console.log(erro)
            }
        });
    }

  } 

  /**
   * 
   * @returns Controla se novo registro ou existente
   */
  isNewRecord(){
    return !this.costumerId || this.costumerId<=0;
  }

  /**
   * 
   */
  loadCostumerId() {
    this.costumerId = parseInt(this.route.snapshot.params['id'], 10);
  }

  /**
  * Cria um novo contato
  */
  addContact() {
    this.costumer.contact.push({}); 
  }

  /**
   * Carrega as propriedades do form
   */
  loadForm(){
    let fb = new FormBuilder();
    this.costumerForm = fb.group({
    name: new FormControl('', [Validators.required]),
    createdAt: [''],
    id: [''],
    contact: [],
    }) ;
  }

}
