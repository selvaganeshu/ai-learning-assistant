import SideBar from "../components/SideBar";

const AppLayout = ({children})=>{
    return (
        <div >
            <SideBar/>
            <main className="ml-64 bg-slate-100 min-h-screen">
                {children}
            </main>
        </div>
    )
}

export default AppLayout;