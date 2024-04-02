


import { NeObject } from "/S8-core-bohr-neon/NeObject.js";

import { S8WebFront } from "/S8-pkgs-ui-carbide/S8WebFront.js";
import { C2dNumberFormats, C2dNumberFormatsMap } from "/S8-pkgs-charts/C2dChart.js";


S8WebFront.CSS_import("/S8-pkgs-charts/ts/C2dTimeSeries.css");


/**
 * 
 */
export class C2dTimeSeries extends NeObject {

    /** @type{ SVGElement } */
    SVG_wrapperNode;

    /** @type{ TimeAxis } */
    timeAxis;

    /** @type{ ValueAxis } */
    valueAxis;

    /** @type{ DrawingZone } */
    drawingZone;

    /** @type{number} */
    drawingWidth = 360;

    /** @type{number} */
    drawingHeight = 240;

    /** @type{number[]} */
    values;



    marginTop = 8;

    marginRight = 8;

    marginBottom = 8;

    marginLeft = 8;


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
        this.SVG_wrapperNode.classList.add("c2d-ts");

        this.timeAxis = new TimeAxis(this);
        this.valueAxis = new ValueAxis(this);
        this.drawingZone = new DrawingZone(this);

        this.SVG_wrapperNode.appendChild(this.drawingZone.groupNode);
        this.SVG_wrapperNode.appendChild(this.valueAxis.groupNode);
        this.SVG_wrapperNode.appendChild(this.timeAxis.groupNode);
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

    /** @arg{number} code */
    S8_set_timeAxisLabelFormat(code) {
        this.timeAxis.labelFormat = C2dNumberFormatsMap.get(code);
        this.onChanged();
    }

    /** @arg{number} nTicks : end time */
    S8_set_valueAxisNbTicks(n) { this.valueAxis.nTicks = n; this.onChanged(); }

    /** @arg{number} nTicks : end time */
    S8_set_valueAxisLabelFormat(code) {
        this.valueAxis.labelFormat = C2dNumberFormatsMap.get(code);
        this.onChanged();
    }

    /** @arg{number[]} values */
    S8_set_values(values) {
        this.values = values;
        if (values && values.length > 0) {
            let value = values[0];
            let vmin = value, vmax = value;
            const n = values.length;
            for (let i = 1; i < n; i++) {
                value = values[i];
                vmin = Math.min(vmin, value);
                vmax = Math.max(vmax, value);
            }
            this.valueAxis.setInterval(vmin, vmax);
        }
        this.onChanged();
    }


    /** @arg{number} size */
    S8_set_marginTop(size) { this.marginTop = size; this.onChanged(); }

     /** @arg{number} size */
     S8_set_marginRight(size) { this.marginRight = size; this.onChanged(); }
    
     /** @arg{number} size */
    S8_set_marginBottom(size) { this.marginBottom = size; this.onChanged(); }
    
     /** @arg{number} size */
     S8_set_marginLeft(size) { this.marginLeft = size; this.onChanged(); }



    getEnvelope() {
        return this.SVG_wrapperNode;
    }


    /**
     * 
     * @param {*} y 
     */
    redraw() {
        if (!this.isUpToDate) {
            this.timeAxis.update();
            this.valueAxis.update();

            let boudingBox = new BoundingBox();
            boudingBox.reset(0, 0, 0, 0);

            this.drawingZone.redraw(boudingBox);
            this.timeAxis.redraw(boudingBox);
            this.valueAxis.redraw(boudingBox);

            this.SVG_wrapperNode.setAttribute("viewBox", this.generateViewport(boudingBox));

            this.isUpToDate = true;
        }
    }

    /**
     * 
     * @param {BoundingBox} boudingBox 
     * @returns {string}
     */
    generateViewport(boudingBox){
        const xmin = boudingBox.xmin - this.marginLeft;
        const ymin = boudingBox.ymin - this.marginTop;
        const xmax = boudingBox.xmax + this.marginRight;
        const ymax = boudingBox.ymax + this.marginBottom;
        return `${xmin} ${ymin} ${xmax - xmin} ${ymax - ymin}`;
    }

    S8_render() {
        this.redraw();
    }

    S8_dispose() {  /* nothing to dispose */ }
}




class Group {

    /** @type{C2dTimeSeries} */
    chart;

    /** @type{SVGGElement} */
    groupNode;
  
    constructor(chart) {
        this.chart = chart;
        this.groupNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
    }


    clear() {
        while (this.groupNode.firstChild) { this.groupNode.removeChild(this.groupNode.lastChild); }
    }

}



class DrawingZone extends Group {

    constructor(chart) {
        super(chart);
    }


    /**
     * 
     * @param {BoundingBox} boundingBox 
     */
    redraw(boundingBox) {

        this.clear();

        const values = this.chart.values;
        const nValues = values.length;
        const timeAxis = this.chart.timeAxis;
        const valueAxis = this.chart.valueAxis;

        const t0 = timeAxis.t0, t1 = timeAxis.t1, dt = (t1 - t0) / (nValues - 1);

        const pointCoordinates = new Array(nValues);
        let x, y;
        for (let i = 0; i < nValues; i++) {
            x = timeAxis.xTransform(t0 + i * dt);
            y = valueAxis.yTransform(values[i]);
            pointCoordinates[i] = `${x.toPrecision(6)},${y.toPrecision(6)}`;
        }

        const polylineCoordinates = pointCoordinates.join(' ');


        x = 0; y = this.chart.drawingHeight;
        const basePoint0 = `${x.toPrecision(6)},${y.toPrecision(6)}`;

        x = this.chart.drawingWidth; y = this.chart.drawingHeight;
        const basePoint1 = `${x.toPrecision(6)},${y.toPrecision(6)}`;

        const polygonCoordinates = polylineCoordinates + " " + basePoint1 + " " + basePoint0;

        const polygonNode = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        polygonNode.classList.add("c2d-ts-polygon");
        polygonNode.setAttribute("points", polygonCoordinates);
        this.groupNode.appendChild(polygonNode);


        const polylineNode = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        polylineNode.classList.add("c2d-ts-polyline");
        polylineNode.setAttribute("points", polylineCoordinates);
        this.groupNode.appendChild(polylineNode);

        boundingBox.update(0, 0, this.chart.drawingWidth, this.chart.drawingHeight);
    }


}


class TimeAxis extends Group {



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

    /** @type {Intl.NumberFormat} */
    labelFormat = C2dNumberFormats.STD2;


    /**
     * @type{boolean}
     */
    isUpToDate = false;


    /** @type{number} */
    xScalingFactor;


    constructor(chart) {
        super(chart);
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
        this.i1 = Math.ceil(this.t1 / this.dt);

        console.log("i0 = " + this.i0 + ", i1=" + this.i1);

    }



    xTransform(t) {
        return (t - this.t0) * this.xScalingFactor;
    }


    /**
     * 
     * @param {BoundingBox} boundingBox 
     */
    redraw(boundingBox) {

        this.clear();

        const y1 = this.chart.drawingHeight;
        const x0 = 0, x1 = x0 + this.chart.drawingWidth;

        const tickLength = this.chart.drawingHeight * 0.04;


        this.labelWidth = 0;
        this.labelHeight = 0;
        for (let i = this.i0; i < this.i1; i++) {
            let t = i * this.dt;
            let xTick = this.xTransform(t);
            this.groupNode.appendChild(SVG_createLine("c2d-ts-t-tick", xTick, y1, xTick, y1 + tickLength));

            let label = new SVG_Label("c2d-ts-t-text", this.labelFormat.format(t));
            label.setPosition(xTick, y1 + tickLength);
            this.groupNode.appendChild(label.node);

            let box = label.node.getBBox();
            this.labelWidth = Math.max(this.labelWidth, box.width);
            this.labelHeight = Math.max(this.labelHeight, box.height);

            label.setPosition(xTick, y1 + tickLength + box.height);
            boundingBox.encloseRect(label.node.getBBox());
        }

        /* big horizontal line */
        this.groupNode.appendChild(SVG_createLine("c2d-ts-t-line", x0, y1, x1, y1));


    }
}



/**
 * 
 */
export class ValueAxis extends Group {


    /** @type{ number } min of values using this axis */
    vMin = 0.0;

    /** @type{ number } max of values using this axis */
    vMax = 3600.0;


    /** @type{ number } window bottom value (generated from grid) */
    v0 = 0.0;

    /** @type{ number } window top value (generated from grid) */
    v1 = 3600.0;

    /** @type { number } indicative nb of ticks */
    nTicks = 100;

    /** @type{ number } value increment per tick */
    dv = 10.0;

    /** @type{ number } int nb of dv increments for the beginning of the axis */
    i0;

    /** @type{ number } int nb of dv increments for the ending of the axis */
    i1;

    /** @type{ number } width of text (relative to viewport) */
    labelWidth = 32;

    /** @type{ number } height of text (relative to viewport) */
    labelHeight = 6;

    /** @type {Intl.NumberFormat} */
    labelFormat = C2dNumberFormats.STD2;

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
        super(chart);
    }


    onChanged() {
        if (this.owner) { this.owner.onChanged(); }
    }

    setInterval(vmin, vmax) {
        this.vMin = vmin;
        this.vMax = vmax;
    }

    update() {
        const interval = this.vMax - this.vMin;


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
        this.v0 = this.i0 * this.dv;

        this.i1 = Math.ceil(this.vMax / this.dv);
        this.v1 = this.i1 * this.dv;

        this.vScalingFactor = this.chart.drawingHeight / (this.v1 - this.v0);

        console.log("i0 = " + this.i0 + ", i1=" + this.i1);
    }



    /**
     * @param {number} value 
     * @returns {number}
     */
    yTransform(value) {
        return this.chart.drawingHeight - ((value - this.v0) * this.vScalingFactor);
    }


    /**
     * 
     * @param {BoundingBox} boundingBox 
     */
    redraw(boundingBox) {

        this.clear();

        //SVG_wrapperNode.appendChild(createLine("c2dchart-axis", xBase, yBase, xBase, yBase + this.viewportWidth));

        const tickLength = this.chart.drawingWidth * 0.04;

        const y1 = this.chart.drawingHeight;
        const x0 = 0, x1 = this.chart.drawingWidth;

        boundingBox.update(x0, y1, x1, y1);

        this.labelWidth = 0;
        this.labelHeight = 0;
        for (let i = this.i0; i <= this.i1; i++) {
            let value = i * this.dv;
            let yTick = this.yTransform(value);
            this.groupNode.appendChild(SVG_createLine("c2d-ts-v-tick", x0 - tickLength, yTick, x0, yTick));
            this.groupNode.appendChild(SVG_createLine("c2d-ts-v-line", x0, yTick, x1, yTick));

            const label = new SVG_Label("c2d-ts-v-text", this.labelFormat.format(value));
            label.setPosition(x0 - tickLength, yTick + 0.5 * this.labelHeight);
            this.groupNode.appendChild(label.node);

            let box = label.node.getBBox();
            this.labelWidth = Math.max(this.labelWidth, box.width);
            this.labelHeight = Math.max(this.labelHeight, box.height);

            label.setPosition(x0 - 1.5 * tickLength - box.width, yTick);
            boundingBox.encloseRect(label.node.getBBox());
        }
    }
}











/** <SVG-section> */


class SVG_Label {

    constructor(style, data) {
        this.node = document.createElementNS("http://www.w3.org/2000/svg", "text");
        this.node.classList.add(style);
        this.node.appendChild(document.createTextNode(data));
    }

    setPosition(x, y) {
        this.node.setAttribute("x", x.toPrecision(6));
        this.node.setAttribute("y", y.toPrecision(6));
    }
}


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





class BoundingBox {

    /** @type {number} */
    xmin;
    /** @type{number} */
    xmax;
    /** @type{number} */
    ymin;
    /** @type{number} */
    ymax;


  
    reset(xmin, ymin, xmax, ymax){
        this.xmin = xmin;
        this.xmax = xmax;
        this.ymin = ymin;
        this.ymax = ymax;
    }

    
    update(xmin, ymin, xmax, ymax){
        this.xmin = Math.min(this.xmin, xmin);
        this.ymin = Math.min(this.ymin, ymin);
        this.xmax = Math.max(this.xmax, xmax);
        this.ymax = Math.max(this.ymax, ymax);
    }

    /**
     * @param {BoundingBox} box 
     */
    encloseBox(box){
        this.update(box.xmin, box.ymin, box.xmax, box.ymax);
    }

     /**
     * @param {SVGRect} rect 
     */
    encloseRect(rect){
        this.update(rect.x, rect.y, rect.x + rect.width, rect.y + rect.height);
    }

   
}

