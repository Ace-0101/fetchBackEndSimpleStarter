// Generate new cat pic
const handleClick = async () => {
    document.querySelector('.loader').innerHTML = 'Loading... 🕞 ';
    // const image = document.createElement('img');
    // image.src =
    //     'https://johnjorgenson.com/wp-content/uploads/2018/05/colorful-loader-gif-transparent.gif';
    document.querySelector('.loader').innerHTML =
        '<img src="https://cdn.dribbble.com/users/416315/screenshots/4275501/loading-hourglass.gif"></img>';

    setTimeout(async () => {
        const res = await fetch('/kitten/image');
        const json = await res.json();
        if (res.ok) {
            document.querySelector('.cat-pic').src = json.src;
        } else {
            alert(json.message);
        }
        document.querySelector('.loader').innerHTML = '';
    }, 3000);
};

document.querySelector('#new-pic').addEventListener('click', handleClick);
handleClick();

// Updates score based on button click
const updateScore = async (event) => {
    const buttonId = event.target.id;
    try {
        const res = await fetch(`kitten/${buttonId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ score: 'kitten.score' }), // body data type must match "Content-Type" header
        });
        const json = await res.json();
        document.querySelector('.score').innerHTML = json.score;
    } catch (err) {
        console.log(err);
    }
};

document.querySelector('#downvote').addEventListener('click', (event) => {
    updateScore(event);
});
document.querySelector('#upvote').addEventListener('click', async (event) => {
    updateScore(event);
});

// Listen for submit
// append child to comments class

document.querySelector('.comment-form').addEventListener('submit', (event) => {
    event.preventDefault();
    updateComments();
    // const userInput = document.querySelector('#user-comment').value;

    // const div = document.createElement('div');
    // div.innerHTML = userInput;

    // const commentList = document.querySelector('.comments');
    // commentList.appendChild(div);

    // document.querySelector('#user-comment').value = '';
});

const updateComments = async (event) => {
    try {
        const formData = new FormData(document.querySelector('.comment-form'));
        const comment = formData.get('user-comment');
        const res = await fetch(`kitten/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment }), // body data type must match "Content-Type" header
        });
        const json = await res.json();
        console.log(json.comments);
        json.comments = document.getElementById('user-comment').value;
        console.log(json.comments);
        const div = document.createElement('div');
        div.innerHTML = json.comments;

        const commentList = document.querySelector('.comments');
        commentList.appendChild(div);

        document.querySelector('.comments').appendChild(div);
        document.querySelector('#user-comment').value = '';
    } catch (err) {
        console.log(err);
    }
};
