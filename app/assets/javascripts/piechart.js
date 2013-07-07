/**
 * @author Pedro Lopes
 */

var width = $(".span6").width();
var height = 250;
var radius = Math.min(width, height) / 2;

var color1 = d3.scale.ordinal()
  .range(["#f5a0c1", "#a0c1f5","#f5d4a0"]);

var color2 = d3.scale.ordinal()
  .range(["#f5a0c1", "#a0c1f5","#f5d4a0"]);
  
var arc = d3.svg.arc()
  .outerRadius(radius - 10)
  .innerRadius(0);

var pie = d3.layout.pie()
  .sort(null)
  .value(function(d) { return d.value; });

var pphoto = d3.select("#piephoto").append("svg")
  .attr("width", width)
  .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var gtips = d3.select("#gtips").append("svg")
  .attr("width", width)
  .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.json("photos.json", function(error, data) {
  data.forEach(function(d) {
    d.value = +d.value;
    d.gender = d.gender;
  });

  var g = pphoto.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
    .attr("class", "arc pphoto");

  g.append("path")
    .attr("d", arc)
    .style("fill", function(d) { return color1(d.data.gender); });
    
  g.append("text")
    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
    .attr("dy", ".35em")
    .style("text-anchor", "middle")
    .text(function(d) {return d.data.gender;});
});

d3.json("tips_gender.json", function(error, data) {
  data.forEach(function(d) {
    d.value = +d.value;
    d.gender = d.gender;
  });

  var g = gtips.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
    .attr("class", "arc gtips");

  g.append("path")
    .attr("d", arc)
    .style("fill", function(d) { return color2(d.value); });
    
  g.append("text")
    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
    .attr("dy", ".35em")
    .style("text-anchor", "middle")
    .text(function(d) {return d.data.gender;});
});

$(window).load(function() {
  $('.pphoto').tipsy({ 
    gravity: 'n', // Mostrar Tooltip em cima 
    html: true, // Habilita a edição do html
    fade: true, // Habilita o efeito Fade
    title: function() { // Isso que seta o titulo do tipsy
        var d = this.__data__; // Data Parse 
        return d.value + " Fotos" ;
      }
  });
  
  $('.gtips').tipsy({ 
    gravity: 'n', // Mostrar Tooltip em cima 
    html: true, // Habilita a edição do html
    fade: true, // Habilita o efeito Fade
    title: function() { // Isso que seta o titulo do tipsy
        var d = this.__data__; // Data Parse 
        return d.value + " Tips" ;
      }
  });
});