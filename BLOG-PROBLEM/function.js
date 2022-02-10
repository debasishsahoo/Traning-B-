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
createpost = (post, Callback) => {
    setTimeout(() => {
        posts.push(post)
        Callback()
    }, 3000);
}


createpost({ title: 'Post Five', body: 'Body Five' }, getpost)

for (let i = 0; i <= 20; i++) {
    ((index) => {
        setTimeout(() => {
            createpost({ title: `Post ${i}`, body: `Body ${i}` }, getpost);
        }, 3000 * index)
    })(i);
}



