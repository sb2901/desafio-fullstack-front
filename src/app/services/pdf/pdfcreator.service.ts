import { Injectable } from '@angular/core';

import {DatePipe} from '@angular/common';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Costumer } from '../../interfaces/costumer';
import { Contact } from '../../interfaces/contact';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfcreatorService {

  datePipe = new DatePipe('en-US');
  constructor() {}

  generateReport(data: Costumer[]){
   
    let rows: any[][]=[];

    rows.push(
    [{text: 'Cliente', style: 'tableHeader', alignment: 'left'}, 
    {text: 'Data de cadastro', style: 'tableHeader', alignment: 'left'},
    {text: 'Contatos', style: 'tableHeader', alignment: 'left'}]);
				

    data.forEach(e => {

      let rowC : any[][]=[];

      e.contact?.forEach((c: Contact) =>{
        const type = c.type == 1? "Email": "Telefone";
        rowC.push([type+": "+ c.value])
        
      });


      rows.push([
        e.name,
        this.datePipe.transform(new Date(e.createdAt||""), 'dd/MM/yyyy'),
        rowC
      ]);
    });

    const docDefinition = {
    
      content: [
        { text: "Listagem de clientes", style: "header" },
       
        {
        table: {
          widths: ['*', 80,  200],
            headerRows: 1,
            body: rows 
          }
        }
      ],

      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
       
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      }
    };

    pdfMake.createPdf(docDefinition as any).download("test.pdf");
    

  }
}


