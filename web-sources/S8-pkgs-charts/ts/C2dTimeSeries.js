


import { NeObject } from "/S8-core-bohr-neon/NeObject.js";

import { S8WebFront } from "/S8-pkgs-ui-carbide/S8WebFront.js";



S8WebFront.CSS_import("/S8-pkgs-charts/ts/C2dTimeSeries.css");


/**
 * 
 */
export class C2dTimeSeries extends NeObject {

    /** @type{ SVGElement } */
    SVG_wrapperNode;

    /** @type{ TimeAxis } */
    timeAxis = new TimeAxis(this);

    /** @type{ ValueAxis } */
    valueAxis = new ValueAxis(this);

    /** @type{number} */
    drawingWidth = 360;

    /** @type{number} */
    drawingHeight = 240;

    /** @type{number[]} */
    values;


    /**
     * @type{boolean}
     */
    isUpToDate = false;


    /**
     * 
     */
    constructor() {
        super();

        this.SVG_wrapperNode = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    }

    onChanged() {
        this.isUpToDate = false;
    }



    /** @arg{number} nTicks : end time */
    S8_set_drawingWidth(size) { this.drawingWidth = size; this.onChanged(); }

    /** @arg{number} height : height */
    S8_set_drawingHeight(size) { this.drawingHeight = size; this.onChanged(); }


    /** @arg{number} t : start time */
    S8_set_timeAxisT0(t) { this.timeAxis.t0 = t; this.onChanged(); }

    /** @arg{number} t : end time */
    S8_set_timeAxisT1(t) { this.timeAxis.t1 = t; this.onChanged(); }

    /** @arg{number} nTicks : end time */
    S8_set_timeAxisNbTicks(n) { this.timeAxis.nTicks = n; this.onChanged(); }

    /** @arg{number} nTicks : end time */
    S8_set_valueAxisNbTicks(n) { this.valueAxis.nTicks = n; this.onChanged(); }

    /** @arg{number[]} values */
    S8_set_values(values) { 
        this.values = values;
        if(values && values.length > 0){
            let value = values[0];
            let vmin = value, vmax = value;
            const n = values.length;
            for(let i = 1; i < n; i++) { value = values[i];
                vmin = Math.min(vmin, value);
                vmax = Math.max(vmax, value);
            }
            this.valueAxis.setInterval(vmin, vmax);
        }
        this.onChanged(); 
    }


    getEnvelope(){
        return this.SVG_wrapperNode;
    }



    /**
     * 
     * @param {*} y 
     */
    redraw() {
        if(!this.isUpToDate){
            this.timeAxis.update();
            this.valueAxis.update();
    
            this.SVG_wrapperNode.setAttribute("viewBox", this.generateViewport());

            /* remove all child nodes */
            while(this.SVG_wrapperNode.firstChild){ this.SVG_wrapperNode.removeChild(this.SVG_wrapperNode.lastChild); }
    
            this.SVG_wrapperNode.appendChild(this.valueAxis.generateNode());
            this.SVG_wrapperNode.appendChild(this.timeAxis.generateNode());
    
            const nValues = this.values.length;
            const t0 = this.timeAxis.t0, t1 = this.timeAxis.t1, dt = (t1 - t0) / (nValues - 1);
            
            const pointCoordinates = new Array(nValues);
            let x, y;
            for(let i = 0; i<nValues; i++){
                x = this.timeAxis.xTransform(t0 + i * dt);
                y = this.valueAxis.yTransform(this.values[i]);
                pointCoordinates[i] = `${x.toPrecision(6)},${y.toPrecision(6)}`;
            }
    
            const polylineCoordinates = pointCoordinates.join(' ');
    
            const polylineNode = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
            polylineNode.classList.add("c2dts-polyline");
            polylineNode.setAttribute("points", polylineCoordinates);
    
    
            x = 0; y = this.drawingHeight;
            const basePoint0 = `${x.toPrecision(6)},${y.toPrecision(6)}`;
    
            x = this.drawingWidth; y = this.drawingHeight;
            const basePoint1 = `${x.toPrecision(6)},${y.toPrecision(6)}`;
    
            const polygonCoordinates = polylineCoordinates + " " + basePoint1 + " " + basePoint0;
    
            /* <polyline points="100,100 150,25 150,75 200,0" fill="none" stroke="black" /> */
            const polygonNode = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            polygonNode.classList.add("c2dts-polygon");
            polygonNode.setAttribute("points", polygonCoordinates);
    
    
            this.SVG_wrapperNode.appendChild(polygonNode);
            this.SVG_wrapperNode.appendChild(polylineNode);

            this.isUpToDate = true;
        }
    }





    generateViewport(){
        const xmin = -2 * this.valueAxis.labelWidth;
        const xmax = this.drawingWidth + 0.5 * this.timeAxis.labelWidth;
        const ymin = -0.5 * this.valueAxis.labelHeight;
        const ymax = this.drawingHeight + 0.5 * this.valueAxis.labelHeight;
        return `${xmin} ${ymin} ${xmax - xmin} ${ymax - ymin}`;
    }



    S8_render() {
        this.redraw();
    }

    S8_dispose() {  /* nothing to dispose */ }
}





class TimeAxis {

    /** @type{C2dTimeSeries} */
    chart;

    /** @type{ number } */
    t0 = 0.0;

    /** @type{ number } */
    t1 = 3600.0;

    /** @type { number } */
    nTicks = 100;

    /** @type{ number } time for one tick */
    dt = 10.0;

    /** @type{ number } int nb of dt times for the beginning of the axis */
    i0;

    /** @type{ number } int nb of dt times for the ending of the axis */
    i1;
  
    /** @type{ number } width of text (relative to viewport) */
    labelWidth = 36;

    /** @type{ number } height of text (relative to viewport) */
    labelHeight = 12;
    

    /**
     * @type{boolean}
     */
    isUpToDate = false;


    /** @type{number} */
    xScalingFactor;


    constructor(chart) {
        this.chart = chart;
    }


    onChanged() {
        if (this.owner) { this.owner.onChanged(); }
    }



    update() {
        const tWindow = this.t1 - this.t0;
        this.xScalingFactor = this.chart.drawingWidth / tWindow;

        const targetTickDuration = tWindow / this.nTicks;
        console.log(targetTickDuration);
        console.log(Math.log10(targetTickDuration));
        const p = Math.floor(Math.log10(targetTickDuration));
        console.log("p = " + p);

        const q = targetTickDuration / Math.pow(10.0, p);
        console.log("q = " + q);

        let m = 1;

        if (q < 1.8) { m = 1; }
        else if (q < 2.2) { m = 2; }
        else if (q < 3.2) { m = 2.5; }
        else { m = 5; }

        console.log("m = " + m);

        this.dt = m * Math.pow(10.0, p);
        console.log("d = " + this.dt);

        this.i0 = Math.floor(this.t0 / this.dt) + 1;
        this.i1 = Math.ceil(this.t1 / this.dt) - 1;

        console.log("i0 = " + this.i0 + ", i1=" + this.i1);

    }



    xTransform(t) {
        return (t - this.t0) * this.xScalingFactor;
    }


    /**
     * 
     * @param {*} yBase 
     */
    generateNode() {
        const SVG_wrapperNode = document.createElementNS("http://www.w3.org/2000/svg", "g");

        const y1 = this.chart.drawingHeight;
        const x0 = 0, x1 = x0 + this.chart.drawingWidth;
        SVG_wrapperNode.appendChild(SVG_createLine("c2dts-t-axis", x0, y1, x1, y1));

    
        for (let i = this.i0; i < this.i1; i++) {
            let t = i * this.dt;
            let xTick = this.xTransform(t);
            SVG_wrapperNode.appendChild(SVG_createLine("c2dts-t-axis-line", 
                xTick, y1, 
                xTick, y1 + 0.8 * this.labelHeight));
            SVG_wrapperNode.appendChild(SVG_createText("c2dts-t-axis-text", 
                xTick - 0.5 * this.labelWidth, 
                y1 + 2.0 * this.labelHeight, 
                t.toPrecision(4)));
        }
        return SVG_wrapperNode;
    }
}



/**
 * 
 */
export class ValueAxis {


    /** @type{C2dTimeSeries} */
    chart;

    /** @type{ number } min of values using this axis */
    vMin = 0.0;

    /** @type{ number } max of values using this axis */
    vMax = 3600.0;

    /** @type { number } indicative nb of ticks */
    nTicks = 100;

    /** @type{ number } value increment per tick */
    dv = 10.0;

    /** @type{ number } int nb of dv increments for the beginning of the axis */
    i0;

    /** @type{ number } int nb of dv increments for the ending of the axis */
    i1;

    /** @type{ number } width of text (relative to viewport) */
    labelWidth = 36;

    /** @type{ number } height of text (relative to viewport) */
    labelHeight = 12;
     
    /** @type{ number } max height display */
    y0;

    /** @type{ number } min height display */
    y1;

    /**
     * @type{boolean}
     */
    isUpToDate = false;


    /** @type{number} */
    viewportHeight;

    /** @type{number} */
    vScalingFactor;

    /** @arg{C2dTimeSeries} chart */
    constructor(chart) {
        this.chart = chart;
    }


    onChanged() {
        if (this.owner) { this.owner.onChanged(); }
    }

    setInterval(vmin, vmax){
        this.vMin = vmin;
        this.vMax = vmax;
    }

    update() {
        const interval = this.vMax - this.vMin;
        this.vScalingFactor = this.chart.drawingHeight / interval;

        const targetTickDv = interval / this.nTicks;
        console.log(targetTickDv);
        console.log(Math.log10(targetTickDv));
        const p = Math.floor(Math.log10(targetTickDv));
        console.log("p = " + p);

        const q = targetTickDv / Math.pow(10.0, p);
        console.log("q = " + q);

        let m = 1;

        if (q < 1.8) { m = 1; }
        else if (q < 2.2) { m = 2; }
        else if (q < 3.2) { m = 2.5; }
        else { m = 5; }

        console.log("m = " + m);

        this.dv = m * Math.pow(10.0, p);
        console.log("dv = " + this.dv);

        this.i0 = Math.floor(this.vMin / this.dv);
        this.i1 = Math.ceil(this.vMax / this.dv);

        console.log("i0 = " + this.i0 + ", i1=" + this.i1);
    }



    /**
     * @param {number} value 
     * @returns {number}
     */
    yTransform(value) {
        return this.chart.drawingHeight - ((value - this.vMin) * this.vScalingFactor);
    }


    /**
     * 
     * @param {*} yBase 
     */
    generateNode() {
        const SVG_wrapperNode = document.createElementNS("http://www.w3.org/2000/svg", "g");

        //SVG_wrapperNode.appendChild(createLine("c2dchart-axis", xBase, yBase, xBase, yBase + this.viewportWidth));

        //const y0 = 0, y1 = this.chart.drawingHeight;
        const x0 = 0;
        for (let i = this.i0; i < this.i1; i++) {
            let value = i * this.dv;
            let yTick = this.yTransform(value);
            SVG_wrapperNode.appendChild(SVG_createLine("c2dts-v-axis-line", 
                x0 - 0.75 * this.labelWidth, yTick, x0, yTick));
            SVG_wrapperNode.appendChild(SVG_createText("c2dts-v-axis-text", 
                x0 - 2 * this.labelWidth, yTick, 
                value.toPrecision(4)));
        }
        return SVG_wrapperNode;
    }
}











/** <SVG-section> */



/**
 * 
 * @param {string} style 
 * @param {number} x1 
 * @param {number} y1 
 * @param {number} x2 
 * @param {number} y2 
 * @returns 
 */
const SVG_createLine = function (style, x1, y1, x2, y2) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", "line");
    element.classList.add(style);
    element.setAttribute("x1", x1.toPrecision(6));
    element.setAttribute("y1", y1.toPrecision(6));
    element.setAttribute("x2", x2.toPrecision(6));
    element.setAttribute("y2", y2.toPrecision(6));
    return element;
}


/**
 * <text x="20" y="35" class="small">My</text>
 */
const SVG_createText = function (style, x, y, data) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", "text");
    element.classList.add(style);
    element.setAttribute("x", x.toPrecision(6));
    element.setAttribute("y", y.toPrecision(6));
    element.appendChild(document.createTextNode(data));
    return element;
}

/** </SVG-section> */


/** </props> */

class Props {

    /** @type{number} */
    vAxisWidth;

    /** @type{number} */
    tAxisHeight;
    
    /** @type{number} */
    drawingWidth;

    /** @type{number} */
    drawingHeight;

    /** @type{number} */
    axis_CSSStyle;

    /** @type{number} */
    curve_CSSStyle;
}



/** </props> */


