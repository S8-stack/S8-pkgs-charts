package com.s8.pkgs.charts.grid;

import com.s8.api.web.S8WebFront;
import com.s8.api.web.S8WebObject;
import com.s8.api.web.functions.none.VoidNeFunction;
import com.s8.api.web.lambdas.none.VoidLambda;
import com.s8.pkgs.charts.C2dChart;
import com.s8.pkgs.charts.WebSources;


/**
 * 
 * @author pierreconvert
 *
 */
public class C2dGridCard extends S8WebObject {

	
	public static C2dGridCard create(S8WebFront branch, String legend, C2dChart chart) {
		C2dGridCard card = new C2dGridCard(branch);
		card.setLegend(legend);
		card.setChart(chart);
		return card;
	}
	
	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public C2dGridCard(S8WebFront branch) {
		super(branch, WebSources.WEBPATH + "/grid/C2dGridCard");
	}

	

	/**
	 * 
	 * @param name
	 */
	public void setSelected(boolean isSelected) {
		vertex.outbound().setBool8Field("isSelected", isSelected);
	}
	
	
	public void clearPopover() {
		vertex.outbound().setObjectField("popover", null);
	}
	

	
	
	/**
	 * 
	 * @param func
	 */
	public void onClick(VoidNeFunction func) {
		vertex.inbound().setVoidMethod("on-click", func);
	}
	
	

	/**
	 * 
	 * @param func
	 */
	public void onClickLambda(VoidLambda lambda) {
		vertex.inbound().setVoidMethodLambda("on-click", lambda);
	}
	
	

	/**
	 * 
	 * @param text
	 */
	public void setLegend(String text) {
		vertex.outbound().setStringUTF8Field("legend", text);
	}
	
	
	
	/**
	 * 
	 * @param value
	 */
	public void setChart(C2dChart chart) {
		vertex.outbound().setObjectField("chart", chart);
	}
	
	
}
