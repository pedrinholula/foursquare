var w = 1024;
var margin = {top: 20, right: 20, bottom: 30, left: 100},
    width = w - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var abb = d3.format("s");

var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.ordinal()
    .range(["#c1f5a0", "#a0c1f5", "#f3ca89"]);

var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(abb);

var svg = d3.select("#similar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("similar.json", function(error, data) {
  var statsName = d3.keys(data[0].stats);
  
  data.forEach(function(d) {
    d.mystats = statsName.map(function(name) { return {name: name, value: d.stats[name]}; });
  });
  
  x0.domain(data.map(function(d) { return d.name; }));
  x1.domain(statsName).rangeRoundBands([0, x0.rangeBand()]);
  y.domain([0, d3.max(data, function(d){ return d3.max(d.mystats, function(d) { return d.value; }); })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Pessoas");

  var name = 
    svg.selectAll(".name")
      .data(data)
      .enter().append('g')
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + x0(d.name) + ",0)"; });
      
  name.selectAll("rect")
    .data(function(d){ return d.mystats;})
    .enter().append("rect")
      .attr("width", x1.rangeBand())
      .attr("x", function(d) { return x1(d.name); })
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .style("fill", function(d) { return color(d.name); })
      .attr("class","rect");
      
  var legend = svg.selectAll(".legend")
      .data(statsName.slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });

});

// Código do Tipsy
$(window).load(function() {
  $('.rect').tipsy({ 
    gravity: 's', // Mostrar Tooltip em cima 
    html: true, // Habilita a edição do html
    fade: true, // Habilita o efeito Fade
    title: function() { // Isso que seta o titulo do tipsy
        var d = this.__data__; // Data Parse 
        return d.value;
      }
  });
});