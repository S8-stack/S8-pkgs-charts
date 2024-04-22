

import { S8 } from "/S8-api/S8Context.js";
import { S8Object } from "/S8-api/S8Object.js";
import { C2dNumberFormats, C2dNumberFormatsMap } from "/S8-pkgs-charts/C2dChart.js";
import { T1TableRow } from "/S8-pkgs-charts/tables/t1/T1TableRow.js";




S8.page.CSS_import("/S8-pkgs-charts/tables/t1/T1Table.css");


export class TimeT1TableRow extends T1TableRow {

    /** @type {*} */
    value = 0;

    constructor() {
        super();
        this.valueNode.colSpan = 2;
    }


    renderValue() {
      
        let time = this.value;
        const hours = Math.floor(time / 3600);

        const minutes = Math.floor((time % 3600) / 60);

        const seconds = Math.floor(time % 60);
        
        let str = "";
        let isInitialized = false;
        if (hours > 0) { str += `${hours}h`; isInitialized = true;}
        if (minutes > 0) { str += ((isInitialized ? " : " : "") + `${minutes}m`); isInitialized = true; }
        if (seconds > 0) { str += ((isInitialized ? " : " : "") + `${seconds}s`); isInitialized = true; }
        
        this.valueNode.innerHTML = str;
    }


    S8_render() { /* continuous rendering approach... */ }

    S8_dispose() { /* continuous rendering approach... */ }

}