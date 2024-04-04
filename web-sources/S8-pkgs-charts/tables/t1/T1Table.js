

import { S8 } from "/S8-api/S8Context.js";
import { S8Object } from "/S8-api/S8Object.js";

import { T1TableRow } from "./T1TableRow.js";


S8.page.CSS_import("/S8-pkgs-charts/tables/t1/T1Table.css");


export class T1Table extends S8Object {


    constructor(){
        super();

        this.wrapperNode = document.createElement("div");
        this.wrapperNode.classList.add("t1table-wrapper");


        this.tableNode = document.createElement("table");
        this.tableNode.classList.add("t1table");


        this.tableHeadNode = document.createElement("thead");
        this.tableHeadNode.innerHTML = 
       `<tr>
          <th scope="col">Variable</th>
          <th scope="col">Value</th>
          <th scope="col">Unit</th>
        </tr>`;
        this.tableNode.appendChild(this.tableHeadNode);


        this.tableBodyNode = document.createElement("tbody");
        this.tableBodyNode.innerHTML = 
       `<tr>
          <th scope="col">Variable</th>
          <th scope="col">Value</th>
          <th scope="col">Unit</th>
        </tr>`;
        this.tableNode.appendChild(this.tableBodyNode);

        this.wrapperNode.appendChild(this.tableNode);
    }

    getEnvelope() {
        return this.wrapperNode;
    }



   

    /**
     * 
     * @param {T1TableRow[]} rows 
     */
    S8_set_rows(rows) {
        /* clear previous rows */
        while(this.tableBodyNode.firstChild){ this.tableBodyNode.removeChild(this.tableBodyNode.lastChild); }
        
        /* append wrappers of new ones */
        rows.forEach(row => this.tableBodyNode.appendChild(row.getEnvelope()));
    }

    S8_render() { /* continuous rendering approach... */ }

    S8_dispose() { /* continuous rendering approach... */ }

}