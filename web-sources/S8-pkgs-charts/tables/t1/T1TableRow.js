

import { S8 } from "/S8-api/S8Context.js";
import { S8Object } from "/S8-api/S8Object.js";
import { C2dNumberFormats, C2dNumberFormatsMap } from "/S8-pkgs-charts/C2dChart.js";




S8.page.CSS_import("/S8-pkgs-charts/tables/t1/T1Table.css");


export class T1TableRow extends S8Object {


    constructor() {
        super();

        this.rowNode = document.createElement("tr");
        this.rowNode.classList.add("t1table-row");

        this.nameNode = document.createElement("td");
        this.nameNode.classList.add("t1table-row-name");
        this.rowNode.appendChild(this.nameNode);

        this.valueNode = document.createElement("td");
        this.valueNode.classList.add("t1table-row-value");
        this.rowNode.appendChild(this.valueNode);
    }

    getEnvelope() {
        return this.rowNode;
    }

    /**
     * 
     * @param {string} legend 
     */
    S8_set_name(name) {
        this.nameNode.innerHTML = name;
    }

    /**
     * 
     * @param {number} value 
     */
    S8_set_value(value) {
        this.value = value;
        this.renderValue();
    }


    renderValue() {
       /* to be overridden */
    }


    S8_render() { /* continuous rendering approach... */ }

    S8_dispose() { /* continuous rendering approach... */ }

}