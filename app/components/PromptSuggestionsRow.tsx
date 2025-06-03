import PromptSuggestionButton from "./PromptSuggestionButton";

const PromptSuggestionRow = ({ onPromptClick }) => {
    const prompts = [
        "What is LangGraph and how is it used?",
  "How does LlamaIndex handle document chunking?",
  "What's the difference between LangChain and LlamaIndex?"
    ];

    return(
        <div className="prompt-suggestion-row">
            {prompts.map((prompt, index) => (
                <PromptSuggestionButton
                    key={`suggestion-${index}`}
                    text={prompt}
                    onClick={() => onPromptClick(prompt)}/>
            ))}
        </div>
    )
}

export default PromptSuggestionRow;