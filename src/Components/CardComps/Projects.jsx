import { useState } from "react";

const ProjectList = ["Ai Council", "Infinite NewTab", "SwordFall", "Awayspot", "python ToDo"]

function Projects() {
    const [selectedProject, setSelectedProject] = useState(ProjectList[0])
    return (<div className={`flex w-full h-full justify-between`}>
        <div className={`bg-[#0000] font-['Jersey_25'] h-full w-fit p-4`}>
            {ProjectList.map((item) => {
                return (
                    <p className={`cursor-pointer`}>{item}</p>
                )
            })}

        </div>
        <div className={`bg-[#0000] font-['Jersey_25'] h-full min-w-[80%] w-[80%]  [corner-shape:bevel] rounded-tl-4xl rounded-br-4xl border-3 border-[#c8ffc8] p-4 overflow-hidden`}>

        </div>
    </div>)
}
export default Projects;