//Hoja de codigos matemáticos que ayudan al funcionamiento del programa

const PI2 = Math.PI * 2;

function RandomBetween(min, max)
{
    return (Math.random() * (max - min)) + min;
}

//Generador de colores aleatorios
function GetRandomColor() {
    var r = 255 * Math.random();
    var g = 255 * Math.random();
    var b = 255 * Math.random();
    var rgb = `rgb(${r}, ${g}, ${b})`;
    return rgb;
}

function PointInsideCircle(pointPosition, circlePosition, circleRadius)
{
    const difX = pointPosition.x - circlePosition.x;
    const difY = pointPosition.y - circlePosition.y;

    const dist = Math.sqrt(difX * difX + difY * difY);

    return dist < circleRadius;
}

function SqrDistance(p1, p2)
{
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;

    return (dx * dx) + (dy * dy);
}

function PointInsideCircle2(pointPosition, circlePosition, circleSqrRadius)
{
    return SqrDistance(pointPosition, circlePosition) < circleSqrRadius;
}

function PointInsideRectangle(point, rectangle)
{
    return point.x >= (rectangle.position.x) &&
           point.x <= (rectangle.position.x + rectangle.width) &&
           point.y >= (rectangle.position.y) &&
           point.y <= (rectangle.position.y + rectangle.height);
}

function CheckCollisionPolygon(point, polygon)
{
    // polygon es un array de puntos
    let count = polygon.length;
    for (var i = 0; i < polygon.length; i++)
    {
        let d = PointToSegmentSign(polygon[i], polygon[(i + 1) % polygon.length], point);
        if (d < 0)
            count--;
    }
    return (count == 0);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function lerp(A,B,t){
    return A+(B-A)*t;
}

function getIntersection(A,B,C,D){ 
    const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
    const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
    const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
    
    if(bottom!=0){
        const t=tTop/bottom;
        const u=uTop/bottom;
        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                x:lerp(A.x,B.x,t),
                y:lerp(A.y,B.y,t),
                offset:t
            }
        }
    }

    return null;
}

function ComprobarColisionPoligono(boat, polygon)
{
    // polygon es un array de puntos
    let count = polygon.length * boat.length;
    
    for (var i = 0; i < polygon.length; i++)
    {
        for (let j = 0; j < boat.length; j++) {

            let d = getIntersection(polygon[i], polygon[(i + 1) % polygon.length], boat[j], boat[(j + 1) % boat.length]);
            if (d == null)
            count--;

        }
    }
    return (count != 0);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function DistancePointToSegment (A, B, p)
{
    // A y B son los puntos de la recta
    return (((B.x - A.x)*(A.y - p.y) - (A.x - p.x)*(B.y - A.y)) /
            (Math.sqrt((B.x - A.x)*(B.x - A.x) + (B.y - A.y)*(B.y - A.y))));
}

function PointToSegmentSign(A, B, p)
{
    return ((B.x - A.x)*(A.y - p.y) - (A.x - p.x)*(B.y - A.y));
}

function RotatePointAroundPoint(origCoord, pointCoord, angle)
{
    var x = pointCoord.x,
        y = pointCoord.y,
        cx = origCoord.x,
        cy = origCoord.y;
    var rad = angle;
    var cos = Math.cos(rad);
    var sin = Math.sin(rad);
    return {
        x: (cos * (x - cx)) + (sin * (y - cy)) + cx,
        y: (cos * (y - cy)) - (sin * (x - cx)) + cy
    };
}