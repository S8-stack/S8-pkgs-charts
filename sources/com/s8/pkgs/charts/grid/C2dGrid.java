package com.s8.pkgs.charts.grid;

import java.util.ArrayList;
import java.util.List;

import com.s8.api.web.S8WebFront;
import com.s8.api.web.S8WebObject;
import com.s8.api.web.functions.none.VoidNeFunction;
import com.s8.api.web.lambdas.none.VoidLambda;
import com.s8.pkgs.charts.WebSources;

/**
 * 
 * @author pierreconvert
 *
 */
public class C2dGrid extends S8WebObject {

	
	
	public final static String ROOT_WEBPATH = WebSources.WEBPATH + "/grid";
	
	private List<C2dGridCard> cards = new ArrayList<>();

	public C2dGrid(S8WebFront branch) {
		super(branch, ROOT_WEBPATH + "/C2dGrid");
		onClickLambda(() -> unselectAllCards());
	}







	public void setCards(List<C2dGridCard> cards) {
		this.cards = cards;
		vertex.outbound().setObjectListField("cards", this.cards);
	}


	/**
	 * 
	 * @return
	 */
	public List<C2dGridCard> getCards(){
		return cards;
	}


	public void unselectAllCards() {
		List<C2dGridCard> cards = getCards();
		if(cards != null) {
			cards.forEach(card -> {
				card.clearPopover();
				card.setSelected(false);
			}); 
		}	
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
