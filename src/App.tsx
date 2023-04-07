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
  Register
} from './pages';
import ProtectedRoute from './components/routes/ProtectedRoute';
import PrivateLayout from './layout/PrivateLayout';
import PublicLayout from './layout/PublicLayout';
import { LocalStorageKeys, Types } from './interfaces';
import { useAppDispatch, useAppSelector } from './store/hooks';
import ThemeProviderWrapper from './theme';
import { RequireAuth } from './components';
import { checkUser } from './store/auth';
import { getUserById } from './services';
import { getUserApartmentInfo } from './utils';

function App() {
  const authToken = localStorage.getItem(LocalStorageKeys.AuthToken);
  const user = JSON.parse(localStorage.getItem(LocalStorageKeys.User));
  const isSuperAdmin = user.roles.some(role => role === Types.ROLE_ADMIN);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user && isAuthenticated) {
      const fetchUser = async () => {
        const response = await getUserById(user?.id);
        const data = await response.data;
        const flats = data?.flats ? data.flats[0] : null;
        if(flats) {
          const apartment = getUserApartmentInfo(data?.flats[0]);
          const userInfo = {...user, apartment};
          localStorage.setItem(LocalStorageKeys.User, JSON.stringify(userInfo));
          dispatch(checkUser(userInfo));
        }
      }
      fetchUser();
    }
  }, [user, dispatch, isAuthenticated])

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
            {isSuperAdmin ? <Route path="/apartments" element={<Apartments />} /> : null}
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
