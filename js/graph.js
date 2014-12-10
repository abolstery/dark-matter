function plummer() {
				var obj = {velocities:[], labels:[]};
                var sliders = document.getElementsByClassName('range-slider round');
				var radius = sliders[0].getAttribute('data-slider');
				var mass = sliders[1].getAttribute('data-slider');
				var rc = 1000
				for (var r = 0; r < radius; r++) {
                    //var radius_temp = r*1000;
					var phi = (mass)/Math.sqrt(rc^2+r^2)
					obj.velocities.push(Math.sqrt(r*phi))
                    obj.labels.push(r.toString());
				};
				return obj;
}

function graph() {
	var sliders = document.getElementsByClassName('range-slider round');
	var currSize = sliders[0].getAttribute('data-slider');
	var currMass = sliders[1].getAttribute('data-slider');
	var currMtLRatio = sliders[2].getAttribute('data-slider');
	
	var bulge = plummer(); //referenced from plummer.c
	var data = {
        labels: bulge.labels,
        datasets: [
        {
            label: "first",
            fillColor: "transparent",
            strokeColor: "blue",
            pointColor: "blue",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: bulge.velocities
        }
        ]
    };
	var ctx = document.getElementById("chart").getContext("2d");
	var myNewChart = new Chart(ctx).Line(data, {
         pointDotRadius : 1,
         pointDot : false,
         scaleShowGridLines : false,
         pointHitDetectionRadius : 1
    });
}
