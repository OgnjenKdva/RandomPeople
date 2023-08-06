import './navigation.css'
import { useEffect, useRef, useState } from 'react'
const Navigation = (props) => {
  const TS_MS = 10000;
  const interval = useRef(null)
  const [startTimestamp, setStartTimestamp] = useState(Date.now())
  const [remainingTime, setRemainingTime] = useState(TS_MS)
  const [currentAction, setCurrentAction] = useState('stop');

  useEffect(() => {
    createInterval();
    return () => clearInterval(interval.current);
  }, [])

  const createInterval = () => {
    interval.current = setInterval(() => {
      setStartTimestamp(Date.now())
      props.fetchData();
      console.log('Logs every 10 s');
    }, TS_MS);
  }

  const handleToggleAction = () => {
    if (currentAction === 'stop') {
      setCurrentAction('start');
      handleSaveRemainingTime();
    } else {
      setCurrentAction('stop');
      handleStartWithRemaining();
    }
    props.onToggleAction()
  };

  const handleStartWithRemaining = () => {
    setTimeout(() => {
      setStartTimestamp(Date.now())
      props.fetchData()
      console.log('Logs after ' + remainingTime);
      createInterval();
    }, remainingTime);
  }

  const handleSaveRemainingTime = () => {
    const remainingTimeSupport = TS_MS - (Date.now() - startTimestamp);
    console.log('remainingTime', remainingTimeSupport);
    setRemainingTime(remainingTimeSupport);

    clearInterval(interval.current)
  };

  return (
    <div>
      <button className={currentAction === 'stop' ? 'stop-button' : 'play-button'} onClick={handleToggleAction}>
        {currentAction === 'stop' ? 'Stop' : 'Play'}
      </button>
    </div>
  )
}

export default Navigation;