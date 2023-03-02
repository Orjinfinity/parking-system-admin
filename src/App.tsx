import { useEffect } from 'react';
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
  // Register,
  Blocks,
  Users,
  GateProcesses,
  RequestCalls,
  ResetPassword,
  Profile
} from './pages';
import ProtectedRoute from './components/routes/ProtectedRoute';
import PrivateLayout from './layout/PrivateLayout';
import PublicLayout from './layout/PublicLayout';
import { LocalStorageKeys } from './interfaces';
import { useAppDispatch } from './store/hooks';
import ThemeProviderWrapper from './theme';
import { RequireAuth } from './components';
import { checkUser } from './store/auth';

function App() {
  const authToken = localStorage.getItem(LocalStorageKeys.AuthToken);
  const user = localStorage.getItem(LocalStorageKeys.User);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authToken && user) dispatch(checkUser(JSON.parse(user)));
  }, [authToken, user, dispatch]);

  return (
    <ThemeProviderWrapper>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <PrivateLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/apartments" element={<Apartments />} />
            <Route path="/blocks" element={<Blocks />} />
            <Route path="/flats" element={<Flats />} />
            <Route path="/gates" element={<Gates />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/request-calls" element={<RequestCalls />} />
            <Route path="/gate-processes" element={<GateProcesses />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route
            element={
              <ProtectedRoute>
                <PublicLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProviderWrapper>
  );
}

export default App;
