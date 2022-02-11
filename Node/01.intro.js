let speed = 60

//more then 80 is Too Fast 
//less then 80 is Fast
//less then 60 is ok, 

let msg = speed >= 80 ? 'Too Fast' : (speed <= 60 ? 'Ok' : 'Fast')
console.log('msg:', msg)
