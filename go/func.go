package main
import "fmt"
func flush(x, y int) (a,b int) {
	a = x+2
	b = y+3
	return 
}

func sum(val ...int) int {
	total := 0
	for _, val := range val {
		total+=val
	}
	return total
}
func func1() {
	fmt.Println("defer")
}
/*
func flush(x, y int) (int, int) {
	a = x+2
	b = y+3
	return 
}
调用报错
*/

func main () {
	
	fmt.Println(flush(2,3))

	fmt.Println(sum(1))
	defer func1()

	fmt.Println(sum(1,2,3))

	
}