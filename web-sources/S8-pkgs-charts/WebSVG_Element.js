

import { NeObject } from "/S8-core-bohr-neon/NeObject.js";

import { S8WebFront } from "/S8-pkgs-ui-carbide/S8WebFront.js";

import { WebSVG } from "/S8-pkgs-ui-websvg/WebSVG.js";
import { WebSVG_Canvas } from "/S8-pkgs-ui-websvg/WebSVG_Canvas.js";



S8WebFront.CSS_import("/S8-pkgs-ui-websvg/WebSVG.css");


/**
 * 
 */
export class WebSVG_Element extends NeObject {

	/**
	 * @type{WebSVG_Canvas}
	 */
	canvas = null;


	/**
	 * @type{SVGElement}
	 */
	SVG_node;



	/**
	 * @type{boolean}
	 */
	isBoundingBoxRelevant = true;



	constructor() {
		super();
	}



	setupStroke() {
		this.SVG_node.setAttribute("stroke", "black");
		this.SVG_node.setAttribute("stroke-width", "1");
	}


	/**
	 * 
	 * @param {WebSVG_Canvas} canvas 
	 */
	link(canvas) {
		this.canvas = canvas;
	}


	/**
	 * 
	 * @returns 
	 */
	getEnvelope() {
		return this.SVG_node;
	}


	S8_set_isBoundingBoxRelevant(state) {
		this.isBoundingBoxRelevant = state;
	}



	requestRedraw() {
		if (this.canvas != null) {
			// notify required redrawing
			this.canvas.isRedrawingRequired = true;
		}
	}


	S8_render() { /* no post-processing */ }

	S8_dispose() {  /* nothing to dispose */ }
}