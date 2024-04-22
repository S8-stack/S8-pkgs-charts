package com.s8.pkgs.charts.tables.t1;

import com.s8.api.web.S8WebFront;
import com.s8.pkgs.charts.WebSources;


/**
 * table row
 */
public class TimeT1TableRow extends T1TableRow {
	
	
	
	/**
	 * 
	 * @param front
	 * @param name
	 * @param value
	 * @param format
	 * @param unit
	 * @return
	 */
	public final static TimeT1TableRow create(S8WebFront front, String name, double value) {
		TimeT1TableRow row = new TimeT1TableRow(front);
		row.setVariableName(name);
		row.setVariableValue(value);
		return row;
	}

	
	/**
	 * root webpath
	 */
	public final static String ROOT_WEBPATH = WebSources.WEBPATH + "/tables/t1";


	public TimeT1TableRow(S8WebFront front) {
		super(front, "/TimeT1TableRow");
	}
	


	/**
	 * 
	 * @param value time/duraction in SI units: [s]
	 */
	public void setVariableValue(double value) {
		vertex.outbound().setFloat32Field("value", (float) value);
	}



}
