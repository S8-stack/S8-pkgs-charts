package com.s8.pkgs.charts.tables.t1;

import com.s8.api.web.S8WebFront;
import com.s8.pkgs.charts.C2dNumberFormat;
import com.s8.pkgs.charts.WebSources;


/**
 * table row
 */
public class NumberT1TableRow extends T1TableRow {
	
	
	
	/**
	 * 
	 * @param front
	 * @param name
	 * @param value
	 * @param format
	 * @param unit
	 * @return
	 */
	public final static NumberT1TableRow create(S8WebFront front, String name, double value, C2dNumberFormat format, String unit) {
		NumberT1TableRow row = new NumberT1TableRow(front);
		row.setVariableName(name);
		row.setVariableValue(value);
		row.setNumberFormat(format);
		row.setVariableUnit(unit);
		return row;
	}

	
	/**
	 * root webpath
	 */
	public final static String ROOT_WEBPATH = WebSources.WEBPATH + "/tables/t1";


	public NumberT1TableRow(S8WebFront front) {
		super(front, "/NumberT1TableRow");
	}




	/**
	 * 
	 * @param value
	 */
	public void setVariableValue(double value) {
		vertex.outbound().setFloat32Field("value", (float) value);
	}

	

	/**
	 * 
	 * @param format
	 */
	public void setNumberFormat(C2dNumberFormat format) {
		vertex.outbound().setUInt8Field("numberFormat", format.code);
	}


	public void setVariableUnit(String unit) {
		vertex.outbound().setStringUTF8Field("unit", unit);
	}



}
