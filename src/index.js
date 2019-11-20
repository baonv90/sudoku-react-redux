import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from "react";
import ReactDOM from 'react-dom';
import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';
import Board from './components/Board';
import NavBar from './components/NavBar';
import ButtonsContainer from './containers/ButtonsContainer';


//window width hook
function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return width;
}

function App() {
  
  const width = WindowWidth();
  
  return <Provider store={store}>
      <NavBar />
      <Board windowSize={width}/>
      <ButtonsContainer />
  </Provider>
  
}

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
