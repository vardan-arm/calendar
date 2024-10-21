import {useCallback} from 'react'
import './App.css'
import Calendar from "./components/Calendar.tsx";
import {fr} from 'date-fns/locale';


function App() {
  const onDaySelect = useCallback((day: Date) => {
    console.log('selected day: ', day);
  }, []);

  return (
    <>
      <h1>Calendar app</h1>
      <Calendar onDaySelect={onDaySelect} />
      <Calendar onDaySelect={onDaySelect} locale={fr} />
    </>
  )
}

export default App
