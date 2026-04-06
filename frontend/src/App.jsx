import { Routes, Route } from 'react-router-dom';
import AppLayout from './AppLayout';
import Home from './views/Home';
import Destination from './views/Destination';
import Planning from './views/Planning';
import Summary from './views/Summary';

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/planning" element={<Planning />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </AppLayout>
  );
}

export default App;