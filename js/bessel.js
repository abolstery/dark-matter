function i0(x) {
	var t = Math.abs(x) / 3.75;
	var tt = Math.pow(t,2);
	var u = 0, ti=0;
	if(tt < 1) {
		u = 1.0 +
		    tt * (3.5156229 +
			  tt * (3.0899424 +
				tt * (1.2067492 +
				      tt * (0.2659732 +
					    tt * (0.0360768 +
						  tt * 0.0045813)))));
		//console.log(u);
		return u;
	} else {
		ti = 1.0 / t;
		u = 0.39894228 +
		    ti * (0.01328592 +
			  ti * (0.00225319 +
				ti * (-0.00157565 +
				      ti * (0.00916281 +
					    ti * (-0.02057706 +
						  ti * (0.02635537 +
							ti * (-0.01647633 +
							      ti * 0.00392377)))))));
		return (u * Math.exp(Math.abs(x)) / Math.sqrt(Math.abs(x)));
	}
}

function i1(x) {
	var t = Math.abs(x) / 3.75;
	var tt = Math.pow(t,2);
	var u = 0, ti = 0;
	if (tt < 1.0) {
		u = 0.5 +
	    tt * (0.87890594 +
		  tt * (0.51498869 +
			tt * (0.15084934 +
			      tt * (0.02658733 +
				    tt * (0.00301532 +
					  tt * 0.00032411)))));
	    return u;
	} else {
		ti = 1.0 / t;
		u = 0.39894228 +
		    ti * (-0.03988024 +
			  ti * (-0.00362018 +
				ti * (0.00163801 +
				      ti * (-0.01031555 +
					    ti * (0.02282967 +
						  ti * (-0.02895312 +
							ti * (0.01787654 +
							      ti * -0.00420059)))))));
		return (u * Math.exp(Math.abs(x)) / Math.sqrt(Math.abs(x)));
	}
}

function k0(x) {
	var t = x / 2.0;
	if(t < 1) {
		var tt = Math.pow(t,2);
		var u = -0.57721566 +
	    tt * (0.42278420 +
		  tt * (0.23069756 +
			tt * (0.03488590 +
			      tt * (0.00262698 +
				    tt * (0.00010750 +
					  tt * 0.00000740)))));
	    return (u - Math.log(t) * i0(x));
	} else {
		var ti = 1.0 / t;
		var u = 1.25331414 +
		    ti * (-0.07832358 +
			  ti * (0.02189568 +
				ti * (-0.01062446 +
				      ti * (0.00587872 +
					    ti * (-0.00251540 +
						  ti * 0.00053208)))));
		return (u * Math.exp(-x) / Math.sqrt(x));
	}

}
//r = 0/60
function k1(x) {
	var t = x / 2.0;
	if (t < 1.0) {
		var tt = t * t;
		var u = 1.0 +
		    tt * (0.15443144 +
			  tt * (-0.67278579 +
				tt * (-0.18156897 +
				      tt * (-0.01919402 +
					    tt * (-0.00110404 +
						  tt * -0.00004686)))));
		return (u / x + Math.log(t) * i1(x));
	} else {
		var ti = 1.0 / t;
		var u = 1.25331414 +
		    ti * (0.23498619 +
			  ti * (-0.03655620 +
				ti * (0.01504268 +
				      ti * (-0.00780353 +
					    ti * (0.00325614 +
						  ti * -0.00068245)))));
		return (u * Math.exp(-x) / Math.sqrt(x));
	}

}