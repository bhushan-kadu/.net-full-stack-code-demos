//Write a JavaScript program to find the area of a triangle
//  where lengths of the three of its sides are 5, 6, 7.
function areaOfTriangleDriverFunction() {
    let sides = prompt("Enter sides of triangle seperated by space");

    if (sides != null) {
        sides = sides.trim();
        sides = sides.split(" ");

        let side1 = parseFloat(sides[0]);
        let side2 = parseFloat(sides[1]);
        let side3 = parseFloat(sides[2]);

        let perimeter = side1 + side2 + side3;
        let area = Math.sqrt(perimeter * (perimeter - side1) *
            (perimeter - side2) *
            (perimeter - side3));

        alert("Area is " + area.toFixed(2));
    }
}

areaOfTriangleDriverFunction();