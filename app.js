
var width = 1000;
var height = 1000;
var svg = d3.select('svg')
            .attr('width', width)
            .attr('height', height);


var tooltip = d3.select("body")
                .append("div")
                .attr("class", "tooltip")
                .style("opacity",0)
                .style("position","absolute")
                .text("hello");
                ;

var projection = d3.geoAlbersUsa()
				   .translate([width/2, height/2])    // translate to center of screen
				   .scale([1000]);

var path = d3.geoPath().projection(projection);

var csvData;

d3.csv("/web_scrape.csv", function(data) {
    csvData = data




 d3.json("/states.json", function(error, us) {
  if (error) throw error;
  var stateData = us.features


  for(var i = 0; i < stateData.length; i++){
    for (var j = 0; j < csvData.length; j++){
          if(stateData[i].properties.name === csvData[j].state){
             console.log('its a match');
          }
       }
    }


  svg.append("g")
        .attr("class", "states")
        .attr("stroke", 'red')
        .attr("fill", "white")
        .selectAll("path")
        .data(us.features)
        .enter()
        .append("path")
        .attr("d", path)
        .on("mouseover", function(d) {
         tooltip.style("opacity", 1)
    });

});


});






