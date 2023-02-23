import './App.scss';
import CardDetailsForm from './components/CardDetailsForm';

function App() {
  return (
    <main className='App'>
      <div id='page-container'>
        <div id='content-wrap'>
          <h1 className="sr-only">Card Details Form Interactive</h1>

          <div className='component-container'>
            <CardDetailsForm/>

            {/* And the content goes here. */}


          </div>

          <footer className="attribution">
          Challenge by <a href="https://www.frontendmentor.io/profile/dominicroemer" target="_blank" rel='noreferrer'>Frontend Mentor</a>. 
          Coded by <a href="https://github.com/dianaroemer">Diana Roemer</a>.
          </footer>


        </div>
      </div>
    </main>
  );
}

export default App;
