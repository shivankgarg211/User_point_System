import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeaderTabs from './components/HeaderTabs';
import Leaderboard from './components/Leaderboard';


function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/' element={<HeaderTabs/>} />
    //     <Route path='/userSelector' element={<UserSelector/>} />
    //   </Routes>
    // </BrowserRouter>


    <div className="App">
      <HeaderTabs />
      <Leaderboard />
    </div>
  );
}
export default App;
