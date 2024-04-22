package com.s8.pkgs.charts.tables.t1;

import com.s8.api.web.S8WebFront;
import com.s8.api.web.S8WebObject;
import com.s8.pkgs.charts.WebSources;


/**
 * table row
 */
public class T1TableRow extends S8WebObject {
	

	
	/**
	 * root webpath
	 */
	public final static String ROOT_WEBPATH = WebSources.WEBPATH + "/tables/t1";


	public T1TableRow(S8WebFront front, String typename) {
		super(front, ROOT_WEBPATH + typename);
	}




	public void setVariableName(String name) {
		vertex.outbound().setStringUTF8Field("name", name);
	}


}
