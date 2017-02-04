//Set Dimensions of svg
var width = 750;
var height = 600;
var svg = d3.select('svg')
            .attr('width', width)
            .attr('height', height);

//Color Scale
var colorScale = d3.scaleLinear()
                   .domain([0, 6])
                   .range(['purple', 'navy']);

//Declare Tooltip for holding text on hover
var tooltip = d3.select("body")
                .append("div")
                .attr("class", "tooltip")
                .style("opacity",0)
                .style("position","absolute");


//Path for TopoJson
var projection = d3.geoAlbersUsa()
				   .translate([width/2, height/2])    // translate to center of screen
				   .scale([1000]);

var path = d3.geoPath().projection(projection);

//CSV data declaration
var csvData;

//Get csvData from .csv
d3.csv("/web_scrape.csv", function(data) {
    csvData = data
//Get state data to populate map
d3.json("/states.json", function(error, us) {
  if (error) throw error;
  var stateData = us.features

//Check if there is a match of CSV States Name and JSON States Names
// Set new properties on the JSON data to correlate with the data in the CSV
  for(var i = 0; i < stateData.length; i++){
    for (var j = 0; j < csvData.length; j++){
          if(stateData[i].properties.name === csvData[j].state){
             stateData[i]['rank'] = parseInt(csvData[j].rank)
             stateData[i]['total'] = parseInt(csvData[j].total)
             stateData[i]['aadpmr'] = parseFloat(csvData[j].aadpmr)
          }
       }
    }

//Append the CSV
  svg.append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(us.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr('fill', d => colorScale(d.aadpmr))
        .on("mouseover", function(d) {
            tooltip.style("opacity", 1)
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY + "px")
            .html('<div/>' + d.properties.name + '<br/> Total Deaths: ' + d.total + '<br/> U.S. Per Capita Rank: ' + d.rank + '<br/> Average Annual Deaths Per Million Residents: ' + d.aadpmr + '</div>')

         .on("mouseout", function(d) {
        tooltip.style("opacity", 0);
         });
      });
   });
});






