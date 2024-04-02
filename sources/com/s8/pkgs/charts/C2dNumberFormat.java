package com.s8.pkgs.charts;

import java.text.DecimalFormat;


/**
 * 
 * @author pierreconvert
 *
 */
public enum C2dNumberFormat {

	
	STD2(0x22, new DecimalFormat("##,##0.##")),
	STD3(0x23, new DecimalFormat("##,##0.###")),
	STD4(0x24, new DecimalFormat("##,##0.####")),
	STD6(0x25, new DecimalFormat("##,##0.######")),
	
	SCI2(0x42, new DecimalFormat("##0.00E0")),
	SCI3(0x43, new DecimalFormat("##0.000E0")),
	SCI4(0x44, new DecimalFormat("##0.0000E0")),
	SCI6(0x46, new DecimalFormat("##0.000000E0"));
	
	
	
	public final int code;
	
	public final DecimalFormat pattern;
	

	
	private C2dNumberFormat(int code, DecimalFormat pattern) {
		this.code = code;
		this.pattern = pattern;
	}


	public String format(double value) {
		return this.pattern.format(value);
	}
	
	
	/**
	 * 
	 */
	public final static String JS_MAP_NAME = "S8_NumberFormats";
	

	public static void compile() {
		StringBuilder builder = new StringBuilder();
		for(C2dNumberFormat format : C2dNumberFormat.values()) {
			builder.append("/** "+format.name()+" */\n");	
			builder.append(JS_MAP_NAME+"["+String.format("0x%02x", format.code)+"] = TODO;\n");	
			builder.append("\n");	
		}
		String codeSection = builder.toString();
		System.out.println(codeSection);
	}
	
	public static void main(String[] args) {
		C2dNumberFormat.compile();
	}
}
