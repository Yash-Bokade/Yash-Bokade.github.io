import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { SplitText } from 'gsap/SplitText'; // Requires GSAP Club membership


function About() {
    gsap.registerPlugin(SplitText);

    const aboutContRef = useRef(null)
    const careerObjRef = useRef(null)
    useGSAP(() => {

        // title splits
        gsap.from(new SplitText('.titles', { type: 'chars' }).chars, {
            opacity: 0,
            y: 100,
            duration: 0.3,
            stagger: 0.09,
            ease: 'power4.out'
        }).then(() => {
            new SplitText('.titles', { type: 'chars' }).revert();
        });

        gsap.from(new SplitText(careerObjRef.current, { type: 'words' }).words, {
            opacity: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: 'sine.out'
        }).then(() => {
            new SplitText(careerObjRef.current, { type: 'words' }).revert();
        });
    }, { scope: aboutContRef })
    return (
        <div
            ref={aboutContRef}
            className={`bg-[#0000] font-['Jersey_25'] h-full min-w-[80%] w-[80%] [corner-shape:bevel] rounded-tl-4xl rounded-br-4xl border-3 border-[#c8ffc8] p-4 overflow-hidden`}>
            <h1>
                <p
                    className=" titles"
                >
                    Career Objective</p></h1>
            <p
                ref={careerObjRef}
                className="text-xl">Aiming to be a skilled Developer, while enhancing my skills in related Frameworks, to become a proficient developer with ability to create efficient Applications.</p>
            <br />
            <h1>
                <p
                    className=" titles"
                >
                    Education</p></h1>
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
            <h1>
                <p
                    className=" titles"
                >
                    Interests</p></h1>
            <ol>
                <li>Full-stack Development</li>
                <li>Software Development (Java | Kotlin )</li>
                <li>Agentic Coding or Agentic Engineering</li>
            </ol>

        </div>)
}
export default About;