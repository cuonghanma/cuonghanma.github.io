window.addEventListener("load", function(){
  const song = this.document.querySelector("#song");
  const playButton = this.document.querySelector(".player-play");
  const nextButton = this.document.querySelector(".player-next");
  const prevButton = this.document.querySelector(".player-prev");
  const durationTimer = this.document.querySelector(".player-duration");
  const currentTimer = this.document.querySelector(".player-current");
  const progressBar = this.document.querySelector("#progress-bar");
  const playerImage = this.document.querySelector(".player-image");
  const songName = this.document.querySelector(".player-name");
  const musicList = ["Chúng Ta Không Thuộc Về Nhau - Official Music Video - Sơn Tùng M-TP.mp3","Khuôn mặt đáng thương - Sơn Tùng MTP.mp3","LẠC TRÔI - OFFICIAL MUSIC VIDEO - SƠN TÙNG M-TP.mp3","Sơn Tùng MTP - Remember Me (SlimV 2017 Mix).mp3"];
  let songIndex = 0;
  let playing  = true;

  
  // chuyển bài
  function changeMusic(i) {
    if (i === 1) {
      songIndex ++;
      if (songIndex > musicList.length - 1) {
        songIndex = 0;
      };
      song.setAttribute("src", `./file/${musicList[songIndex]}`);
      songName.textContent = musicList[songIndex];
      playing = true;
      musicPlay();
    }else if(i === -1){
      songIndex --;
      if (songIndex < 0 ) {
        songIndex = musicList.length - 1;
      };
      song.setAttribute("src", `./file/${musicList[songIndex]}`);
      songName.textContent = musicList[songIndex];
      playing = true;
      musicPlay();
    }
  };
  // pause và play music
  function musicPlay() {
    if (playing) {
      song.pause();
      playing = false;
      playerImage.classList.remove("is-playing");
      playButton.classList.add("fa-play");
      playButton.classList.remove("fa-pause");
    } else {
      song.play();
      playing = true;
      playerImage.classList.add("is-playing");
      playButton.classList.remove("fa-play");
      playButton.classList.add("fa-pause");
    }
  };
  function displayTimer() {
    const {duration, currentTime} = song;
    progressBar.max = duration;
    progressBar.value = currentTime;
    const minutesDuration = Math.floor(duration/60);
    const secondsDuration = Math.floor(duration % 60);
    const minutesCurrent = Math.floor(currentTime / 60);
    const secondsCurrent = Math.floor(currentTime % 60);
    durationTimer.textContent = `0${minutesDuration}`.slice(-2) + `:` + `0${secondsDuration}`.slice(-2);
    currentTimer.textContent = `0${minutesCurrent}`.slice(-2) + `:` + `0${secondsCurrent}`.slice(-2);
  };
  function dragProgressBar() {
    song.currentTime = progressBar.value;

  }
  const timer = this.setInterval(displayTimer, 500);

  playButton.addEventListener("click", musicPlay);
  nextButton.addEventListener("click", function () {
    changeMusic(1); 
  });
  prevButton.addEventListener("click", function () {
    changeMusic(-1);
  });
  song.addEventListener("ended", function () {
    changeMusic(1);
  });
  progressBar.addEventListener("change", dragProgressBar);
})
