//function to generate chart values, returns object with two
//params, rickshaw and chart, which hold the appropriate format
//for the data
function graph() {
	var boop = {rickshaw:[],chart:[], labels:[]};
	for(var i = 0; i < 20; i++) {
		boop.rickshaw.push({x:i,y:1.0/Math.pow(2,i)});
		boop.chart.push(1.0 / Math.pow(2,i));
		boop.labels.push(i.toString());
	}
	return boop;
}

var graphf;
var myNewChart;
var flip = false;

function main() {
	var hey = graph();
	//rickshawjs
	graphf = new Rickshaw.Graph( {
	    element: document.querySelector("#chart"), 
	    width: 500, 
	    height: 300, 
	    renderer: 'line',
	    series: [{
	        color: 'steelblue',
	        data: hey.rickshaw
	    }
	    ]
	});

	var x_axis = new Rickshaw.Graph.Axis.X( { 
		graph: graphf,
		orientation:'bottom',
		element:document.getElementById('x_axis'),

	} );

	graphf.render();

	//chartjs

	var data = {
	    labels: hey.labels,
	    datasets: [
	    {
	            label: "second",
	            fillColor: "transparent",
	            strokeColor: "blue",
	            pointColor: "blue",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: hey.labels
	        },
	        {
	            label: "My First dataset",
	            fillColor: "transparent",
	            strokeColor: "red",
	            pointColor: "red",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: hey.chart
	        }
	        
	    ]
	};


	var ctx = document.getElementById("myChart").getContext("2d");
	myNewChart = new Chart(ctx).Line(data, {
		 pointDotRadius : 1
	});
}

main();

function opdate() {
	var boop = {rickshaw:[],chart:[]};
	if(flip) {
		for(var i = 0; i < 10; i++) {
			boop.rickshaw.push({x:i,y:Math.pow(2,i)});
			myNewChart.datasets[0].points[i].value = Math.pow(2,i);
		}
		flip = false;
	} else {
		for(var i = 0; i < 10; i++) {
			boop.rickshaw.push({x:i,y:1/Math.pow(2,i)});
			myNewChart.datasets[0].points[i].value = 1/Math.pow(2,i);
		}
		flip = true;
	}
	
	graphf.series[0].data = boop.rickshaw;
	graphf.render();
	
	myNewChart.update();

}