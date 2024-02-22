
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuComponent from './components/MenuComponents';
import PlayComponent from './components/PlayComponent';
import AddQuestion from './components/AddQuestion';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<MenuComponent />}/>
      <Route path='/play' element={<PlayComponent />}/>
      <Route path='/addQuestion' element={<AddQuestion />}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
