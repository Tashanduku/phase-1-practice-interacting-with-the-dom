// DOM Elements
const counter = document.getElementById("counter");
const minusBtn = document.getElementById("minus");
const plusBtn = document.getElementById("plus");
const heartBtn = document.getElementById("heart");
const pauseBtn = document.getElementById("pause");
const likesList = document.querySelector(".likes");
const commentForm = document.getElementById("comment-form");
const commentInput = document.getElementById("comment-input");
const commentList = document.getElementById("comment-list");

// Timer Variables
let count = 0;
let isPaused = false;
let interval;

// Start Counter Timer
function startTimer() {
    interval = setInterval(() => {
        if (!isPaused) {
            count++;
            updateCounter();
        }
    }, 1000);
}

// Update Counter Display
function updateCounter() {
    counter.textContent = count;
}

// Pause or Resume Counter
function togglePause() {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? "resume" : "pause";
    const buttons = [minusBtn, plusBtn, heartBtn];
    buttons.forEach((button) => {
        button.disabled = isPaused;
    });
}

// Handle Increment
function incrementCounter() {
    count++;
    updateCounter();
}

// Handle Decrement
function decrementCounter() {
    count--;
    updateCounter();
}

// Handle Likes
function likeNumber() {
    const existingLike = document.querySelector(`[data-num="${count}"]`);
    if (existingLike) {
        const likeCount = parseInt(existingLike.dataset.likes) + 1;
        existingLike.dataset.likes = likeCount;
        existingLike.textContent = `${count} has been liked ${likeCount} times`;
    } else {
        const likeItem = document.createElement("li");
        likeItem.dataset.num = count;
        likeItem.dataset.likes = 1;
        likeItem.textContent = `${count} has been liked 1 time`;
        likesList.appendChild(likeItem);
    }
}

// Handle Comment Submission
function submitComment(event) {
    event.preventDefault();
    const commentText = commentInput.value.trim();
    if (commentText) {
        const commentItem = document.createElement("li");
        commentItem.textContent = commentText;
        commentList.appendChild(commentItem);
        commentInput.value = "";
    }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    startTimer();

    minusBtn.addEventListener("click", decrementCounter);
    plusBtn.addEventListener("click", incrementCounter);
    heartBtn.addEventListener("click", likeNumber);
    pauseBtn.addEventListener("click", togglePause);
    commentForm.addEventListener("submit", submitComment);
});
