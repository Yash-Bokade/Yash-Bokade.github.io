function About() {
    return (
        <div className={`bg-[#0000] font-['Jersey_25'] h-full min-w-[80%] w-[80%] [corner-shape:bevel] rounded-tl-4xl rounded-br-4xl border-3 border-[#c8ffc8] p-4 overflow-hidden`}>
            <h1>Career Objective</h1>
            <p className="text-xl">Aiming to be a skilled Developer, while enhancing my skills in related Frameworks, to become a proficient developer with ability to create efficient Applications.</p>
            <br />
            <h1>Education</h1>
            <div>
                <div >
                    <h3>Diploma</h3>
                    <div className="flex flex-row justify-between items-center">
                        <p className="text-xl">Zeal Polytechnic Pune</p>
                        <pre className="font-['Jersey_25']">2023 - 2026    percentage: 82.8%</pre>
                    </div>
                </div>
                <div >
                    <h3>10th</h3>
                    <div className="flex flex-row justify-between items-center">
                        <p className="text-xl">Army Public School Khadakwasla</p>
                        <pre className="font-['Jersey_25']">2020 - 2023    percentage: 72.5%</pre>
                    </div>
                </div>
            </div>
            <br />
            <h1>Interests</h1>
            <ol>
                <li>Full-stack Development</li>
                <li>Software Development (Java | Kotlin )</li>
                <li>Agentic Coding or Agentic Engineering</li>
            </ol>

        </div>)
}
export default About;