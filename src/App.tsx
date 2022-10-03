import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateLayout from './layout/PrivateLayout';
import PublicLayout from './layout/PublicLayout';
import ThemeProviderWrapper from './theme';
import { Dashboard, Login } from './pages';

function App() {
  return (
    <ThemeProviderWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="" element={<PublicLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProviderWrapper>
  );
}

export default App;
