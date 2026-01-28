import SideBar from "../components/SideBar";
import Header from "../components/Header";
const AppLayout = ({children})=>{
    return (
        <div >
            <SideBar/>
            <Header/>   
            <main className="ml-64 pt-[50px] bg-slate-100 min-h-screen">
                {children}
            </main>
        </div>
    )
}

export default AppLayout;