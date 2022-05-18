"use strict";

// Keep track of a graph.
class Graph {
    
    // Take in an object containing points and edges, turn that into an array of points
    constructor(points) {
	this.points = [];
	this.distances = [];
	if(points===undefined) return;
	
	// We get an object with properties keyed by unique numbers,
	// need to make an array
	for(let p in points) {
	    this.points[p] = points[p];
	}
	console.log("Loaded " + Object.keys(this.points).length + " points");

	// Pre-calculated edge lengths might speed things up?
	for(let p of this.points) {
	    // Each edge is an id: destination pair (numbers)
	    for(let e in p.edges) {
		let p2 = this.points[p.edges[e]];
		this.distances[e] = Math.sqrt((p.x - p2.x)**2 + (p.y - p2.y)**2);
	    }
	}
    }

    
    // The desired output format is a comma separated list of
    // the edges that are missing compared to G0, the original
    exportEdges(G0) {
	let ouredges = Object.keys(this.distances);
	let g0edges = Object.keys(G0.distances);
	return g0edges.filter(e => !ouredges.includes(e))
	    .join(',');
    }

    // The average of the sums of the shortest paths from every node to every other node(?)
    // ("jokaisesta pisteestä jokaiseen muuhun pisteeseen laskettujen lyhimpien
    // liaaneja pitkin kulkevien reittien kokonaispituuksien keskiarvo.")
    averageShortestPathsSum() {
	
	return 0;
    }

    // 
    sumOfAllEdges() {
	return this.distances
	    .map(e => e)
	    .reduce((sum, x) => sum +x, 0);
    }
    
    // The goodness function, less is better
    P() {
	return 0.1 * this.sumOfAllEdges() +
	    2.1 * this.averageShortestPathsSum();
    }

    // Draw the graph onto the canvas element
    draw(canvasContext) {
	let tmp = 0;
	if(this.points !== undefined) {
            // console.log(points[0].x);
            for(let n in this.points) {
		let p = this.points[n];
		// console.log(p.x + ", "+ p.y + ": ");         
		for(let m in  p.edges) {
                    let e = p.edges[m];
                    // console.log("  - " + points[e].x + ", " + points[e].y);
                    canvasContext.moveTo(p.x, p.y);
                    canvasContext.lineTo(this.points[e].x, this.points[e].y);
                    canvasContext.stroke();
                    tmp++;
		}
            }
	}
	// console.log(tmp + " edges");
    }

}

class GraphMinimizer {

    // Loads the initial graph into a Graph object
    load(data) {
	// console.log(data);
	this.g0 = new Graph(data.points); // g0 keeps the full graph that we start from
	this.g0.draw(this.canvasContext);
	console.log("P0 = " + this.g0.P());

	/* 
	// Test export function
	let g_empty = new Graph();
	console.log(g_empty);
	console.log(g_empty.exportEdges(this.g0));
	*/
    }

    setCanvas(canvasId) {
	this.canvasContext = document.getElementById(canvasId).getContext("2d");
    }

    
    
}

// Apparently async and objects don't mix too well?
function init(jsonFile, gm, canvas) {
    gm.setCanvas(canvas);
    fetch(jsonFile)
        .then(r => r.json() )
	.then(j => gm.load(j));    
}
