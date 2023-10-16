import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import TodoApp from './todo';
// "import" nom du composant a importer "from" './nom du fichier js ou il se trouve
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <TodoApp />
  </React.StrictMode>
);
// <specifier le nom du composant dans une balise fermante />
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
