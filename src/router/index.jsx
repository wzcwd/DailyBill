import {createBrowserRouter} from "react-router-dom";
import Layout from "@/page/Layout/index.jsx";
import NewBill from "@/page/NewBill/index.jsx";
import MonthBill from "@/page/MonthBill/index.jsx";
import YearBill from "@/page/YearBill/index.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children:[
            {
                index: true,
                element: <MonthBill/>
            },
            {
                path: 'year',
                element: <YearBill/>
            }
        ]
    },
    {
        path: '/new',
        element: <NewBill/>
    }
])

export default router;