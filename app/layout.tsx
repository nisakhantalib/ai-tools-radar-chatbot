// import { title } from "process";
import "./global.css";

export const metadata = {
    title: "AI Radar Tool ",
    description: "AI GPT - providing up-to-date information on AI tools, prompt engineering, and LLM frameworks.",
}

const Rootlayout = ({ children }) => {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}

export default Rootlayout;