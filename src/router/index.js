import {createBrowserRouter} from 'react-router-dom';
import Login from "@/pages/Login";
import GeekLayout from "@/pages/Layout";
import {AuthRoute} from "@/components/AuthRoute";
import {lazy, Suspense} from "react";

//lazy函数对路由组件进行懒加载
const Home = lazy(() => import('@/pages/Home'));
const Article = lazy(() => import('@/pages/Article'));
const Publish = lazy(() => import('@/pages/publish'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute Component={GeekLayout}/>,
        children: [
            {
                index: true,
                //Suspense组件用于包裹懒加载的组件，提供加载时的占位内容
                element: <Suspense fallback={<div>加载中...</div>}><Home/></Suspense>
            },
            {
                path: 'article',
                element: <Suspense fallback={<div>加载中...</div>}><Article/></Suspense>
            },
            {
                path: 'publish',
                element: <Suspense fallback={<div>加载中...</div>}><Publish/></Suspense>
            }
        ]

    },
    {
        path:'/login',
        element: <Login/>,
    }
]);
export default router;
