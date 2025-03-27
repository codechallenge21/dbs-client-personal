import React from 'react';
import ReactMarkdown from 'react-markdown';
import MermaidChart from '@/components/MermaidChart/mermaidChart';
import remarkGfm from 'remark-gfm';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

type MermaidMarkdownProps = {
  chartData: string;
  customStyle?: React.CSSProperties;
};

export default function MermaidMarkdown({ chartData, customStyle }: MermaidMarkdownProps) {
  return (
    <div style={customStyle}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
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
              <div>
                <pre>
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            );
          },

          // Table container with horizontal scrolling
          table({ children }) {
            return (
              <TableContainer
                component={Paper}
                sx={{
                  marginY: 2,
                  overflowX: 'auto',
                  maxHeight: '500px', // Limits the height for better readability
                }}
              >
                <Table stickyHeader>{children}</Table>
              </TableContainer>
            );
          },
          thead({ children }) {
            return <TableHead sx={{ backgroundColor: '#f5f5f5' }}>{children}</TableHead>;
          },
          tbody({ children }) {
            return <TableBody>{children}</TableBody>;
          },
          tr({ children }) {
            return <TableRow>{children}</TableRow>;
          },
          th({ children }) {
            return (
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  backgroundColor: '#f5f5f5',
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  textAlign: 'center',
                  whiteSpace: 'nowrap', // Prevents text wrapping in headers
                }}
              >
                {children}
              </TableCell>
            );
          },
          td({ children }) {
            return (
              <TableCell
                sx={{
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  textAlign: 'center',
                  whiteSpace: 'nowrap', // Prevents wrapping for better alignment
                }}
              >
                {children}
              </TableCell>
            );
          },
        }}
      >
        {chartData}
      </ReactMarkdown>
    </div>
  );
}
