class Point{
	constructor(x, y, userData){
		this.x = x;
		this.y = y;
		this.userData = userData;
	}
}

class Rectangle{
	constructor(x, y, w, h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	contains(point){
		if(point.x <= this.x || point.x >= this.x + this.w)
			return false;
		if(point.y <= this.y || point.y >= this.y + this.h)
			return false;
		return true;
	}

	intersects(range){
		if(this.x + w <= range.x || this.x >= range.x + w)
			return false;
		if(this.y + h <= range.y || this.y >= range. y + h)
			return false;
		return true;
	}
}

class QuadTree{
	constructor( boundary, n){
		this.boundary = boundary;
		this.capacity = n;
		this.points = [];
		this.divided = false;
	}

	subdivide(){
		let	tempW = this.boundary.w / 2;
		let tempH = this.boundary.h / 2;
		let boundary_northwest = new Rectangle(this.boundary.x, this.boundary.y, tempW, tempH);
		let boundary_northeast = new Rectangle(this.boundary.x + tempW, this.boundary.y, tempW, tempH);
		let boundary_southwest = new Rectangle(this.boundary.x, this.boundary.y + tempH, tempW, tempH);
		let boundary_southeast = new Rectangle(this.boundary.x + tempW, this.boundary.y + tempH, tempW, tempH);
		let qt_northwest = new QuadTree(boundary_northwest, this.capacity); 
		let qt_northeast = new QuadTree(boundary_northeast, this.capacity);
		let qt_southwest = new QuadTree(boundary_southwest, this.capacity);
		let qt_southeast = new QuadTree(boundary_southeast, this.capacity);
		this.northeast = qt_northeast;
		this.northwest = qt_northwest;
		this.southeast = qt_southeast;
		this.southwest = qt_southwest;
		this.divided = true;
	}
	insert(point){
		if(!this.boundary.contains(point))
			return -1;
		if( this.points.length < this.capacity){
			this.points.push(point);
		}
		else{
			if(!this.divided)
				this.subdivide();
			this.northeast.insert(point);
			this.northwest.insert(point);
			this.southeast.insert(point);
			this.southwest.insert(point);
		}
		return 1;
	}
	show(){
		stroke(255);
		strokeWeight(1);
		noFill();
		rectMode(CENTER);
		rect(this.boundary.x, this.boundary.y, this.boundary.w*2, this.boundary.h*2);
		if(this.divided){
			this.northeast.show();
			this.northwest.show();
			this.southwest.show();
			this.southeast.show();
		}

		for( let p of this.points){
			strokeWeight(4);
			point(p.x, p.y);
		}
	}
}
