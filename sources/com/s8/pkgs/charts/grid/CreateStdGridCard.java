package com.s8.pkgs.charts.grid;

import com.s8.api.web.S8WebFront;


/**
 * 
 * 
 * 
 * @author pierreconvert
 *
 */
public class CreateStdGridCard extends StdGridCard {
	
	public static CreateStdGridCard create(S8WebFront branch) {
		CreateStdGridCard card = new CreateStdGridCard(branch);
		return card;
	}

	
	
	/**
	 * 
	 * @param branch
	 */
	public CreateStdGridCard(S8WebFront branch) {
		super(branch, C2dGrid.ROOT_WEBPATH + "/CreateStdGridCard");
	}
	
	
	
}
