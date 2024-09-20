function ready() {

  document.querySelectorAll('.video').forEach(video => {

    var videoElement = video.querySelector('video');
    var videoEvent = videoElement.dataset.event;

    video.querySelector('button').addEventListener('click', function() {

      if(videoElement.paused) {

        videoElement.play();

      } else {

        videoElement.pause();

      }

    });

    videoElement.addEventListener('play', (e) => {

      if(window.plausible && videoEvent && e.target.currentTime == 0) plausible('Video Start', {props: {title: videoEvent}});

      video.classList.add('video--playing');

      e.target.setAttribute('controls', 'controls');

    });

    videoElement.addEventListener('ended', (e) => {

      if(window.plausible && videoEvent) plausible('Video Finish', {props: {title: videoEvent}});

      video.classList.remove('video--playing');

      e.target.removeAttribute('controls');
      e.target.load();

    });

  });

}

export { ready };
