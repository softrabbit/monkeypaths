"use strict";

// Keep track of a graph.
class Graph {
    constructor(points) {
	this.points = points;
	console.log("Loaded " + Object.keys(this.points).length + " points");
    }

    /*    function P() {
	return 0.1 * this.edges.map(e => e.cost());
    } */
    
    draw(canvasContext) {

	let tmp= 0;
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
	console.log(tmp + " edges");
    }

}

class GraphMinimizer {

    // Loads the initial graph into a Graph object
    load(data) {
	console.log(data);
	this.g0 = new Graph(data.points);
	this.g0.draw(this.canvasContext);
    }

    setCanvas(canvasId) {
	this.canvasContext = document.getElementById(canvasId).getContext("2d");
    }

    
    
}


function init(jsonFile, gm, canvas) {
    gm.setCanvas(canvas);
    fetch(jsonFile)
        .then(r => r.json() )
        // .then(j => {console.log(j); return j; } )    
	.then(j => gm.load(j));
    
}
