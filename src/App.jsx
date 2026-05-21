import { useEffect, useState } from 'react';
import './App.css'
import About from "./Components/CardComps/About.jsx";
import Projects from './Components/CardComps/Projects.jsx';

const navlist = ["About", "Projects", "Skills", "Contact", "GitHub", "Linked in"]
function App() {
    const [selectedItem, setSelectedItem] = useState("About")
    const [scroll, setScroll] = useState(0)


    // useEffect(() => {
    //     setSelectedItem(navlist[Math.floor(Math.abs(scroll)) % 6])
    // }, [scroll])
    return (
        <>
            <div
                onWheel={(e) => {
                    setScroll(scroll + (e.deltaY))
                    return;
                }}
                className={`flex justify-between items-start w-full h-full gap-4 px-32`}>
                <div className={`w-[20%] flex flex-col items-start`}>
                    {/*    TODO List */}

                    {navlist.map((item) => {
                        return (
                            <p
                                onClick={() => {
                                    setSelectedItem(item)
                                    return;
                                }}
                                className={`font-['Jersey_25'] cursor-pointer text-2xl hover:text-[#c8ffc8] hover:underline ${item === selectedItem ? "" : "text-[#242424]"}`}>{item}</p>
                        )
                    })}
                </div>
                <div className={`w-full h-full border-l-3 border-white/20 overflow-hidden flex flex-row-reverse`}>
                    {selectedItem === "About" && <About />}
                    {selectedItem === "Projects" && <Projects />}
                </div>
            </div>
            <div className={`w-screen leading-64 font-['Jersey_25'] text-[384px]`}>
                Yash Bokade
            </div>
        </>
    )
}
export default App
