// Define SVG area dimensions
let svgWidth = 960;
let svgHeight = 660;

// Define the chart's margins as an object
let chartMargin = {
  top: 30,
  right: 30,
  bottom: 80,
  left: 60
};

// Define dimensions of the chart area
let chartWidth = svgWidth - chartMargin.left - chartMargin.right;
let chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
let svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
let chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load the data frm data.csv
d3.csv("./assets/data/data.csv").then(function(census_data){

    // let selectedData = {
    //     poverty: census_data.map(item => +item.poverty),
    //     healthcare: census_data.map(item => +item.healthcare)    
    // };

    census_data.forEach(function(data){
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
    });

    console.log(census_data);
    
    // Create Scales
    let xScale = d3.scaleLinear()
        .domain([8, d3.max(census_data, d => d.poverty)])
        .range([0, chartWidth]);
    let yScale = d3.scaleLinear()
        .domain([0,d3.max(census_data, d => d.healthcare)])
        .range([chartHeight, 0]);

    // Create axes
    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale);

    // Append two SVG group elements to the chart
    // & create the bottom and left axis

    chartGroup.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(xAxis);
    
    chartGroup.append("g")
      .call(yAxis);
    
    let circleGroup = chartGroup.selectAll(".stateCircle")
        .data(census_data)
        .enter()
        .append("circle")
        .attr("class", "stateCircle")
        .attr("cx", d => xScale(d.poverty))
        .attr("cy", d => yScale(d.healthcare))
        .attr("r", "20")

    console.log(chartGroup.selectAll("text"));
    
    // Create circle labels
    chartGroup.selectAll(".stateText")
      .data(census_data)
      .enter()
      .append("text")
      .attr("class", "stateText")
      .attr("x", d => xScale(d.poverty))
      .attr("y", d => yScale(d.healthcare)+3)
      .text(d => d.abbr)

      console.log(d3.selectAll(".stateText"));
    
      // Create axes labels
      chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - chartMargin.left)
      .attr("x", 0 - (svgHeight / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

      chartGroup.append("text")
      .attr("transform", `translate(${svgWidth / 2}, ${svgHeight-50})`)
      .attr("y", 0)
      .attr("x", -50)
      .attr("class", "axisText")
      .text("In Poverty (%)");

    

    


});

