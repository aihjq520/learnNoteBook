package main
import "fmt"


type Point struct {
    x int
    y int
}

// traditional function
func Square(p, q Point) int {
    return q.x-p.x, q.y-p.y
}

func (p Point) Square() int {
    return p.x * p.y
}


func main() {
	p := Point{1, 2}
	p := Point{3, 4}
	fmt.Println(Square(p, q)) // "5", function call
	fmt.Println(p.Square())  // "2", method call
}