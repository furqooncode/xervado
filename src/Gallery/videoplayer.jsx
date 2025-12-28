import React, { useRef, useState, useEffect } from 'react';

export default function VideoPlayer({ src, poster }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const hideTimer = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [flashIcon, setFlashIcon] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  /* ---------- LOAD VIDEO ---------- */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    video.load();
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setShowControls(true);

    const onTime = () => setCurrentTime(video.currentTime);
    const onMeta = () => setDuration(video.duration);

    video.addEventListener('timeupdate', onTime);
    video.addEventListener('loadedmetadata', onMeta);

    return () => {
      video.removeEventListener('timeupdate', onTime);
      video.removeEventListener('loadedmetadata', onMeta);
    };
  }, [src]);

  /* ---------- FULLSCREEN STATE LISTENER ---------- */
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener(
        'fullscreenchange',
        handleFullscreenChange
      );
    };
  }, []);

  /* ---------- KEEP CONTROLS WHEN PAUSED ---------- */
  useEffect(() => {
    if (!isPlaying) setShowControls(true);
  }, [isPlaying]);

  /* ---------- SHOW CONTROLS TEMP ---------- */
  const showControlsTemp = () => {
    setShowControls(true);
    clearTimeout(hideTimer.current);

    hideTimer.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2500);
  };

  /* ---------- PLAY / PAUSE ---------- */
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
      flash('play');
    } else {
      video.pause();
      setIsPlaying(false);
      flash('pause');
    }

    showControlsTemp();
  };

  const flash = (type) => {
    setFlashIcon(type);
    setTimeout(() => setFlashIcon(null), 600);
  };

  /* ---------- SEEK ---------- */
  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = percent * duration;
  };

  /* ---------- DOUBLE TAP SEEK ---------- */
  const handleDoubleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;

    if (x < rect.width / 2) {
      videoRef.current.currentTime -= 10;
      flash('back');
    } else {
      videoRef.current.currentTime += 10;
      flash('forward');
    }

    showControlsTemp();
  };

  /* ---------- FULLSCREEN TOGGLE ---------- */
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const formatTime = (t) => {
    if (!t || isNaN(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-black/50 rounded-xl overflow-hidden shadow-lg"
      onMouseMove={showControlsTemp}
      onTouchStart={showControlsTemp}
    >
      {/* VIDEO */}
      <video
        key={src}
        ref={videoRef}
        src={src}
        poster={poster}
        preload="metadata"
        playsInline
        onClick={togglePlay}
        onDoubleClick={handleDoubleClick}
        className="w-full h-full object-contain cursor-pointer"
      />

      {/* FLASH ICON */}
      {flashIcon && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="bg-black/60 w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl">
            <i
              className={`fas ${
                flashIcon === 'play'
                  ? 'fa-play'
                  : flashIcon === 'pause'
                  ? 'fa-pause'
                  : flashIcon === 'back'
                  ? 'fa-backward'
                  : 'fa-forward'
              }`}
            />
          </div>
        </div>
      )}

      {/* CONTROLS */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/90 to-transparent z-10">
          <div className="flex items-center gap-3 text-white">

            {/* PLAY / PAUSE */}
            <button
              onClick={togglePlay}
              className="bg-black/60 w-10 h-10 rounded-full flex items-center justify-center"
            >
              <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`} />
            </button>

            {/* PROGRESS */}
            <div
              className="flex-1 h-1.5 bg-white/30 rounded cursor-pointer"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-red-500 rounded"
                style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
              />
            </div>

            {/* TIME */}
            <span className="text-xs w-12 text-right">
              {formatTime(currentTime)}
            </span>

            {/* FULLSCREEN / EXIT */}
            <button
              onClick={toggleFullscreen}
              className="bg-black/60 w-10 h-10 rounded-full flex items-center justify-center"
            >
              <i
                className={`fas ${
                  isFullscreen ? 'fa-compress' : 'fa-expand'
                }`}
              />
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
