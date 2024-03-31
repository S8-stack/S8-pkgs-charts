

import { BoundingBox, WebSVG_ViewPort } from "/S8-pkgs-ui-websvg/WebSVG.js";
import { WebSVG_Shape } from "./WebSVG_Shape.js";




/**
 * 
 */
export class WebSVG_Line extends WebSVG_Shape {

	/** @type{number} */
	x1;

	/** @type{number} */
	y1;

	/** @type{number} */
	x2;

	/** @type{number} */
	y2;

    
    constructor(){
        super();

		/* <line x1="0" y1="80" x2="100" y2="20" stroke="black" /> */
		this.SVG_node = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.SVG_node.classList.add("websvg-shape");
		this.setupStroke();

    }


	/**
	 * 
	 * @param {number[]} coordinates 
	 */
	S8_set_coordinates(coordinates){
		this.x1 = coordinates[0];
		this.y1 = coordinates[1];
		this.x2 = coordinates[2];
		this.y2 = coordinates[3];
		this.requestRedraw();
	}


	/**
	 * 
	 * @param {WebSVG_ViewPort} viewPort 
	 */
	redraw(viewPort){
		this.SVG_node.setAttribute("x1", viewPort.xTranform(this.x1).toPrecision(6));
		this.SVG_node.setAttribute("y1", viewPort.yTranform(this.y1).toPrecision(6));

		this.SVG_node.setAttribute("x2", viewPort.xTranform(this.x2).toPrecision(6));
		this.SVG_node.setAttribute("y2", viewPort.yTranform(this.y2).toPrecision(6));
	}




	/**
	 * 
	 * @param {BoundingBox} boundingBox 
	 */
	updateBoundingBox(boundingBox){
		if(this.isBoundingBoxRelevant){
		boundingBox.update(this.x1, this.y1);
		boundingBox.update(this.y1, this.y2);
		}
	}
}