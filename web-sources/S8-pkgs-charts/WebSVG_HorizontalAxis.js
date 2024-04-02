

import { S8WebFront } from "/S8-pkgs-ui-carbide/S8WebFront.js";

import { WebSVG_Element } from "/S8-pkgs-ui-websvg/WebSVG_Element.js";
import { WebSVG_ViewPort } from "./C2dChart.js";




S8WebFront.CSS_import("/S8-pkgs-ui-websvg/chart/WebSVG_Chart.css");


/**
 * 
 */
export class WebSVG_HorizontalAxis extends WebSVG_Element {


	/** @type{number} */
	x0 = 0.0;

	/** @type{number} */
	x1 = 10.0;

	/** @type{number} */
	y = 0.0;

	/** @type{number} */
	tickLength = 0.2;
    
	/** @type{number[]} */
	tickPositions;

	/** Offset from the main line 
	 * @type{number} */
	tagOffset = 0.2;

	/** @type{string[]} */
	tags;

    constructor(){
        super();

		/*   <circle cx="50" cy="50" r="50" /> */
		this.SVG_node = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		this.setupStroke();


		
		
    }


	/**
	 * 
	 * @param {number[]} coordinates 
	 */
	S8_set_center(coordinates){
		this.xCenter = coordinates[0];
		this.yCenter = coordinates[1];
		this.requestRedraw();
	}

	/**
	 * 
	 * @param {number} radius 
	 */
	S8_set_radius(radius){
		this.radius = radius;
		this.requestRedraw();
	}

	
	/**
	 * 
	 * @param {WebSVG_ViewPort} viewPort 
	 */
	redraw(viewPort){
		this.SVG_node.setAttribute("cx", viewPort.xTranform(this.xCenter).toPrecision(6));
		this.SVG_node.setAttribute("cy", viewPort.yTranform(this.yCenter).toPrecision(6));
		this.SVG_node.setAttribute("r", viewPort.sTranform(this.radius).toPrecision(6));
	}


	/**
	 * 
	 * @param {WebSVG_ViewPort} box 
	 */
	updateBoundingBox(box){
		box.updateBoundingBox(this.xCenter - this.radius, this.yCenter - this.radius);
		box.updateBoundingBox(this.xCenter + this.radius, this.yCenter + this.radius);
	}
}