import { LoginForm } from './components/Form/LoginForm';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Contacts } from './components/Contacts/Contacts';

function App() {
  return (
    <main>
      <Routes>
        <Route path='/' element={<LoginForm />}></Route>
        <Route path='contacts' element={<Contacts />}></Route>
      </Routes>
    </main>
  );
}

//TO-DO:

// 2) useEffect for contacts, so that data would be downloaded each time

// 4) unitTests
// 5) ErrorBoundary and errors handling
// 6) No route found path
// 7) LazyLoading of contacts ?

// 9) check files and make better structure

export default App;
