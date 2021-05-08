// Define SVG area dimensions
let svgWidth = 960;
let svgHeight = 660;

// Define the chart's margins as an object
let chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
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
    console.log(census_data);

    let selectedData = {
        healthcare: census_data.map(item => +item.healthcare),
        poverty: census_data.map(item => +item.poverty)
    };

    console.log(selectedData);
    
    // Create Scales
    let xScale = d3.scaleLinear()
        .domain([0, d3.max(selectedData.poverty)])
        .range([0, chartWidth]);
    let yScale = d3.scaleLinear()
        .domain([0,d3.max(selectedData.healthcare)])
        .range([chartHeight,0]);

    // Create axes
    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale);

    // Append two SVG group elements to the chart
    // & create the bottom and left axis

    chartGroup.append("g")
        .call(yAxis);
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);
    
    // chartGroup.selectAll("dot")
    //     .data(census_data)
    //     .enter()
    //     .append("circle")
    //         .attr("cx", d => xScale)
    


});

