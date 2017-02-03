
var width = 1000;
var height = 1000;
var svg = d3.select('svg')
            .attr('width', width)
            .attr('height', height);

var projection = d3.geoAlbersUsa()
				   .translate([width/2, height/2])    // translate to center of screen
				   .scale([1000]);

var path = d3.geoPath().projection(projection);



d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
  if (error) throw error;


//  svg.append("path")
//      .attr("class", "state-borders")
//      .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));

  svg.append("g")
        .attr("class", "states")
        .attr("stroke", 'red')
        .attr("fill", "white")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter()
        .append("path")
        .attr("d", path);


var stateFeatures = topojson.feature(us, us.objects.states)
        console.log(stateFeatures);




      });


/*target each state by id and change the states color*/
