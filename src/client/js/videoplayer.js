const video = document.querySelector("video");
const playbtn = document.getElementById("play");
const videoplaybtn = playbtn.querySelector("i");
const mutebtn = document.getElementById("mute");
const videomutebtn = mutebtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const videoContainer = document.getElementById("videoContainer");
const fullscreenbtn = document.getElementById("fullscreen");
const fullScreenIcon = fullscreenbtn.querySelector("i");
const videocontrols = document.getElementById("videocontrols");

let controlsMovementTimeout = null;
let controlsTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlaybtn = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  videoplaybtn.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMute = () => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  videomutebtn.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
  volumeRange.value = video.muted ? "0" : volumeValue;
};
const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    mutebtn.innerText = "Mute";
  }
  volumeValue = value;
  video.volume = value;
};
const formatTime = (seconds) => {
  return new Date(seconds * 1000).toISOString().substring(14, 19);
};

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};
const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleFullscreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress";
  }
};

const hideControls = () => videocontrols.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videocontrols.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};
const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 300);
};

const handlepVideoScreenPlay = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  videoplaybtn.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleKeydown = (event) => {
  const { key } = event;
  if (key === " " && event.target.id !== "textarea") {
    handlepVideoScreenPlay();
  } else if ((key === "f" || key === "F") && event.target.id !== "textarea") {
    handleFullscreen();
  } else if ((key === "m" || key === "M") && event.target.id !== "textarea") {
    handleMute();
  }
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, { method: "POST" });
};

playbtn.addEventListener("click", handlePlaybtn);
mutebtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("ended", handleEnded);
video.addEventListener("click", handlepVideoScreenPlay);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
timeline.addEventListener("input", handleTimelineChange);
fullscreenbtn.addEventListener("click", handleFullscreen);
document.addEventListener("keydown", handleKeydown);
