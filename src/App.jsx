import React from 'react'
import './App.css'
import WeatherFetch from './component/WeatherFetch'

class App extends React.Component  {
 
render() {
    return (
    <>
      <section id="center">
     <WeatherFetch/>
      </section>

      
    </>
  )
}

}

export default App
