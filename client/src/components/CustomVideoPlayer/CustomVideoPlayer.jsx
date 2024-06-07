// import React, { useRef, useState } from 'react';
// import './CustomVideoPlayer.css';

// const CustomVideoPlayer = ({ videoSource }) => {
//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const handlePlayPause = () => {
//     const video = videoRef.current;
//     if (video.paused) {
//       video.play();
//       setIsPlaying(true);
//     } else {
//       video.pause();
//       setIsPlaying(false);
//     }
//   };

//   const handleSeek = (seconds) => {
//     const video = videoRef.current;
//     if (video) {
//       video.currentTime += seconds;
//     }
//   };

//   const handleDoubleTapOrClick = () => {
//     const video = videoRef.current;
//     if (!video) return;

//     if (video.paused) {
//       video.play();
//       setIsPlaying(true);
//     } else {
//       video.pause();
//       setIsPlaying(false);
//     }
//   };

//   const handleDoubleTapOrClickSeek = (event) => {
//     const video = videoRef.current;
//     const screenWidth = window.innerWidth;
//     const tapX = event.clientX || event.nativeEvent.clientX;

//     if (!video) return;

//     if (tapX < screenWidth / 2) {
//       handleSeek(-10);
//     } else {
//       handleSeek(10);
//     }
//   };

//   const handleContainerClick = (event) => {
//     event.stopPropagation();
//     handleDoubleTapOrClick();
//   };

//   const handleDoubleTapOrClickSeekEvent = (event) => {
//     event.preventDefault();
//     handleDoubleTapOrClickSeek(event);
//   };

//   return (
//     <div className="custom-video-player">
//       <video
//         ref={videoRef}
//         src={videoSource}
//         controls
//         onClick={(e) => e.stopPropagation()}
//         onDoubleClick={handleDoubleTapOrClickSeekEvent}
//         onTouchStart={handleContainerClick}
//       />
//     </div>
//   );
// };

// export default CustomVideoPlayer;



// import React, { useRef, useState } from 'react';
// import './CustomVideoPlayer.css';

// const CustomVideoPlayer = ({ videoSource }) => {
//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const handlePlayPause = () => {
//     const video = videoRef.current;
//     if (video.paused) {
//       video.play();
//       setIsPlaying(true);
//     } else {
//       video.pause();
//       setIsPlaying(false);
//     }
//   };

//   const handleSeek = (seconds) => {
//     const video = videoRef.current;
//     if (video) {
//       video.currentTime += seconds;
//     }
//   };

//   const handleDoubleClickSeek = (event) => {
//     const video = videoRef.current;
//     const screenWidth = window.innerWidth;
//     const tapX = event.clientX || event.nativeEvent.touches[0].clientX;

//     if (!video) return;

//     if (tapX < screenWidth / 2) {
//       handleSeek(-10); // Seek backward by 10 seconds
//     } else {
//       handleSeek(10); // Seek forward by 10 seconds
//     }
//   };

//   const handleContainerClick = () => {
//     handlePlayPause();
//   };

//   return (
//     <div className="custom-video-player" onClick={handleContainerClick}>
//       <video
//         ref={videoRef}
//         src={videoSource}
//         controls
//         onClick={(e) => e.stopPropagation()}
//         onDoubleClick={handleDoubleClickSeek}
//       />
//     </div>
//   );
// };

// export default CustomVideoPlayer;




// import React, { useRef, useState, useEffect } from 'react';
// import './CustomVideoPlayer.css';

// const CustomVideoPlayer = ({ videoSource }) => {
//     const videoRef = useRef(null);
//     const [playing, setPlaying] = useState(false);
//     const [currentTime, setCurrentTime] = useState(0);
//     const [videoTime, setVideoTime] = useState(0);
//     const [progress, setProgress] = useState(0);

//     useEffect(() => {
//         const video = videoRef.current;
//         if (video) {
//             // Update video duration
//             const handleLoadedMetadata = () => {
//                 setVideoTime(video.duration);
//             };
//             video.addEventListener('loadedmetadata', handleLoadedMetadata);
            
//             // Update current time and progress
//             const handleTimeUpdate = () => {
//                 setCurrentTime(video.currentTime);
//                 setProgress((video.currentTime / video.duration) * 100);
//             };
//             video.addEventListener('timeupdate', handleTimeUpdate);
            
//             // Cleanup event listeners on component unmount
//             return () => {
//                 video.removeEventListener('loadedmetadata', handleLoadedMetadata);
//                 video.removeEventListener('timeupdate', handleTimeUpdate);
//             };
//         }
//     }, [videoRef]);

//     const handleVideoClick = () => {
//         if (playing) {
//             videoRef.current.pause();
//         } else {
//             videoRef.current.play();
//         }
//         setPlaying(!playing);
//     };

//     const handleVideoDoubleClick = (e) => {
//         const video = videoRef.current;
//         const width = video.clientWidth;
//         const clickX = e.nativeEvent.offsetX;

//         if (clickX < width / 2) {
//             // Double-clicked on the left side of the video
//             video.currentTime = Math.max(video.currentTime - 10, 0); // Rewind 10 seconds
//         } else {
//             // Double-clicked on the right side of the video
//             video.currentTime = Math.min(video.currentTime + 10, video.duration); // Forward 10 seconds
//         }
//     };

//     const handleTimeChange = (e) => {
//         const newTime = e.target.value * videoTime;
//         videoRef.current.currentTime = newTime;
//         setCurrentTime(newTime);
//     };

//     return (
//         <div className="app">
//             <video
//                 id="video1"
//                 ref={videoRef}
//                 className="video"
//                 src={videoSource}
//                 onClick={handleVideoClick}
//                 onDoubleClick={handleVideoDoubleClick}
//             ></video>

//             {/* Time controls */}
//             <div className="timecontrols">
//                 <p className="controlsTime">
//                     {Math.floor(currentTime / 60)}:{("0" + Math.floor(currentTime % 60)).slice(-2)}
//                 </p>
//                 <input
//                     type="range"
//                     min="0"
//                     max="1"
//                     step="0.01"
//                     value={currentTime / videoTime}
//                     onChange={handleTimeChange}
//                     className="time_progressbarContainer"
//                 />
//                 <p className="controlsTime">
//                     {Math.floor(videoTime / 60)}:{("0" + Math.floor(videoTime % 60)).slice(-2)}
//                 </p>
//             </div>
//         </div>
//     );
// }

// export default CustomVideoPlayer;



import React, { useRef, useState, useEffect } from 'react';
import './CustomVideoPlayer.css';

const CustomVideoPlayer = ({ videoSource }) => {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [videoTime, setVideoTime] = useState(0);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            // Update video duration
            const handleLoadedMetadata = () => {
                setVideoTime(video.duration);
            };
            video.addEventListener('loadedmetadata', handleLoadedMetadata);
            
            // Update current time and progress
            const handleTimeUpdate = () => {
                setCurrentTime(video.currentTime);
            };
            video.addEventListener('timeupdate', handleTimeUpdate);
            
            // Cleanup event listeners on component unmount
            return () => {
                video.removeEventListener('loadedmetadata', handleLoadedMetadata);
                video.removeEventListener('timeupdate', handleTimeUpdate);
            };
        }
    }, [videoRef]);

    const handleVideoDoubleClick = (e) => {
        const video = videoRef.current;
        const width = video.clientWidth;
        const clickX = e.nativeEvent.offsetX;

        // Check if double-click occurred in the middle third of the video
        if (clickX >= width / 3 && clickX <= (2 * width / 3)) {
            // Toggle play/pause state of the video
            if (playing) {
                video.pause();
            } else {
                video.play();
            }
            setPlaying(!playing);
        } else {
            // Handle other double-click events (e.g., rewind/forward) as desired
            // Double-clicked on the left side of the video
            if (clickX < width / 3) {
                video.currentTime = Math.max(video.currentTime - 10, 0); // Rewind 10 seconds
            } else {
                // Double-clicked on the right side of the video
                video.currentTime = Math.min(video.currentTime + 10, video.duration); // Forward 10 seconds
            }
        }
    };

    const handleTimeChange = (e) => {
        const newTime = e.target.value * videoTime;
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    return (
        <div className="app">
            <video
                id="video1"
                ref={videoRef}
                className="video"
                src={videoSource}
                onDoubleClick={handleVideoDoubleClick}
            ></video>

            {/* Time controls */}
            <div className="timecontrols">
                <p className="controlsTime">
                    {Math.floor(currentTime / 60)}:{("0" + Math.floor(currentTime % 60)).slice(-2)}
                </p>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={currentTime / videoTime}
                    onChange={handleTimeChange}
                    className="time_progressbarContainer"
                />
                <p className="controlsTime">
                    {Math.floor(videoTime / 60)}:{("0" + Math.floor(videoTime % 60)).slice(-2)}
                </p>
            </div>
        </div>
    );
};

export default CustomVideoPlayer;