/* Mocap Visualization
   Fun with D3 curve functions

   By Omid Alemi
   (C) Feb 2017
*/


const  startFrame = 900;
const endFrame = 3520;

const randLogScale = window.d3.scaleLog()
  .base(10)
  .domain([(1), (endFrame - startFrame)])
  .range([150, 0]);

function boneFunction(d, k) {
  var randCoef = randLogScale((k+1));

  var scale = 8;
  var fig = {};
  var ftop = 670;
  var fleft = 410;

  var bf = window.d3.line()
      .x(function(d) { return d.x1  * scale + fleft + Math.random() * randCoef; })
      .y(function(d) { return d.y1  * scale + ftop + Math.random() * randCoef; })
      // .curve(window.d3.curveCatmullRom)// .curve(window.d3.curveBundle.beta(1))// .curve(window.d3.curveBasis)// .curve(window.d3.curveNatural)
      .curve(window.d3.curveCardinal)
    // .curve(window.d3.curveStepAfter)
  ;
  return bf(d);
};

class VisualizationEngine {
  // Parameters
  scale = 8;
  fig = {};
  ftop = 670;
  fleft = 410;

  startFrame = 900;
  endFrame = 3520;
  parent = null;
  svg = null;

  c = null;

  constructor(querySelector) {
    this.parent = window.d3.select("body").select(querySelector);
    this.svg = this.parent.append("svg")
      .attr("width", 800)
      .attr("height", 800);
  }

  randLinScale = window.d3.scaleLinear()
    .domain([0, (this.endFrame-this.startFrame)])
    .range([100, 0]);

  cruveBoneFcn(j) {
    this.c = j;
    if (j._exit === undefined) {
      this.c = j.append("path")
        .attr("class","bone-positions")
        .attr("stroke", "black")
        .attr("stroke-opacity", 0.2)
        .attr("stroke-width", 0.1)
        .attr("fill", "transparent");
    }
    this.c.transition()
      .attr("d", (d,i) => {
        return boneFunction(d,i);
      });
  };


  dataLoaded() {
    if (window.top && window.top.loaded)
      window.top.loaded();
  };

  run() {
    this.fig = window.MovaViz('BEA')
      .debug(true)
      .data('https://www.sfu.ca/~oalemi/data/KAREN_BEAS_001_original.bvh','bvh', this.dataLoaded)
      .container(this.svg);

    this.fig.addDrawMethod(this.cruveBoneFcn, 'bone-positions', [this.startFrame,this.endFrame], 1);
  }
}

export default VisualizationEngine
