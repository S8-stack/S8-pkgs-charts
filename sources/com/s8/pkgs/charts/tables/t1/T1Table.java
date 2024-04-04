package com.s8.pkgs.charts.tables.t1;

import java.util.List;

import com.s8.api.web.S8WebFront;
import com.s8.api.web.S8WebObject;
import com.s8.pkgs.charts.WebSources;


/**
 * 
 */
public class T1Table extends S8WebObject {

	
	
	public final static String ROOT_WEBPATH = WebSources.WEBPATH + "/tables/t1";
	

	public T1Table(S8WebFront front) {
		super(front, ROOT_WEBPATH + "/T1Table");
	}



	
	public void setUpToDate(boolean isUpToDate) {
		vertex.outbound().setBool8Field("isUpToDate", isUpToDate);
	}




	public void setRows(List<T1TableRow> rows) {
		vertex.outbound().setObjectListField("rows", rows);
	}


}
