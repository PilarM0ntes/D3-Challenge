# D3-Challenge
## Objective

The purpose of this project is to create a scatter plot between two of the data variables included in the data.csv file (D3_data_journalism/assets/data/data.csv). These variables are: Healthcare (%) vs Poverty (%).
The scatter plot represents each state with circle elements and the state abbreviation is included in each circle.

## Description

The graphic (scatter plot) code is included in the app.js file and includes the following steps:
- Definition of the SVG area dimensions
- Definition of the chart's margins
- Definition of the chart area
- SVG area is assigned to the section with scatter ID (#scatter) in the index.html file
- Append a grouf "chartGroup" to the SVG area so we can start plotting
- Get the data from data.csv and parse the data we need to analyze: poverty and healthcare
- Create the scales and axes based on the data extracted and append them to the chartGroup
- Initialze & create the toolTip for each circle
- Create the circles from the scatter plot & add the event listener for the toolTip
- Create the circle labels (state abbreviations)
- Create the axes labels