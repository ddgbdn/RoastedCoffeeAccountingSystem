import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import Dashboard from './pages/Dashboard';
import Roastings from './pages/Roastings';
import GreenCoffee from './pages/GreenCoffee';
import Login from './components/login/Login';
import RequireAuth from './components/auth/RequireAuth';
import ErrorPage from './pages/ErrorPage';
import AuthProvider from './context/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: 'login',
        element: <Login />,
    },
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <RequireAuth />,
                children: [
                    {
                        index: true,
                        path: '/dashboard',
                        element: <Dashboard/>
                    },
                    {
                        path: '/roastings',
                        element: <Roastings/>
                    },
                    {
                        path: '/greencoffee',
                        element: <GreenCoffee/>
                    },
                ]
            }
        ]
    }
])

const App = (): JSX.Element => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <RouterProvider router={router}/>
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;
