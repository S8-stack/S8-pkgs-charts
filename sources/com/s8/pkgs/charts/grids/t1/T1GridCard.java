package com.s8.pkgs.charts.grids.t1;

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
public class T1GridCard extends S8WebObject {

	
	public static T1GridCard create(S8WebFront front, String legend, C2dChart chart) {
		T1GridCard card = new T1GridCard(front);
		card.setLegend(legend);
		card.setContent(chart);
		return card;
	}
	
	/**
	 * 
	 * @param front
	 * @param typeName
	 */
	public T1GridCard(S8WebFront front) {
		super(front, WebSources.WEBPATH + "/grids/t1/T1GridCard");
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
	public void setContent(C2dChart content) {
		vertex.outbound().setObjectField("content", content);
	}
	
	
}
