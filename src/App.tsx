import { LoginForm } from './components/Form/LoginForm';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Contacts } from './components/Contacts/Contacts';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NotFound } from './components/NotFound';

function App() {
  return (
    <main>
      <ErrorBoundary>
        <Routes>
          <Route path='/' element={<LoginForm />}></Route>
          <Route path='contacts' element={<Contacts />}></Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </main>
  );
}

//TO-DO:
// 0) search among Contacts
// 4) unitTests
// 5) ErrorBoundary and errors handling
// 7) LazyLoading of contacts ?

// 9) check files and make better structure

export default App;
