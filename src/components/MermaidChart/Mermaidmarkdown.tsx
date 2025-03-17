import React from 'react';
import ReactMarkdown from 'react-markdown';
import MermaidChart from '@/components/MermaidChart/mermaidChart';

type MermaidMarkdownProps = {
  chartData: string;
  customStyle?: React.CSSProperties;
};

export default function MermaidMarkdown({ chartData, customStyle }: MermaidMarkdownProps) {
  return (
    <div style={customStyle}>
      <ReactMarkdown
        components={{
          // Custom renderer for code blocks.
          code({ node, inline, className, children, ...props }: any) {
            // Check if this is a block-level code with the mermaid language.
            const match = /language-mermaid/.exec(className || '');
            if (!inline && match) {
              // Render the MermaidChart component for mermaid code.
              return <MermaidChart chart={String(children).trim()} />;
            }
            // Otherwise render code normally.
            return (
              <pre>
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            );
          },
        }}
      >
        {chartData}
      </ReactMarkdown>
    </div>
  );
}
