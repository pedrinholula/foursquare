var w = $(".span6").width();
var margin = {top: 20, right: 20, bottom: 150, left: 40},
    width = w - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var abb = d3.format("s");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(abb);

//Checkins Count Graph
var htips = d3.select("#htips").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
d3.json("tips.json", function(error, data) {
  data.forEach(function(d) {
    d.value = +d.value;
  });

  x.domain(data.map(function(d) { return d.likes; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  htips.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
      
  htips.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")

  htips.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar htips")
      .attr("x", function(d) { return x(d.likes); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });
});


// Código do Tipsy
$(window).load(function() {
  $('.htips').tipsy({ 
    gravity: 's', // Mostrar Tooltip em cima 
    html: true, // Habilita a edição do html
    fade: true, // Habilita o efeito Fade
    title: function() { // Isso que seta o titulo do tipsy
        var d = this.__data__; // Data Parse 
        return d.value + " tips with " + d.likes + " likes";
      }
  });
});