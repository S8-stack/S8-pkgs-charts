package com.s8.pkgs.charts;

import com.s8.api.web.S8WebFront;

public class C8TimeSeries extends C8Chart {

	
	/**
	 * 
	 * @param front
	 */
	public C8TimeSeries(S8WebFront front) {
		super(front, WebSources.WEBPATH + "/C8TimeSerie");
	}
	
	
	/**
	 * t-side of the time series definition
	 * @param t
	 */
	public void setT0(double t) {
		vertex.outbound().setFloat32Field("t0", (float) t);
	}

	
	/**
	 * t-side of the time series definition
	 * @param t
	 */
	public void setT1(double t) {
		vertex.outbound().setFloat32Field("t1", (float) t);
	}
	
	
	/**
	 * t-side of the time series definition
	 * @param n
	 */
	public void setNTimes(int n) {
		vertex.outbound().setUInt32Field("nTimes", n);
	}

	
	public void setTAxisNbTicks(int n) {
		vertex.outbound().setUInt16Field("TAxisNbTicks", n);
	}
	
	public void setVAxisNbTicks(int n) {
		vertex.outbound().setUInt16Field("VAxisNbTicks", n);
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
	
	
	

}
