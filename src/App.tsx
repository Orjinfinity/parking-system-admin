import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  Apartments,
  Cars,
  Dashboard,
  Flats,
  ForgotPassword,
  Gates,
  Login,
  NotFound,
  Register,
  Sites,
  Users,
} from './pages';
import PrivateLayout from './layout/PrivateLayout';
import PublicLayout from './layout/PublicLayout';
import ThemeProviderWrapper from './theme';

function App() {
  return (
    <ThemeProviderWrapper>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PrivateLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/sites" element={<Sites />} />
            <Route path="/apartments" element={<Apartments />} />
            <Route path="/flats" element={<Flats />} />
            <Route path="/gates" element={<Gates />} />
            <Route path="/cars" element={<Cars />} />
          </Route>
          <Route element={<PublicLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProviderWrapper>
  );
}

export default App;
