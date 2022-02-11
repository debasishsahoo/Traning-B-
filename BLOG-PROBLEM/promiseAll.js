const promise1 = Promise.resolve('debasish');

const promise2 = 10;

const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, 'Good Morning');
})

const promise4 = fetch('http://fakestoreapi.com/products')
    .then(res => res.json());