"use strict";

// Keep track of a graph.
class Graph {
    

    // Take in an object containing points and edges, turn that into an array of points
    constructor(points) {
	// We get an object with properties keyed by unique numbers,
	// need to make an array
	this.points = [];
	for(let p in points) {
	    // console.log(points[p]);
	    this.points[p] = points[p];
	}
	// console.log(this.points);	
	console.log("Loaded " + Object.keys(this.points).length + " points");

	// Pre-calculate edge lengths
	this.distances = [];
	for(let p of this.points) {
	    // console.log(p);
	    // Edge id: destination
	    for(let e in p.edges) {
		let p2 = this.points[p.edges[e]];
		this.distances[e] = Math.sqrt((p.x - p2.x)**2 + (p.y - p2.y)**2);
	    }
	}
	console.log(this.distances.length);
	console.log("P = " + this.P());
    }

    P() {
	return 0.1 * this.distances
	    .map(e => e)
	    .reduce((sum, x) => sum +x, 0) +
	    2.1 * 0;
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
	this.g0 = new Graph(data.points);
	this.g0.draw(this.canvasContext);
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
        // .then(j => {console.log(j); return j; } )    
	.then(j => gm.load(j));
    
}
