import logo from './logo.svg';
import './App.css';
import styles from './calendar_modal.module.css'


function App() {
    // const contentCss ={
    //   zIndex:2,
    //   width:"50%",
    //   padding: "1em",
    //   background:"#fff"
    // }

  const openCalendarModal = () => {
    return (
      console.log("Hello world")
    )
  }
  const today = new Date;
  return (
    <>
   <button onClick={openCalendarModal}>このテキストをクリックでモーダルが開くようにしたい</button> 
   <div class={styles.background}>
    <div class={styles.contentCss}>
      <p>これはカレンダーの中身になる予定のコンテンツ</p>
      <p><button>close</button></p>
    </div>
   </div>
   </>
  );
}

export default App;
