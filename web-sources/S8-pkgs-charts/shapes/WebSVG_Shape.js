


import { S8WebFront } from "/S8-pkgs-ui-carbide/S8WebFront.js";

import { WebSVG } from "/S8-pkgs-ui-websvg/WebSVG.js";
import { WebSVG_Element } from "/S8-pkgs-ui-websvg/WebSVG_Element.js";



S8WebFront.CSS_import("/S8-pkgs-ui-websvg/WebSVG.css");


/**
 * 
 */
export class WebSVG_Shape extends WebSVG_Element {



	/**
	 * @type{String} the css suffix for the solid style
	 */
	strokeSolidityStyle = WebSVG.STROKE_SOLIDITY_DEFAULT;



	constructor() {
		super();
	}



	setupStroke() {
		this.SVG_node.classList.add("websvg-element");
		this.SVG_node.setAttribute("stroke", "black");
		this.SVG_node.setAttribute("stroke-width", "1");
	}


	/**
	 * 
	 * @returns 
	 */
	getEnvelope() {
		return this.SVG_node;
	}


	/**
	 * 
	 * @param solidity
	 */
	S8_set_strokeSolidity(code) {
		if(code != WebSVG.DISABLED_FEATURE_CODE){
			this.SVG_node.setAttribute("stroke-dasharray", WebSVG.getStrokeSolidityByCode(code));
		}
		else{
			this.SVG_node.removeAttribute("stroke-dasharray");
		}
	}


	/**
	 * 
	 * @param {number} value 
	 */
	S8_set_strokeThickness(code) {
		if(code != WebSVG.DISABLED_FEATURE_CODE){
			this.SVG_node.setAttribute("stroke-width", WebSVG.getStrokeThicknessByCode(code));
		}
		else{
			this.SVG_node.removeAttribute("stroke-width");
		}
	}


	/**
	 * 
	 * @param {number} color
	 */
	S8_set_strokeColor(code) {
		if(code != WebSVG.DISABLED_FEATURE_CODE){
			this.SVG_node.setAttribute("stroke", WebSVG.getStrokeColorByCode(code));
		}
		else{
			this.SVG_node.setAttribute("stroke", "none");
		}
	}


	/**
	 * 
	 * @param {number} color
	 */
	S8_set_fillColor(code) {
		if(code != WebSVG.DISABLED_FEATURE_CODE){
			this.SVG_node.setAttribute("fill", WebSVG.getStrokeColorByCode(code));
		}
		else{
			this.SVG_node.setAttribute("fill", "none");
		}
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