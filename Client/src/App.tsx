import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import Dashboard from './pages/Dashboard';
import Roastings from './pages/Roastings';
import GreenCoffee from './pages/GreenCoffee';
import Login from './components/login/Login';
import ErrorPage from './pages/ErrorPage';
import Users from './pages/Users';

const router = createBrowserRouter([
    {
        index: true,
        element: <Login />,
    },
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
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
            {
                path: '/users',
                element: <Users />
            }
        ]
    }
])

const App = (): JSX.Element => {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;
