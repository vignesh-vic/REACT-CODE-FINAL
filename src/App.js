import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import LayoutRouter from './router/LayoutRouter';
import Home from './router/home';
import About from './router/about';
import Contact from './router/contact'

/* The code is creating a router using the `createBrowserRouter` function from the `react-router-dom`
library. The router is configured with routes created from JSX elements using the
`createRoutesFromElements` function. */
const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<LayoutRouter/>}> 
        <Route index element ={<Home/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='contact' element={<Contact/>}/>
    </Route>
  )
)
function App() {
  return (
   /* The `<RouterProvider router={router}/>` component is providing the router to the application. It
   allows the application to access and use the router for routing purposes. */
   <RouterProvider router={router}/>
  );
}

export default App;
