import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/home/Home";
import Menu from "../Pages/shop/Menu";
import Signup from "../components/Signup";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import CartPage from "../Pages/shop/CartPage";
const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/menu",
          element: <PrivateRouter><Menu/></PrivateRouter>,
        },
        {
          path: "/update-profile",
          element: <PrivateRouter><UpdateProfile/></PrivateRouter>
        },
        {
          path: "/cart-page",
          element: <CartPage />
        },
      ],
    },
    {
      path: "/signup",
      element: <Signup/>
    },
  ]);
  
export default router;