import ReactMarkdown from "react-markdown";
const Bubble = ({ message }) => {
  const { content, role } = message;

  return (
    <div className={`bubble ${role}`}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default Bubble;
