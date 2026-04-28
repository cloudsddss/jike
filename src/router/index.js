import {createBrowserRouter} from 'react-router-dom';
import Login from "@/pages/Login";
import GeekLayout from "@/pages/Layout";
import {AuthRoute} from "@/components/AuthRoute";
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import Publish from "@/pages/publish";



const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute Component={GeekLayout}/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: 'article',
                element: <Article/>
            },
            {
                path: 'publish',
                element: <Publish/>
            }
        ]

    },
    {
        path:'/login',
        element: <Login/>,
    }
]);
export default router;
