
import './App.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Body from './components/Body/body';


function App() {
  return (
    <div className="App">
      <Header/>
      <div className='content'></div>
      <Body />
      <Footer/>
    </div>
  );
}

export default App;
