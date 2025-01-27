package com.s8.pkgs.charts.ts;

import com.s8.api.web.S8WebFront;
import com.s8.pkgs.charts.C2dChart;
import com.s8.pkgs.charts.C2dNumberFormat;

public class C2dTimeSeries extends C2dChart {

	
	/**
	 * 
	 * @param front
	 */
	public C2dTimeSeries(S8WebFront front) {
		super(front, "/ts/C2dTimeSeries");
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
		setValues(fValues);
	}
	
	
	/**
	 * 
	 * @param values
	 */
	public void setValues(float[] values) {
		vertex.outbound().setFloat32ArrayField("values", values);
	}
	

	

	/**
	 * 
	 * @param size
	 */
	public void setMargins(double size) {
		setMarginTop(size);
		setMarginRight(size);
		setMarginBottom(size);
		setMarginLeft(size);
	}
	
	
	/**
	 * 
	 * @param size
	 */
	public void setMargins(double top, double right, double bottom, double left) {
		setMarginTop(top);
		setMarginRight(right);
		setMarginBottom(bottom);
		setMarginLeft(left);
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
