
var ctx = document.getElementById("chart").getContext("2d");
var myChart = null;
var notCharted = true;
var curr_r = document.getElementsByClassName('range-slider round')[0].getAttribute('data-slider');

//when you inrease MTL ratio, implies more dark matter so the halo weight is more
//when you decrease then less dark matter and the halo weight is less

function all() {
    var gph = {labels:[], plummer:[], halo:[], expdisk:[], sum:[]};
    var sliders = document.getElementsByClassName('range-slider round');
    var radius = sliders[0].getAttribute('data-slider');
    var mass = sliders[1].getAttribute('data-slider');
    var mtl = sliders[2].getAttribute('data-slider');
    var plum_rc = 4.6;
    var rc = 150;
    for (var r = 0; r < radius; r+= 1) {
        //label set
        gph.labels.push(r.toString());

        //plummer
        var p_phi = (mass*1600000000000)/Math.sqrt(Math.pow(plum_rc,2)+Math.pow(r,2));
        var p_vel = Math.sqrt(r*p_phi);
        gph.plummer.push(p_vel);

        //halo
        var h_phi = (mass*1600000000000)/rc*Math.log(Math.pow(rc,2)+Math.pow(r,2));
        var h_vel = Math.sqrt(r*h_phi);
        gph.halo.push(h_vel);

        //expdisk
        var e_vel = 0;
        if(r == 0) {
            gph.expdisk.push(0); 
        } else {
            var alpha = 1/20;
            var x = .5 * r * alpha;
            var bessels = (i0(x)*k1(x)) - (i1(x)*k0(x));
            var exp = bessels * 160000;
            e_vel = exp;
            gph.expdisk.push(exp);
        }

        //all of them
        var be_ratio = (15-mtl)/2; //ratio for disk and bessel. based on mass to light ratio
        gph.sum.push(((be_ratio/15)*p_vel+(mtl/15)*h_vel+(be_ratio/15)*e_vel)*3.5);
    }
    return gph;
}

function plummer() {
    var obj = {velocities:[], labels:[]};
    var sliders = document.getElementsByClassName('range-slider round');
    var radius = sliders[0].getAttribute('data-slider');
    var mass = sliders[1].getAttribute('data-slider');
    var rc = 4.6
    for (var r = 0; r < radius; r+= 1) {
        //var radius_temp = r*1000;
        var phi = (mass*1600000000000)/Math.sqrt(Math.pow(rc,2)+Math.pow(r,2));
        var vel = Math.sqrt(r*phi);
        obj.velocities.push(vel);
        obj.labels.push(r.toString());
    };
    return obj;
}

function log_halo() {
    //add a factor for the mass to light ratio
    //mc = 1.6x10^12
    //rc = 150
    var obj = {velocities:[], labels:[]};
    var sliders = document.getElementsByClassName('range-slider round');
    var radius = sliders[0].getAttribute('data-slider');
    var mass = sliders[1].getAttribute('data-slider');
    var rc = 150;
    for (var r = 0; r < radius; r+= 1) {
        var phi = (mass*1600000000000)/rc*Math.log(Math.pow(rc,2)+Math.pow(r,2));
        var vel = Math.sqrt(r*phi);
        obj.velocities.push(vel);
        obj.labels.push(r.toString());
    };
    return obj;

}

function expdisk() {
    //X CANNOT BE NEGATIVE!!!!!
    var obj = {velocities:[], labels:[]};
    var sliders = document.getElementsByClassName('range-slider round');
    var radius = sliders[0].getAttribute('data-slider');
    var mass = sliders[1].getAttribute('data-slider');
    var m_t_l = sliders[2].getAttribute('data-slider');
    var rc = 150;
    obj.velocities.push(0); //mass*1600000
    obj.labels.push("0");
    for (var r = 1; r < radius; r+= 1) {
        var alpha = 1/20;
        var x = .5 * r * alpha;
        var rd = 30;
        var bessels = (i0(x)*k1(x)) - (i1(x)*k0(x));
        var phi = (mass*1600000000000)/bessels;
        var vel = Math.sqrt(r*phi);
        var temp = bessels * 160000;
        obj.velocities.push(temp);
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
            for (var i = 0; i < 4; i++) {
                for(var j = 0; j < finish; j++) {
                    myChart.datasets[i].points[j].value = data.datasets[i].data[j];
                }
            };
            myChart.update();
        }
    }
    
}

function graph() {
	var gph = all();
	var data = {
        labels: gph.labels,
        datasets: [
        {
            label: "Bulge",
            fillColor: "transparent",
            strokeColor: "blue",
            pointColor: "blue",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: gph.plummer
        },
        {
            label: "Halo",
            fillColor: "transparent",
            strokeColor: "red",
            pointColor: "red",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: gph.halo
        },
        {
            label: "Disk",
            fillColor: "transparent",
            strokeColor: "purple",
            pointColor: "purple",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: gph.expdisk
        },
        {
            label: "Sum",
            fillColor: "transparent",
            strokeColor: "green",
            pointColor: "green",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: gph.sum
        }
        ]
    };
    chart_it(data);
}
