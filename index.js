var circles = [];
var num_circles = 5;
var i, j, k;

for (i = 0; i < num_circles; i++) {
	circles.push(new Path.Circle({
		radius: 20,
		strokeColor: "black"
	}));
}

function onResize(event) {}

function onFrame(event) {
	circles.forEach(function (circle, index) {
		var rot = (event.time * 2 / Math.PI) + (index * ((Math.PI * 2) / num_circles));
		var center = new Point(view.center);
		center.x -= Math.sin(rot) * view.size.width / 4;
		center.y -= Math.cos(rot) * view.size.height / 4;
		circle.position = center;
	})
}
