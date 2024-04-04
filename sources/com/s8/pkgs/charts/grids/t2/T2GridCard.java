package com.s8.pkgs.charts.grids.t2;

import com.s8.api.web.S8WebFront;
import com.s8.api.web.S8WebObject;
import com.s8.api.web.functions.none.VoidNeFunction;
import com.s8.api.web.lambdas.none.VoidLambda;
import com.s8.pkgs.charts.WebSources;
import com.s8.pkgs.ui.carbide.icons.SVG_CarbideIcon;


/**
 * 
 * @author pierreconvert
 *
 */
public class T2GridCard extends S8WebObject {

	
	/**
	 * 
	 * @param front
	 * @param icon
	 * @param legend
	 * @param chart
	 * @return
	 */
	public static T2GridCard create(S8WebFront front, SVG_CarbideIcon icon, String legend, S8WebObject content) {
		T2GridCard card = new T2GridCard(front);
		card.setIcon(icon);
		card.setLegend(legend);
		card.setContent(content);
		return card;
	}
	
	/**
	 * 
	 * @param front
	 * @param typeName
	 */
	public T2GridCard(S8WebFront front) {
		super(front, WebSources.WEBPATH + "/grids/t2/T2GridCard");
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
	public void setIcon(SVG_CarbideIcon icon) {
		vertex.outbound().setUInt16Field("icon", icon.code);
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
	public void setContent(S8WebObject content) {
		vertex.outbound().setObjectField("content", content);
	}
	
	
}
