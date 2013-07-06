var w = $(".span4").width();
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = w - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

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
var cc = d3.select("#cc").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
d3.json("similar.json", function(error, data) {
  data.forEach(function(d) {
    d.checkins = +d.stats.checkinsCount;
  });

  x.domain(data.map(function(d) { return d.name; }));
  y.domain([0, d3.max(data, function(d) { return d.checkins; })]);

  cc.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  cc.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")

  cc.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar cc")
      .attr("x", function(d) { return x(d.name); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.checkins); })
      .attr("height", function(d) { return height - y(d.checkins); });
});

// Tips Count Graph
var tc = d3.select("#tc").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
d3.json("similar.json", function(error, data) {
  data.forEach(function(d) {
    d.tips = +d.stats.tipCount;
  });

  x.domain(data.map(function(d) { return d.name; }));
  y.domain([0, d3.max(data, function(d) { return d.tips; })]);

  tc.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  tc.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")

  tc.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar tc")
      .attr("x", function(d) { return x(d.name); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.tips); })
      .attr("height", function(d) { return height - y(d.tips); });
});

// Users Count Graph
var uc = d3.select("#uc").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
d3.json("similar.json", function(error, data) {
  data.forEach(function(d) {
    d.users = +d.stats.usersCount;
  });

  x.domain(data.map(function(d) { return d.name; }));
  y.domain([0, d3.max(data, function(d) { return d.users; })]);

  uc.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  uc.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")

  uc.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar uc")
      .attr("x", function(d) { return x(d.name); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.users); })
      .attr("height", function(d) { return height - y(d.users); });
});


// Código do Tipsy
$(window).load(function() {
  $('.cc').tipsy({ 
    gravity: 's', // Mostrar Tooltip em cima 
    html: true, // Habilita a edição do html
    fade: true, // Habilita o efeito Fade
    title: function() { // Isso que seta o titulo do tipsy
        var d = this.__data__; // Data Parse 
        return d.name + "</br>" + d.checkins + " Checkins";
      }
  });
  
  $('.tc').tipsy({ 
    gravity: 's', // Mostrar Tooltip em cima 
    html: true, // Habilita a edição do html
    fade: true, // Habilita o efeito Fade
    title: function() { // Isso que seta o titulo do tipsy
        var d = this.__data__; // Data Parse 
        return d.name + "</br>" + d.tips + " Tips";
      }
  });
  
  $('.uc').tipsy({ 
    gravity: 's', // Mostrar Tooltip em cima 
    html: true, // Habilita a edição do html
    fade: true, // Habilita o efeito Fade
    title: function() { // Isso que seta o titulo do tipsy
        var d = this.__data__; // Data Parse 
        return d.name + "</br>" + d.users + " Tips";
      }
  });
});