package com.s8.pkgs.charts.ts;

import com.s8.api.web.S8WebFront;
import com.s8.pkgs.charts.C2dNumberFormat;
import com.s8.pkgs.charts.C8Chart;
import com.s8.pkgs.charts.WebSources;

public class C2dTimeSeries extends C8Chart {

	
	/**
	 * 
	 * @param front
	 */
	public C2dTimeSeries(S8WebFront front) {
		super(front, WebSources.WEBPATH + "/ts/C2dTimeSeries");
	}
	
	
	
	
	
	/**
	 * t-side of the time series definition
	 * @param t
	 */
	public void setT0(double t) {
		vertex.outbound().setFloat32Field("timeAxisT0", (float) t);
	}

	
	/**
	 * t-side of the time series definition
	 * @param t
	 */
	public void setT1(double t) {
		vertex.outbound().setFloat32Field("timeAxisT1", (float) t);
	}
	
	
	/**
	 * t-side of the time series definition
	 * @param n
	 */
	public void setTimeAxisNbTicks(int n) {
		vertex.outbound().setUInt32Field("timeAxisNbTicks", n);
	}
	
	
	/**
	 * 
	 * @param format
	 */
	public void setTimeAxisLabelFormat(C2dNumberFormat format) {
		vertex.outbound().setUInt8Field("timeAxisLabelFormat", format.code);
	}

	
	/**
	 * 
	 * @param n
	 */
	public void setValueAxisNbTicks(int n) {
		vertex.outbound().setUInt16Field("valueAxisNbTicks", n);
	}
	
	
	
	/**
	 * 
	 * @param format
	 */
	public void setValueAxisLabelFormat(C2dNumberFormat format) {
		vertex.outbound().setUInt8Field("valueAxisLabelFormat", format.code);
	}
	
	
	/**
	 * 
	 * @param size
	 */
	public void setDrawingWidth(double size) {
		vertex.outbound().setFloat32Field("drawingWidth", (float) size);
	}
	
	
	/**
	 * 
	 * @param size
	 */
	public void setDrawingHeight(double size) {
		vertex.outbound().setFloat32Field("drawingHeight", (float) size);
	}
	
	
	/**
	 * 
	 * @param values
	 */
	public void setValues(double[] values) {
		int n = values.length;
		float[] fValues = new float[n];
		for(int i = 0; i<n; i++) { fValues[i] = (float) values[i]; }
		vertex.outbound().setFloat32ArrayField("values", fValues);
	}
	

	
	/**
	 * 
	 * @param size
	 */
	public void setMarginTop(double size) {
		vertex.outbound().setFloat32Field("marginTop", (float) size);
	}
	
	/**
	 * 
	 * @param size
	 */
	public void setMarginRight(double size) {
		vertex.outbound().setFloat32Field("marginRight", (float) size);
	}
	
	/**
	 * 
	 * @param size
	 */
	public void setMarginBottom(double size) {
		vertex.outbound().setFloat32Field("marginBottom", (float) size);
	}
	
	/**
	 * 
	 * @param size
	 */
	public void setMarginLeft(double size) {
		vertex.outbound().setFloat32Field("marginLeft", (float) size);
	}
 	
	

}
