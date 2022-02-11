Display = (a) => {
    console.log(a);
}

function One() {
    Display(1)
}
function Two() {
    Display(2)
}

Two()
One()
////////////////////////////////////////////////////////////////////////////////




function Display(val) {
    console.log(val);
}

//!Method1(Cal1(F)->Result(V)->Display(F))
function Cal1(x, y) {
    let z = x + y
    return z
}
let Result = Cal1(2, 3);
Display(Result)

//!Method2(Cal1(F))
function Cal1(x, y) {
    let z = x + y
    Display(z)
}
Cal1(2, 3);

