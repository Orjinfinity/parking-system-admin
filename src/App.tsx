import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard, ForgotPassword, Login, NotFound, Register } from './pages';
import PrivateLayout from './layout/PrivateLayout';
import PublicLayout from './layout/PublicLayout';
import ThemeProviderWrapper from './theme';

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
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProviderWrapper>
  );
}

export default App;
