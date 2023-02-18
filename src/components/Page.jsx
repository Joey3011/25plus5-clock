import React from 'react'
import './page.css'

export const Page = () => {
  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionLength, setSessionLength] = React.useState(25);
  const [timeLeft, seTtimeLeft] = React.useState(1500);
  const [timingType, setTimingtype] = React.useState("SESSION");
  const [start, setStart] = React.useState(false)
  const toggle = () => setStart(!start)
  const [play, setPlay] = React.useState(false);
  
  const timeout = setTimeout(() => {
    if(timeLeft && play){
      seTtimeLeft(timeLeft - 1)
    }
  }, 1000);
  
  const handleBreakIncrease = () => {
    if(breakLength < 60){
      setBreakLength(breakLength + 1)
    }
  }
  
  const handleBreakDecrease = () => {
    if(breakLength > 1){
      setBreakLength(breakLength - 1)
    }
  }
  
   const handleSessionIncrease = () => {
    if(sessionLength < 60){
      setSessionLength(sessionLength + 1)
      seTtimeLeft(timeLeft + 60)
    }
  }
  
  const handleSessionDecrease = () => {
    if(sessionLength > 1){
      setSessionLength(sessionLength - 1)
      seTtimeLeft(timeLeft - 60)
    }
  }
  
  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    seTtimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingtype("SESSION");
    const audio = document.getElementById("beep");
    audio.pause()
    audio.currentTime = 0;
  }
  
  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
    toggle()
  }
  
  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if(!timeLeft && timingType === "SESSION"){
      seTtimeLeft(breakLength * 60)
      setTimingtype("BREAK")
      audio.play()
    }
    if(!timeLeft && timingType === "BREAK"){
      seTtimeLeft(sessionLength * 60)
      setTimingtype("SESSION")
      audio.pause()
      audio.currentTime = 0;
    }
  }
  
  const clock = () => {
    if(play){
      setTimeout(() => {
        if(timeLeft && play){
          seTtimeLeft(timeLeft - 1)
        }
      }, 1000)
      resetTimer()
    }else {
      clearTimeout(timeout)
    }
  }
  
  React.useEffect(() => {
    clock()
   start ? document.getElementById("start_stop").innerText = "Stop" : document.getElementById("start_stop").innerText = "Start"
    start ? document.getElementById("start_stop").style.background = "red" : document.getElementById("start_stop").style.background  = "green"
    start ? document.getElementById("time-left").style.color = "green" : document.getElementById("time-left").style.color  = "red"
    start ? document.getElementById("break-length").style.color = "green" : document.getElementById("break-length").style.color  = "red"
    start ? document.getElementById("session-length").style.color = "green" : document.getElementById("session-length").style.color  = "red"
    
        start ? document.getElementById("break-label").style.color = "green" : document.getElementById("break-label").style.color  = "red"
    start ? document.getElementById("session-label").style.color = "green" : document.getElementById("session-label").style.color  = "red"
  }, [play, timeLeft, timeout])
 
  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  
  const title = timingType === "SESSION" ? "Session" : "Break";
  return (
    <div>
        <div className="wrapper">
            <h1>25 + 5 Clock</h1>
            <div className="break-session-length">
                <div className='session-break-wrapper'>
                  <h4 id="break-label">Break Length</h4>
                  <div  className='btn-wrapper'>
                      <button disabled={play} onClick={handleBreakIncrease} id="break-increment">+</button>
                      <small id="break-length">{breakLength}</small>
                      <button disabled={play} onClick={handleBreakDecrease} id="break-decrement">-</button>
                  </div>
                </div>
                <div className='session-length-wrapper'>
                    <h4 id="session-label">Session Length</h4>
                    <div className='btn-wrapper'>
                        <button disabled={play} onClick={handleSessionIncrease} id="session-increment">+</button>
                        <small id="session-length">{sessionLength}</small>
                        <button disabled={play} onClick={handleSessionDecrease} id="session-decrement">-</button>
                    </div>
                </div>
            </div>
            <div className="timer-wrapper">
                <div className="timer">
                  <small id="timer-label">{title}</small>
                  <h2 id="time-left">{timeFormatter()}</h2>
                </div>
            </div>
            <div className='btn-play-reset-wrapper'>
                <button onClick={handlePlay} id="start_stop"></button>
                <button onClick={handleReset} id="reset">Reset</button>
            </div>
        </div>
        <audio
        id="beep" 
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
    </div>
  )
}

export default Page
