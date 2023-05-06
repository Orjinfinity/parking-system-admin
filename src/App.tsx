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
  Profile,
  Register,
} from './pages';
import ProtectedRoute from './components/routes/ProtectedRoute';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { LocalStorageKeys, Types } from './interfaces';
import PrivateLayout from './layout/PrivateLayout';
import PublicLayout from './layout/PublicLayout';
import ThemeProviderWrapper from './theme';
import { RequireAuth } from './components';
import { checkUser } from './store/auth';

function App() {
  const authToken = localStorage.getItem(LocalStorageKeys.AuthToken);
  const user = JSON.parse(localStorage.getItem(LocalStorageKeys.User));
  const isSuperAdmin =
    user?.roles && user.roles.some((role) => role === Types.ROLE_ADMIN);
  const dispatch = useAppDispatch();
  const isModerator = useAppSelector((state) => state.auth.isModerator);


  useEffect(() => {
    if (authToken && user) dispatch(checkUser(user));
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
            {isSuperAdmin ? (
              <Route path="/apartments" element={<Apartments />} />
            ) : null}
            {!isModerator ? (
              <>
                <Route path="/blocks" element={<Blocks />} />
                <Route path="/flats" element={<Flats />} />
                <Route path="/gates" element={<Gates />} />
                <Route path="/cars" element={<Cars />} />
                <Route path="/gate-processes" element={<GateProcesses />} />
              </>
            ) : null}
            <Route path="/request-calls" element={<RequestCalls />} />
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
            <Route path="/register" element={<Register />} />
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
