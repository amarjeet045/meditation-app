const song = document.querySelector(".song");
const play = document.querySelector(".play");
const outline = document.querySelector(".moving-outline circle");
const video = document.querySelector(".vid-container video");

//sounds
const sounds = document.querySelectorAll(".sound-picker button");

//Time Display and this is the time display at the end of the page or time counter.
const timeDisplay = document.querySelector(".time-display");
//this is for the length of the circle and we need to do this because we wants to animate this.
const outlineLength = outline.getTotalLength();

//Duration
const timeSelect = document.querySelectorAll(".time-select button");
let fakeDuration = 1800;

//this is done for the time limiter means as the time passes how it looks 
//outline.style.strokeDashoffset = 200;
outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;

//this is for the simply play sounds
play.addEventListener('click' ,()=>{
    checkPlaying(song);
});

//select sound button

timeSelect.forEach(option => {
    option.addEventListener("click", function() {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });

//create a function specific to stop and play the sounds
const checkPlaying = song => {
    if(song.paused)
    {
        song.play();
        video.play();
        play.src = "./svg/pause.svg";
    }
    else{
        song.pause();
        video.pause();
        play.src = "./svg/play.svg";
    }
};
//we can animate the circle 
song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
//Animate the circle means when the songs start timer type or progress bar is also starting animation
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    //animation the text
    timeDisplay.textContent = `${minutes}:${seconds}`;

}

//to make this loop free means it doen't run continuesly

if (currentTime >= fakeDuration) {
    song.pause();
    song.currentTime = 0;
    play.src = "./svg/play.svg";
    video.pause();
  }
