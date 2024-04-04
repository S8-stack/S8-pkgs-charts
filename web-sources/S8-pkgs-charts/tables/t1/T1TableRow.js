

import { S8 } from "/S8-api/S8Context.js";
import { S8Object } from "/S8-api/S8Object.js";
import { C2dNumberFormats, C2dNumberFormatsMap } from "/S8-pkgs-charts/C2dChart.js";




S8.page.CSS_import("/S8-pkgs-charts/tables/t1/T1Table.css");


export class T1TableRow extends S8Object {


    /**
     * @type{Intl.NumberFormat}
     */
    numberFormat = C2dNumberFormats.STD2;


    /** @type {*} */
    value;

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

        this.unitNode = document.createElement("td");
        this.unitNode.classList.add("t1table-row-unit");
        this.rowNode.appendChild(this.unitNode);

    }

    getEnvelope() {
        return this.rowNode;
    }


    /**
    * 
    * @param {string} cards 
    */
    S8_set_chart(chart) {
        while (this.chartNode.firstChild) { this.chartNode.removeChild(this.chartNode.lastChild); }
        this.chartNode.appendChild(chart.getEnvelope());
    }



    /**
     * 
     * @param {string} legend 
     */
    S8_set_name(name) {
        this.nameNode.innerHTML = name;
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
     * 
     * @param {number} value 
     */
    S8_set_value(value) {
        this.value = value;
        this.renderValue();
    }


    renderValue() {
        if (this.numberFormat) {
            this.valueNode.innerHTML = this.numberFormat.format(this.value);
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