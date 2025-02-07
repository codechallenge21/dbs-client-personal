'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import svgPanZoom from 'svg-pan-zoom';
import { IconButton } from '@mui/material';
import ZoomInSharpIcon from '@mui/icons-material/ZoomInSharp';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RefreshIcon from '@mui/icons-material/Refresh';
import ChevronRightSharpIcon from '@mui/icons-material/ChevronRightSharp';
import ChevronLeftSharpIcon from '@mui/icons-material/ChevronLeftSharp';
import ExpandLessSharpIcon from '@mui/icons-material/ExpandLessSharp';
import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';

interface MermaidChartProps {
  chart: string;
}

export default function MermaidChart({ chart }: MermaidChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panZoomRef = useRef<any>(null);
  const uniqueIdRef = useRef(
    `mermaid-${Math.random().toString(36).substring(2, 10)}`
  );
  const [hasDiagram, setHasDiagram] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (!chart || !chart.trim()) {
      setHasDiagram(false);
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      return;
    }

    mermaid.initialize({ startOnLoad: false });

    async function renderChart() {
      try {
        const { svg } = await mermaid.render(uniqueIdRef.current, chart);

        if (isMounted && containerRef.current) {
          containerRef.current.innerHTML = svg;

          const svgElement = containerRef.current.querySelector('svg');
          if (svgElement) {
            svgElement.setAttribute('class', 'mermaid-svg');
            svgElement.style.width = '100%';
            svgElement.style.height = '100%';
            panZoomRef.current = svgPanZoom(svgElement, {
              controlIconsEnabled: false,
              zoomScaleSensitivity: 0.2,
              minZoom: 0.1,
              maxZoom: 10,
              center: false,
              fit: true,
              contain: true,
              customEventsHandler: {
                init: function (options) {
                  this.options = options;
                },
                destroy: function () {},
                onTouchStart: function (event) {
                  if (
                    this.options &&
                    typeof this.options.onTouchStart === 'function'
                  ) {
                    this.options.onTouchStart(event);
                  }
                },
                onDblClick: function (event) {
                  event.preventDefault();
                },
                onMouseWheel: function (event) {
                  event.preventDefault();
                },
              } as any,
            });
          }
        }
      } catch (error) {
        console.error('Error rendering Mermaid chart:', error);
      }
    }

    renderChart();

    return () => {
      isMounted = false;
    };
  }, [chart]);

  return (
    <div
      style={{
        position: 'relative',
        height: 'auto',
      }}
    >
      <div
        style={{
          width: 'auto',
          height: 'auto',
        }}
        ref={containerRef}
      />
      {hasDiagram && (
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            zIndex: 1000,
          }}
        >
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto auto auto',
                gridTemplateRows: 'auto auto auto',
                gridTemplateAreas: `
                ". up zoomIn"
                "left center right"
                ". down zoomOut"
              `,
                gap: '0.5rem',
              }}
            >
              <div style={{ gridArea: 'up' }}>
                <IconButton
                  onClick={() => panZoomRef.current?.panBy({ x: 0, y: -20 })}
                >
                  <ExpandLessSharpIcon />
                </IconButton>
              </div>
              <div style={{ gridArea: 'left' }}>
                <IconButton
                  onClick={() => panZoomRef.current?.panBy({ x: -20, y: 0 })}
                >
                  <ChevronLeftSharpIcon />
                </IconButton>
              </div>
              <div style={{ gridArea: 'center' }}>
                <IconButton onClick={() => panZoomRef.current?.reset()}>
                  <RefreshIcon />
                </IconButton>
              </div>
              <div style={{ gridArea: 'right' }}>
                <IconButton
                  onClick={() => panZoomRef.current?.panBy({ x: 20, y: 0 })}
                >
                  <ChevronRightSharpIcon />
                </IconButton>
              </div>
              <div style={{ gridArea: 'down' }}>
                <IconButton
                  onClick={() => panZoomRef.current?.panBy({ x: 0, y: 20 })}
                >
                  <ExpandMoreSharpIcon />
                </IconButton>
              </div>
              <div style={{ gridArea: 'zoomIn' }}>
                <IconButton onClick={() => panZoomRef.current?.zoomIn()}>
                  <ZoomInSharpIcon />
                </IconButton>
              </div>
              <div style={{ gridArea: 'zoomOut' }}>
                <IconButton onClick={() => panZoomRef.current?.zoomOut()}>
                  <ZoomOutIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
