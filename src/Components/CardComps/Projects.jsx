import { Images } from "lucide-react";
import { useState } from "react";
import infinitytab from "../../assets/projects/infinitetab.png"
import pythonP from "../../assets/projects/pythonP.png"

const ProjectList = {
    "Ai Council": {
        description: 'A single-page AI application that takes your question and runs it through 5 emotionally-distinct AI personalities — Joy, Sadness, Anger, Fear, and Surprise — then a 6th agent, The Concluder, synthesizes everything into a clear, actionable answer: "What should you really do?"',
        href: "https://github.com/Yash-Bokade/ai_Emotion_Actions",
        images: [""],
        year: "2026"
    },
    "Infinite NewTab": {
        description: "A browser extension that replaces the default new tab page with a customizable dashboard featuring widgets for time, date, weather, and more. Users can customize the layout and appearance to their liking.",
        href: "https://github.com/Yash-Bokade/infinite-newtab",
        images: [infinitytab],
        year: "2026"
    },
    "SwordFall": {
        description: "A 3D Action RPG game with multiplayer support, developed in Godot 4.6.",
        href: "https://github.com/Yash-Bokade/swordFall",
        images: [""],
        year: "2026"
    },
    "Awayspot": {
        description: "Awayspot is a Java-based web application project built with Gradle and Jakarta EE technologies. The project demonstrates a foundational servlet-based web application structured as a standard Java web module (WAR project).",
        href: "https://github.com/Yash-Bokade/Awayspot",
        images: [""],
        year: "2026"
    },
    "Python ToDo": {
        description: "A Task Management System developed using Python with HTML/CSS/JS and MySQL as database.",
        href: "https://github.com/Yash-Bokade/Python-Project-Task-Management",
        images: [pythonP],
        year: "2025"
    }
}

function Projects() {
    const [selectedProject, setSelectedProject] = useState(Object.keys(ProjectList)[0])
    const [hoveredProject, setHoveredProject] = useState(Object.keys(ProjectList)[0])
    return (<div className={`flex w-full h-full justify-between`}>
        <div className={`bg-[#0000] font-['Jersey_25'] h-full w-fit p-4`}>
            {Object.keys(ProjectList).map((itemName) => {
                return (
                    <p
                        onMouseOver={_ => {
                            setHoveredProject(itemName)
                            setSelectedProject(ProjectList[itemName])
                        }}
                        key={itemName}
                        className={`cursor-pointer text-xl hover:text-[#c8ffc8] hover:underline`}>{itemName}</p>
                )
            })}

        </div>
        <div className={`bg-[#0000] font-['Jersey_25'] h-full min-w-[80%] w-[80%]  [corner-shape:bevel] rounded-tl-4xl rounded-br-4xl border-3 border-[#c8ffc8] p-4 overflow-hidden`}>
            <div className={`w-full h-full`}>
                {hoveredProject}
                <div className={`w-[50%] h-[50%] bg-[#242424]`}>
                    {selectedProject.description}
                    {selectedProject.href && <a href={selectedProject.href} target="_blank">Link</a>}
                    {selectedProject.images && <img src={selectedProject.images[0]} alt="" />}
                    {selectedProject.year}
                </div>
            </div>
        </div>
    </div>)
}
export default Projects;