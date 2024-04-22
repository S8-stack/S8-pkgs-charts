

import { S8 } from "/S8-api/S8Context.js";
import { C2dNumberFormats, C2dNumberFormatsMap } from "/S8-pkgs-charts/C2dChart.js";
import { T1TableRow } from "/S8-pkgs-charts/tables/t1/T1TableRow.js";




S8.page.CSS_import("/S8-pkgs-charts/tables/t1/T1Table.css");


export class NumberT1TableRow extends T1TableRow {


    /**
     * @type{Intl.NumberFormat}
     */
    format = C2dNumberFormats.STD2;


    /** @type {*} */
    value;

    /**
     * 
     */
    constructor() {
        super();

        /* unit node */
        this.unitNode = document.createElement("td");
        this.unitNode.classList.add("t1table-row-unit");
        this.rowNode.appendChild(this.unitNode);
    }


    /** @arg{number} code */
    S8_set_numberFormat(code) {
        if (code == 0) {
            this.format = null;
        }
        else {
            this.format = C2dNumberFormatsMap.get(code);
        }
        this.renderValue();
    }


    /**
     * render value
     */
    renderValue() {
        if(this.format) { 
            this.valueNode.innerHTML = this.format.format(this.value);
        }
        else { 
            this.valueNode.innerHTML = value;
        }
    }


    /**
     * 
     * @param {string} legend 
     */
    S8_set_unit(unit) {
        this.unitNode.innerHTML = unit;
    }

    S8_render() { /* continuous rendering approach... */ }

    S8_dispose() { /* continuous rendering approach... */ }

}