import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  /**
   * useState используется, чтобы наделить функциональный компонент внутренним состоянием,
   * возвращает массив с двумя элементами, который содержит: текущее значение состояния и функцию для его обновления.
   * React сохраняет это состояние между рендерами. 
   */
  const [temp, setTemp] = useState('');
  const [desc, setDesc] = useState('');
  const [icon, setIcon] = useState('');
  const [isReady, setReady] = useState(false);
  const URL = `http://api.openweathermap.org/data/2.5/weather?q=${process.env.REACT_APP_CITY}&APPID=${process.env.REACT_APP_API_KEY}&units=metric`;

  /**
   * useEffect позволяет выполнять побочные эффекты из функционального компонента.
   */
  useEffect(() => {
    fetch(URL)
    .then(result => result.json())
    .then(jsonresult => {
      setTemp(jsonresult.main.temp);
      setDesc(jsonresult.weather[0].main);
      setIcon(jsonresult.weather[0].icon);
      setReady(true);
    })
    .catch(err => console.error(err));
  });

  if (isReady) {
    return (
      <div className="App">
        <p>Temperature: {temp}</p>
        <p>Description: {desc}</p>
        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather icon"></img>
      </div>
    );
  } else {
    return <div>Loading...</div>
  };

}

export default App;
