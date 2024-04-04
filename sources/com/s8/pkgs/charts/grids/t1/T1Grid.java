package com.s8.pkgs.charts.grids.t1;

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
public class T1Grid extends S8WebObject {

	
	
	private List<T1GridCard> cards = new ArrayList<>();

	
	/**
	 * 
	 * @param branch
	 */
	public T1Grid(S8WebFront branch) {
		super(branch, WebSources.WEBPATH + "/grids/t1/T1Grid");
		onClickLambda(() -> unselectAllCards());
	}



	
	public void setUpToDate(boolean isUpToDate) {
		vertex.outbound().setBool8Field("isUpToDate", isUpToDate);
	}




	public void setCards(List<T1GridCard> cards) {
		this.cards = cards;
		vertex.outbound().setObjectListField("cards", this.cards);
	}


	/**
	 * 
	 * @return
	 */
	public List<T1GridCard> getCards(){
		return cards;
	}


	public void unselectAllCards() {
		List<T1GridCard> cards = getCards();
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

	
	/**
	 * 
	 * @param func
	 */
	public void onSync(VoidNeFunction func) {
		vertex.inbound().setVoidMethod("on-sync", func);
	}



	/**
	 * 
	 * @param func
	 */
	public void onSync(VoidLambda lambda) {
		vertex.inbound().setVoidMethodLambda("on-sync", lambda);
	}

}
