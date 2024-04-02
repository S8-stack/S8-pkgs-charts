package com.s8.pkgs.charts.grid;

import com.s8.api.web.S8WebFront;
import com.s8.api.web.S8WebObject;
import com.s8.api.web.functions.none.VoidNeFunction;
import com.s8.api.web.lambdas.none.VoidLambda;
import com.s8.pkgs.ui.carbide.popover.Popover;


/**
 * 
 * @author pierreconvert
 *
 */
public class StdGridCard extends S8WebObject {

	
	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public StdGridCard(S8WebFront branch, String typeName) {
		super(branch, typeName);
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
	 * @param name
	 */
	public void setPopover(Popover popover) {
		vertex.outbound().setObjectField("popover", popover);
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
	
	
}
