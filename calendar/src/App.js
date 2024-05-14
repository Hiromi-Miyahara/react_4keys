import './App.css';
import styles from './calendar_modal.module.css'
import React, { useState } from 'react';

import {calendarModalHtml} from './calendar_modal'

function App() {
const [show, setShow] = useState(false);

  const openModal = () => {
    return setShow(true)
  }

  const closeModal = () => {
    return setShow(false)
  }

  return (
    <>
      <button onClick={openModal}>このテキストをクリックでモーダルが開くようにしたい</button> 
      <Modal show={show} closeModal={closeModal}/>
   </>
  );
}

function Modal(props){

  if(props.show){
    return (
      <div class={styles.background}>
        <div class={styles.contentCss}>
          {calendarModalHtml()}
          <p>動いたよ!</p>
          <p><button onClick={props.closeModal}>close</button></p>
        </div>
      </div>
      )
  }

}

export default App;
