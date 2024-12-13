import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownWidget({content}: {content: string}) {
    const lines = content.split("\n");
    if(lines.length > 20) {
        content = lines.slice(0, 20).join("\n");
    }

    return <div>
        <Markdown remarkPlugins={[remarkGfm]} className={`max-h-56 markdown overflow-hidden w-full`}>{content}</Markdown>
    </div>
}