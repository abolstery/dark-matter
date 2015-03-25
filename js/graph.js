
var ctx = document.getElementById("chart").getContext("2d");
var myChart = null;
var notCharted = true;
var curr_r = document.getElementsByClassName('range-slider round')[0].getAttribute('data-slider');

function plummer() {
    var obj = {velocities:[], labels:[]};
    var sliders = document.getElementsByClassName('range-slider round');
    var radius = sliders[0].getAttribute('data-slider');
    var mass = sliders[1].getAttribute('data-slider');
    var rc = 4.6
    for (var r = 0; r < radius; r+= 1) {
        //var radius_temp = r*1000;
        var phi = (mass*20000000000)/Math.sqrt(Math.pow(rc,2)+Math.pow(r,2));
        var vel = Math.sqrt(r*phi);
        obj.velocities.push(vel);
        obj.labels.push(r.toString());
    };
    return obj;
}

function log_halo() {
    //mc = 1.6x10^12
    //rc = 150
    var obj = {velocities:[], labels:[]};
    var sliders = document.getElementsByClassName('range-slider round');
    var radius = sliders[0].getAttribute('data-slider');
    var mass = sliders[1].getAttribute('data-slider');
    var rc = 150;
    for (var r = 0; r < radius; r+= 1) {
        var phi = (mass*1600000000000)/Math.sqrt(Math.pow(rc,2)+Math.pow(r,2));
        var vel = Math.sqrt(r*phi);
        obj.velocities.push(vel);
        obj.labels.push(r.toString());
    };
    return obj;

}

function chart_it(data) {
    if(notCharted) {
        if(myChart != null) {
            myChart.destroy();
        }
        myChart = new Chart(ctx).Line(data, {
             pointDotRadius : 1,
             pointDot : false,
             scaleShowGridLines : false,
             pointHitDetectionRadius : 1
        });
        notCharted = false;
    } else {
        var finish = document.getElementsByClassName('range-slider round')[0].getAttribute('data-slider')
        if(finish != curr_r) {
            myChart.destroy();
            myChart = new Chart(ctx).Line(data, {
                pointDotRadius : 1,
                pointDot : false,
                scaleShowGridLines : false,
                pointHitDetectionRadius : 1
             });
            curr_r = finish;
        } else {
            for (var i = 0; i < 2; i++) {
                for(var j = 0; j < finish; j++) {
                    myChart.datasets[i].points[j].value = data.datasets[i].data[j];
                }
            };
            myChart.update();
        }
    }
    
}

function graph() {
	var bulge = plummer(); //referenced from plummer.c
    var log = log_halo();
	var data = {
        labels: bulge.labels,
        datasets: [
        {
            label: "Bulge",
            fillColor: "transparent",
            strokeColor: "blue",
            pointColor: "blue",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: bulge.velocities
        },
        {
            label: "Halo",
            fillColor: "transparent",
            strokeColor: "red",
            pointColor: "red",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: log.velocities
        }
        ]
    };
    chart_it(data);
}
