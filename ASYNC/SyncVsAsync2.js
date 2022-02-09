function fun1() { console.log(1) }
function fun2() { console.log(2) }
setTimeout(fun2, 5000)
function fun3() { console.log(3) }
fun1()
fun3() 
