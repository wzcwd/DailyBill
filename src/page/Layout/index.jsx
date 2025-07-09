import {Outlet, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchBillList} from "@/store/modules/billStore.js";
import {TabBar} from 'antd-mobile'
import {BillOutline, AddCircleOutline, CalculatorOutline} from 'antd-mobile-icons'
import "./index.scss"


const Layout = () => {

    // 使用redux store中的数据
    // 调用dispatch hook
    const dispatch = useDispatch();
    // 使用useEffect hook 在组件渲染的之后加载后端数据
    useEffect(() => {
        // 请求后端数据交给store
        dispatch(fetchBillList());
    }, [dispatch]);

    // 切换菜单跳转路由
    const navigate = useNavigate()
    const switchRoute = (path) => {
        console.log(path)
        navigate(path)
    }

    const tabs = [
        {key: '/', title: 'Month', icon: <BillOutline/>},
        {key: '/new', title: 'New', icon: <AddCircleOutline/>},
        {key: '/year', title: 'Year', icon: <CalculatorOutline/>,},
    ]

    return (
        <div className="layout">
            <div className="container">
                <Outlet/>
            </div>
            <div className="footer">
                <TabBar onChange={switchRoute}>
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
                    ))}
                </TabBar>
            </div>
        </div>
    )

}
export default Layout