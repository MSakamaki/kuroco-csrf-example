
async function onSubmit() {
    const id = document.getElementById('comment_id');
    const message = document.getElementById('message');

    await fetch(`https://bg-check.g.kuroco.app/rcms-api/1/feed/update/${id.value}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ subject: message.value }),
    });
    await getFeeds();
}

async function login() {
    const user = document.getElementById('user');
    const passwd = document.getElementById('passwd');
    await fetch(`https://bg-check.g.kuroco.app/rcms-api/3/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({
            "email": user.value,
            "password": passwd.value
        }),
    });
    await getFeeds();
}

async function getFeeds() {
    const feedElement = document.getElementById('feeds');
    const feeds = await fetch(`https://bg-check.g.kuroco.app/rcms-api/1/feeds`, {
        method: 'GET',
        credentials: 'include'
    }).then(r => r.json());
    console.log(feeds);
    feedElement.innerHTML = `<ul>${feeds.list.map(({ topics_id, subject }) => `<li>ID:[${topics_id}] SUBJECT:[${subject}]</li>`)}</ul>`
}
