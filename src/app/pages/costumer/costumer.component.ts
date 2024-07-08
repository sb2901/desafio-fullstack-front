import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CostumerService } from '../../services/costumer/costumer-service.service';

import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';

import {MatTableModule} from '@angular/material/table';
import { PdfcreatorService } from '../../services/pdf/pdfcreator.service';
import { Costumer } from '../../interfaces/costumer';


@Component({
  selector: 'app-costumer',
  standalone: true,
  imports: [ ReactiveFormsModule, RouterModule, CommonModule, 
            MatButtonModule, MatDividerModule, MatIconModule, MatListModule, MatTableModule],
  templateUrl: './costumer.component.html',
  styleUrls: ['./costumer.component.css']
})
export class CostumerComponent {

  authService = inject(CostumerService);
  router = inject(Router);
  pdfCreator = inject(PdfcreatorService);

  costumerList:Costumer[] =[];
  //table
  displayedColumns: string[] = [ 'name', 'createdAt'];


  
  constructor() {

    this.authService.getAll()
    .subscribe(
      {
        next: (list) => {
          this.costumerList = list as Costumer[];
        },
        error: (erro) => {
          alert("Erro ao obter a lista de clientes");
          console.log(erro)
        }
      }
    );
  }

  generatePdf() {
    this.pdfCreator.generateReport(this.costumerList);
  }
  


}
