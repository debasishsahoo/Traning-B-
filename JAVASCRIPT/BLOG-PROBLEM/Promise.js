//Blog by His Life Lessons(DB)
const posts = [
    { title: 'Post One', body: 'Body one' },
    { title: 'Post Two', body: 'Body Two' },
    { title: 'Post Three', body: 'Body Three' },
    { title: 'Post Four', body: 'Body Four' }
]

getpost = () => {
    setTimeout(() => {
        let output = '';
        posts.forEach((post) => {
            output += `<li> ${post.title}</li>`
        });
        document.body.innerHTML = output;
    }, 2000);
}



createpost = (post) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (post.title.length > 0) {
                posts.push(post)
                resolve()
            } else {
                reject('Please Provide Title')
            }
        }, 3000);
    })
}


createpost({ title: '', body: 'Body Five' })
    .then(getpost)
    .catch((err) => {
        console.log(err);
    })




