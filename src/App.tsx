import './App.css'
import Forms from './components/Content/Forms/Forms'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'

function App() {

  return (
    <>
      <Header />
      <div className='container'>
        <main>
            <Forms /> 
        </main>
      </div>
      <Footer />
    </>
  )
}

export default App
