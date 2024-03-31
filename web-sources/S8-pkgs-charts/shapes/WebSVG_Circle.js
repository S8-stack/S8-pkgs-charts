
import { BoundingBox, WebSVG_ViewPort } from "/S8-pkgs-ui-websvg/WebSVG.js";
import { WebSVG_Shape } from "./WebSVG_Shape.js";




/**
 * 
 */
export class WebSVG_Circle extends WebSVG_Shape {


	/** @type{number} */
	xCenter = 0.0;

	/** @type{number} */
	yCenter = 0.0;

	/** @type{number} */
	radius = 1.0;
    
    constructor(){
        super();

		/*   <circle cx="50" cy="50" r="50" /> */
		this.SVG_node = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		this.SVG_node.classList.add("websvg-shape");
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
	 * @param {BoundingBox} boundingBox 
	 */
	updateBoundingBox(boundingBox){
		if(this.isBoundingBoxRelevant){
			boundingBox.update(this.xCenter - this.radius, this.yCenter - this.radius);
			boundingBox.update(this.xCenter + this.radius, this.yCenter + this.radius);
		}
	}
}