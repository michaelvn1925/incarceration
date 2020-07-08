<script>
   var svg = d3.select("svg"), margin = 200,
   width = svg.attr("width") - margin,
   height = svg.attr("height") - margin;
</script>

svg.append("text")
   .attr("transform", "translate(100,0)")
   .attr("x", 50)
   .attr("y", 50)
   .attr("font-size", "20px")
   .attr("class", "title")
   .text("Incarcerated Population bar chart")

   var x = d3.scaleBand().range([0, width]).padding(0.4),
   y = d3.scaleLinear()
      .range([height, 0]);
   var g = svg.append("g")
      .attr("transform", "translate(" + 100 + "," + 100 + ")");

Ethnicity,Population
White,300
black,150
Hispanic,250
Asian,300 
Two_or_more_races,300


d3.csv("data.csv", function(error, data) {
    if (error) {
        throw error;
        }

    x.domain(data.map(function(d) { return d.Ethnicity; }));
    y.domain([0, d3.max(data, function(d) { return d.Population; })]);

g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x)).append("text")
    .attr("y", height - 250).attr("x", width - 100)
    .attr("text-anchor", "end").attr("font-size", "18px")
    .attr("stroke", "blue").text("Ethnicity");

g.append("g")
   .append("text").attr("transform", "rotate(-90)")
   .attr("y", 6).attr("dy", "-5.1em")
   .attr("text-anchor", "end").attr("font-size", "18px")
   .attr("stroke", "blue").text("Population");

g.append("g")
   .attr("transform", "translate(0, 0)")
   .call(d3.axisLeft(y))

g.selectAll(".bar")
   .data(data).enter()
   .append("rect")
   .attr("class", "bar")
   .on("mouseover", onMouseOver) 
   .on("mouseout", onMouseOut)
   .attr("x", function(d) { return x(d.Ethnicity); })
   .attr("y", function(d) { return y(d.Population); })
   .attr("width", x.bandwidth())
   .transition()
   .ease(d3.easeLinear)
   .duration(200)
   .delay(function (d, i) {
      return i * 25;
   })
   .attr("height", function(d) { return height - y(d.Population); });
});


// Mouseover 

function onMouseOver(d, i) {
d3.select(this)
    .attr('class', 'highlight');
d3.select(this)
    .transition()
    .duration(200)
    .attr('width', x.bandwidth() + 5)
    .attr("y", function(d) { return y(d.Population) - 10; })
    .attr("height", function(d) { return height - y(d.Population) + 10; });
g.append("text")
    .attr('class', 'val') 
    
    .attr('x', function() {
       return x(d.Ethnicity);
    })
    
    .attr('y', function() {
       return y(d.value) - 10;
    })
}

function onMouseOut(d, i) {
    d3.select(this).attr('class', 'bar');
    
    d3.select(this)
       .transition()     
       .duration(600).attr('width', x.bandwidth())
       .attr("y", function(d) { return y(d.Population); })
       .attr("height", function(d) { return height - y(d.Population); });
    
    d3.selectAll('.val')
       .remove()
 }
