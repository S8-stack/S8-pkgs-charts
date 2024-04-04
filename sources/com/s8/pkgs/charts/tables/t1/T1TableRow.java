package com.s8.pkgs.charts.tables.t1;

import com.s8.api.web.S8WebFront;
import com.s8.api.web.S8WebObject;
import com.s8.pkgs.charts.C2dNumberFormat;
import com.s8.pkgs.charts.WebSources;


/**
 * table row
 */
public class T1TableRow extends S8WebObject {
	
	
	
	/**
	 * 
	 * @param front
	 * @param name
	 * @param value
	 * @param format
	 * @param unit
	 * @return
	 */
	public final static T1TableRow create(S8WebFront front, String name, double value, C2dNumberFormat format, String unit) {
		T1TableRow row = new T1TableRow(front);
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


	public T1TableRow(S8WebFront front) {
		super(front, ROOT_WEBPATH + "/T1TableRow");
	}




	public void setVariableName(String name) {
		vertex.outbound().setStringUTF8Field("name", name);
	}



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
