/**
 * @author Pedro Lopes
 */

var width = $(".span6").width();
var height = 250;
var radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
  .range(["#a0c1f5", "#f5a0c1","#f5d4a0"]);

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

d3.json("photos.json", function(error, data) {
  data.forEach(function(d) {
    d.value = +d.value;
    d.gender = d.gender;
  });

  var g = pphoto.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
    .attr("class", "arc");

  g.append("path")
    .attr("d", arc)
    .style("fill", function(d) { return color(d.value); });
    
  g.append("text")
    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
    .attr("dy", ".35em")
    .style("text-anchor", "middle")
    .text(function(d) {return d.data.gender;});
});

$(window).load(function() {
  $('.arc').tipsy({ 
    gravity: 'n', // Mostrar Tooltip em cima 
    html: true, // Habilita a edição do html
    fade: true, // Habilita o efeito Fade
    title: function() { // Isso que seta o titulo do tipsy
        var d = this.__data__; // Data Parse 
        return d.value + " Fotos" ;
      }
  });
});