import { Form } from './components/Form';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Contacts } from './components/Contacts';

function App() {
  return (
    <main>
      <Routes>
        <Route path='/' element={<Form />}></Route>
        <Route path='contacts/:userId' element={<Contacts />}></Route>
      </Routes>
    </main>
  );
}

export default App;
