let qt;
let count = 0;

function setup(){
	createCanvas(1000, 1000);
	let boundary = new Rectangle(500, 500, 500, 500);
	qt = new QuadTree(boundary, 4);

	console.log(qt);
	for(let i=0 ; i<10000; i++){
		let p = new Point(Math.random() * 1000, Math.random() * 1000);
		qt.insert(p);
	}
	background(0);
	qt.show();
}
function draw(){
	background(0);
	qt.show();

	stroke(0,255,0);
	rectMode(CENTER);
	let range = new Rectangle(mouseX, mouseY, 50, 50);
	rect( range.x, range.y, range.w*2, range.h*2);
	let points = [];
	qt.query(range, points);
	
	for(let p of points){
		strokeWeight(4);
		point(p.x, p.y);
	}
	
//	console.log(count);
}
