import * as d3 from "d3";
import { Vector2D } from "../utils/geo";

const renderLegend = () => {
  //   svg
  //     .append("g")
  //     .attr("transform", `translate(0,${height - marginBottom})`)
  //     .call(xAxis)
  //     .call((g) => g.select(".domain").remove())
  //     .call((g) =>
  //       g
  //         .selectAll(".tick line")
  //         .clone()
  //         .attr("y2", marginTop + marginBottom - height)
  //         .attr("stroke-opacity", 0.1)
  //     )
  //     .call((g) =>
  //       g
  //         .append("text")
  //         .attr("x", width)
  //         .attr("y", marginBottom - 4)
  //         .attr("fill", "currentColor")
  //         .attr("text-anchor", "end")
  //         .text(xLabel)
  //     );
  //   svg
  //     .append("g")
  //     .attr("transform", `translate(${marginLeft},0)`)
  //     .call(yAxis)
  //     .call((g) => g.select(".domain").remove())
  //     .call((g) =>
  //       g
  //         .selectAll(".tick line")
  //         .clone()
  //         .attr("x2", width - marginLeft - marginRight)
  //         .attr("stroke-opacity", 0.1)
  //     )
  //     .call((g) =>
  //       g
  //         .append("text")
  //         .attr("x", -marginLeft)
  //         .attr("y", 10)
  //         .attr("fill", "currentColor")
  //         .attr("text-anchor", "start")
  //         .text(yLabel)
  //     );
};

type ConnectedScatterPlotOptions = {
  dotRadius: number; // (fixed) radius of dots, in pixels
  curve: d3.CurveCatmullRomFactory; // curve generator for the line
  width: number; // outer width, in pixels
  height: number; // outer height, in pixels
  inset: number; // inset the default range, in pixels
  xType: d3.ScaleLinear; // type of x-scale
  xDomain: [number, number]; // [xmin, xmax]
  xRange: [number, number];
  yType: d3.ScaleLinear; // type of y-scale
  yDomain: [number, number];
  yRange: [number, number];
  fill: string; // fill color of dots
  stroke: string; // stroke color of line and dots
  strokeWidth: number; // stroke width of line and dots
  strokeLinecap: string; // stroke line cap of line
  strokeLinejoin: string; // stroke line join of line
  duration: number; // intro animation in milliseconds (0 to disable)
};

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/connected-scatterplot
export function ConnectedScatterplot<T extends Vector2D>(
  data,
  {
    dotRadius = 3, // (fixed) radius of dots, in pixels
    curve = d3.curveCatmullRom, // curve generator for the line
    width = 640, // outer width, in pixels
    height = 400, // outer height, in pixels
    xType = d3.scaleLinear, // type of x-scale
    xDomain = [0, 6], // [xmin, xmax]
    xRange = [0, width], // [left, right]
    yType = d3.scaleLinear, // type of y-scale
    yDomain = [0, 6], // [ymin, ymax]
    yRange = [height, 0], // [bottom, top]
    fill = "white", // fill color of dots
    stroke = "currentColor", // stroke color of line and dots
    strokeWidth = 2, // stroke width of line and dots
    strokeLinecap = "round", // stroke line cap of line
    strokeLinejoin = "round", // stroke line join of line
    duration = 0, // intro animation in milliseconds (0 to disable)}: Partial<
  }: Partial<ConnectedScatterPlotOptions> = {}
) {
  const X = d3.map<T, number>(data, (d) => d.x);
  const Y = d3.map<T, number>(data, (d) => d.y);

  const I = d3.range(X.length);

  // Construct scales and axes.
  const xScale = xType(xDomain, xRange);
  const yScale = yType(yDomain, yRange);

  // Construct the line generator.
  let line = d3
    .line()
    .curve(curve)
    .x((i) => xScale(X[i]))
    .y((i) => yScale(Y[i]));

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  let path = svg
    .append("path")
    .attr("fill", "none")
    .attr("stroke", stroke)
    .attr("stroke-width", strokeWidth)
    .attr("stroke-linejoin", strokeLinejoin)
    .attr("stroke-linecap", strokeLinecap)
    .attr("d", line(I));

  svg
    .append("g")
    .attr("fill", fill)
    .attr("stroke", stroke)
    .attr("stroke-width", strokeWidth)
    .selectAll("circle")
    .data(I.filter((i) => D[i]))
    .join("circle")
    .attr("cx", (i) => xScale(X[i]))
    .attr("cy", (i) => yScale(Y[i]))
    .attr("r", dotRadius);

  // Measure the length of the given SVG path string.
  function length(path) {
    return d3.create("svg:path").attr("d", path).node().getTotalLength();
  }

  function animate() {
    if (duration > 0) {
      const l = length(line(I));

      path
        .interrupt()
        .attr("stroke-dasharray", `0,${l}`)
        .transition()
        .duration(duration)
        .ease(d3.easeLinear)
        .attr("stroke-dasharray", `${l},${l}`);

      // label
      //   .interrupt()
      //   .attr("opacity", 0)
      //   .transition()
      //   .delay(
      //     (i) => (length(line(I.filter((j) => j <= i))) / l) * (duration - 125)
      //   )
      //   .attr("opacity", 1);
    }
  }

  const renderPath = (data: T[]) => {
    const X = d3.map<T, number>(data, (d) => d.x);
    const Y = d3.map<T, number>(data, (d) => d.y);

    const I = d3.range(X.length);

    // Construct scales and axes.
    const xScale = xType(xDomain, xRange);
    const yScale = yType(yDomain, yRange);

    // Construct the line generator.
    line = d3
      .line()
      .curve(curve)
      .x((i) => xScale(X[i]))
      .y((i) => yScale(Y[i]));

    path.remove();

    path = svg
      .append("path")
      .attr("fill", "none")
      .attr("stroke", stroke)
      .attr("stroke-width", strokeWidth)
      .attr("stroke-linejoin", strokeLinejoin)
      .attr("stroke-linecap", strokeLinecap)
      .attr("d", line(I));

    svg
      .append("g")
      .attr("fill", fill)
      .attr("stroke", stroke)
      .attr("stroke-width", strokeWidth)
      .selectAll("circle")
      .data([data[data.length - 1]])
      .join("circle")
      .attr("cx", (i) => xScale(X[data.length - 1]))
      .attr("cy", (i) => yScale(Y[data.length - 1]))
      .attr("r", dotRadius);
  };

  const redrawPath = (newData: T[]) => {
    renderPath(newData);
  };

  const appendPoint = (point: T) => {
    renderPath([...data, point]);
  };

  animate();

  return Object.assign(svg.node(), { animate, redrawPath, appendPoint });
}
