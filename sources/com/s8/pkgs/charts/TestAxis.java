package com.s8.pkgs.charts;

public class TestAxis {

	public static void main(String[] args) {

		buildAxis(-12.3, 1227.6, 6).print();
		buildAxis(0, 1002, 4).print();
		buildAxis(-9999, 1002, 2).print();
		
	}
	
	
	
	public static Axis buildAxis(double t0, double t1, int nTicks) {
		double dt = t1 - t0;
		double targetDt = dt / nTicks;
		System.out.println(targetDt);
		System.out.println(Math.log10(targetDt));
		int p = (int) Math.floor(Math.log10(targetDt));
		System.out.println("p = "+p);
		
		double q = targetDt / Math.pow(10.0, p);
		System.out.println("q = " + q);
		
		int m = findClosestMultiple(q);
		System.out.println("m = " + m);
		
		double d = m * Math.pow(10.0, p);
		System.out.println("d = " + d);
		
		int i0 = (int) Math.floor(t0 / d);
		int i1 = (int) Math.ceil(t1 / d);
		System.out.println("i0 = "+i0+", i1="+i1);
		
		return new Axis(i0 * d, d, i1 - i0 + 1);
	}
	
	
	
	public static class Axis {
		
		
		public final double t0;
		public final double dt;
		public final int nTimes;
		
		
		public Axis(double t0, double dt, int nTimes) {
			super();
			this.t0 = t0;
			this.dt = dt;
			this.nTimes = nTimes;
		}



		public void print() {
			for(int i=0; i<nTimes; i++) {
				System.out.println("\tt["+i+"] = "+ (t0 +i * dt));
			}	
		}
	}
	
	
	public static int findClosestMultiple(double q) {
		if(q < 1.8) { return 1; }
		else if(q < 3) { return 2; }
		else { return 5; }
	}
	

}
