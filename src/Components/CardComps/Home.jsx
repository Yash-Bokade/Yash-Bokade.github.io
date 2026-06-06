const SkillList = ['React', 'Nodejs', 'Express', 'Tailwind', 'Python', 'Java', 'DBMS', 'TypeScript', 'DSA'];
export default function Home() {
    return (
        <div className="w-full h-full px-16">
            <div className="flex flex-row  gap-8 mb-8">

                <p className="bg-white/10 px-4 py-1 [corner-shape:bevel] rounded-tl-lg rounded-br-lg border border-white/30 font-['Jersey_25'] w-max" >FULL - STACK DEVELOPMENT</p>
                <p className="bg-white/10 px-4 py-1 [corner-shape:bevel] rounded-tl-lg rounded-br-lg border border-white/30 font-['Jersey_25'] w-max" >WEB DEVELOPMENT</p>
                <p className="bg-white/10 px-4 py-1 [corner-shape:bevel] rounded-tl-lg rounded-br-lg border border-white/30 font-['Jersey_25'] w-max" >SOFTWARE DEVELOPMENT</p>
            </div>
            <div className="flex flex-row gap-4 m-4 flex-wrap justify-between">
                {SkillList.map((item) => {
                    return (
                        <p key={item} className="bg-white/10 px-4 py-1 [corner-shape:bevel] rounded-tl-lg rounded-br-lg border border-[#A0DDA0] font-[jetbrains_mono]">{item}</p>
                    )
                })}
            </div>
            <p className="text-xl font-['Jersey_25']  my-6">I am a developer who likes to build things, I have a interest in web devlopment and using AI. I am always looking for new challenges and opportunities to grow and develop my skills.</p>
            <div className="flex flex-row gap-4">
                <button className="text-shadow-lg text-shadow-[#c8ffc811] bg-white/10 [corner-shape:bevel] underline underline-offset-6 pr-5 decoration-[#c8ffc8] rounded-tl-lg rounded-br-lg border border-white/30 font-['Jersey_25'] w-max hover:border--[#c8ffc8]">
                    View My Projects
                </button>
                <button className="text-shadow-lg text-shadow-[#c8ffc811] bg-white/10 [corner-shape:bevel] underline underline-offset-6 pr-5 decoration-[#c8ffc8] rounded-tl-lg rounded-br-lg border border-white/30 font-['Jersey_25'] w-max hover:border--[#c8ffc8]">
                    Contact Me</button>
            </div>
        </div>
    )
}