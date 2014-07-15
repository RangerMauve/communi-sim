var circle_def = new Symbol(new Path.Circle({
	radius: 20,
	strokeColor: "black"
}));

var hub = new Path.Circle({
	radius: 10,
	fillColor: "red"
});
var hub_glow = new Path.Circle({
	radius: 15,
	strokeColor: "red"
});

var circles = [];
var num_circles = 5;
var i, j, k;

for (i = 0; i < num_circles; i++) {
	circles.push({
		shape: circle_def.place([0, 0]),
		active: null,
		child: null
	});
}

function onResize(event) {
	var pos = view.center + new Point(0, view.size.height / -6);
	hub.position = pos;
	hub_glow.position = pos - new Point(0, 3);
}

function onFrame(event) {
	var width = view.size.width;
	var height = view.size.height;
	var center = view.center;
	var time = event.time;
	hub_glow.rotate(10, hub.position);
	circles.forEach(function (circle, index) {
		var shape = circle.shape;
		var rot = (time * 2 / Math.PI) + (index * ((Math.PI * 2) / num_circles));
		var pos = new Point(center);
		pos.x -= Math.sin(rot) * width / 4;
		pos.y -= Math.cos(rot) * height / 4;
		shape.position = pos;

		if (Math.random() < 0.01) {
			if (!circle.active) {
				circle.active = 1.3;
				circle.child = new Path.Line({
					from: [pos.x, pos.y],
					to: center + new Point(0, height / -6),
					strokeColor: "red"
				});
			}
		}
		if (circle.active) {
			circle.active -= event.delta;
			circle.child.segments[0].point = pos;
		}

		if (circle.child && circle.active <= 0) {
			circle.child.remove();
			circle.child = null;
			circle.active = null;
		}
	});
}
