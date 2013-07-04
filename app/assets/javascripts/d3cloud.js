var fill = d3.scale.category20();

var wordData = [], w = 500, h = 500; // Pode (e deve) mudar isso aqui ahahah

d3.tsv("words.tsv", function (data) { //Funciona normalmente com CSV, agora JSON eu não faço ideia
  
  data.forEach(function(w) {
    wordData.push({text: w.word, size: w.qtd/1.5}); // Dividi a frequencia (qtd) pra ter o tamanho da fonte
                            // Vou melhorar essa parte no meu trabalho depois, mas isso você decide como fica
  });

  d3.layout.cloud().size([w, h])
    .words(wordData)
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font("Georgia").fontSize(function(w) { return w.size; })    // Impact, Helvetica, Arial, etc. funcionam
    .on("end", draw).start();                  // mas tem que mudar lá embaixo também
});

function draw(words){
  d3.select("body").append("svg")
    .attr("width", w-10).attr("height", h-10)
    .append("g")
    .attr("transform", "translate(250,250)") // Muda esses valores aqui de acordo com a altura e largura, e vai ajustando pra ver como fica melhor
    .selectAll("text")
    .data(words).enter()
    .append("text")
      .style("font-size", function(w) { return w.size + "px"; })
      .style("font-family", "Georgia")
      .style("fill", function(w, i) { return fill(i); })
      .attr("text-anchor", "middle")
      .attr("transform", function(d) { return "translate(" + [d.x,d.y] + ")rotate(" + d.rotate + ")"; })
      .text(function(w) { return w.text; });
}