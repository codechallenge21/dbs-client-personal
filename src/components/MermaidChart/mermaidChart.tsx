"use client";

import {
  ContentCopyRounded,
  DoneRounded,
  OpenInFullRounded,
} from "@mui/icons-material";
import ChevronLeftSharpIcon from "@mui/icons-material/ChevronLeftSharp";
import ChevronRightSharpIcon from "@mui/icons-material/ChevronRightSharp";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessSharpIcon from "@mui/icons-material/ExpandLessSharp";
import ExpandMoreSharpIcon from "@mui/icons-material/ExpandMoreSharp";
import RefreshIcon from "@mui/icons-material/Refresh";
import ZoomInSharpIcon from "@mui/icons-material/ZoomInSharp";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { Dialog, DialogContent, IconButton, Tooltip } from "@mui/material";
import { useEffect, useRef, useState } from "react";

interface MermaidChartProps {
  chart: string;
}

export default function MermaidChart({ chart }: MermaidChartProps) {
  const [mermaidCopied, setMermaidCopied] = useState(false);
  const [svgContent, setSvgContent] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panZoomRef = useRef<any>(null);
  const uniqueIdRef = useRef(
    `mermaid-${Math.random().toString(36).substring(2, 10)}`
  );

  useEffect(() => {
    let isMounted = true;

    const loadLibrariesAndRenderChart = async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        const svgPanZoom = (await import("svg-pan-zoom")).default;

        mermaid.initialize({ startOnLoad: false });

        const { svg } = await mermaid.render(uniqueIdRef.current, chart);
        // Store the svg string in state so we can render it in the dialog too.
        if (isMounted) {
          setSvgContent(svg);
        }

        if (isMounted && containerRef.current) {
          containerRef.current.innerHTML = svg;

          const svgElement = containerRef.current.querySelector("svg");
          if (svgElement) {
            svgElement.setAttribute("class", "mermaid-svg");
            svgElement.style.width = "100%";
            svgElement.style.height = "100%";
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
                    typeof this.options.onTouchStart === "function"
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
        console.error("Error rendering Mermaid chart:", error);
      }
    };

    loadLibrariesAndRenderChart();

    return () => {
      isMounted = false;
      if (panZoomRef.current) {
        panZoomRef.current.destroy();
      }
    };
  }, [chart]);

  return (
    <div style={{ position: "relative", height: "auto" }}>
      <div style={{ width: "auto", height: "auto" }} ref={containerRef} />

      <div
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            gap: "0.5rem",
            display: "flex",
            alignSelf: "stretch",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignSelf: "stretch",
              alignItems: "center",
              justifyContent: "flex-end", // Changed from center to flex-end to align buttons to the right
            }}
          >
            <Tooltip title="複製圖表程式碼" arrow placement="top">
              <IconButton
                onClick={() => {
                  navigator.clipboard
                    .writeText(`\`\`\`mermaid\n${chart}\n\`\`\``)
                    .then(() => {
                      setMermaidCopied(true);
                      setTimeout(() => setMermaidCopied(false), 1000);
                    });
                }}
              >
                {mermaidCopied ? (
                  <DoneRounded sx={{ color: "#4CAF50", fontSize: 20 }} /> // Changed color to #4CAF50
                ) : (
                  <ContentCopyRounded sx={{ color: "black", fontSize: 20 }} />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="全尺寸展開" arrow placement="top">
              <IconButton onClick={() => setIsDialogOpen(true)}>
                <OpenInFullRounded sx={{ color: "black", fontSize: 20 }} />
              </IconButton>
            </Tooltip>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto auto",
              gridTemplateRows: "auto auto auto",
              gridTemplateAreas: `
                ". up zoomIn"
                "left center right"
                ". down zoomOut"
              `,
              gap: "0.5rem",
            }}
          >
            <div style={{ gridArea: "up" }}>
              <Tooltip title="向上移動" arrow placement="top">
                <IconButton
                  sx={{ color: "black" }}
                  onClick={() => panZoomRef.current?.panBy({ x: 0, y: -20 })}
                >
                  <ExpandLessSharpIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div style={{ gridArea: "left" }}>
              <Tooltip title="向左移動" arrow placement="left">
                <IconButton
                  sx={{ color: "black" }}
                  onClick={() => panZoomRef.current?.panBy({ x: -20, y: 0 })}
                >
                  <ChevronLeftSharpIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div style={{ gridArea: "center" }}>
              <Tooltip title="重置視圖" arrow placement="top">
                <IconButton
                  sx={{ color: "black" }}
                  onClick={() => panZoomRef.current?.reset()}
                >
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div style={{ gridArea: "right" }}>
              <Tooltip title="向右移動" arrow placement="right">
                <IconButton
                  sx={{ color: "black" }}
                  onClick={() => panZoomRef.current?.panBy({ x: 20, y: 0 })}
                >
                  <ChevronRightSharpIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div style={{ gridArea: "down" }}>
              <Tooltip title="向下移動" arrow placement="bottom">
                <IconButton
                  sx={{ color: "black" }}
                  onClick={() => panZoomRef.current?.panBy({ x: 0, y: 20 })}
                >
                  <ExpandMoreSharpIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div style={{ gridArea: "zoomIn" }}>
              <Tooltip title="放大" arrow placement="top-end">
                <IconButton
                  sx={{ color: "black" }}
                  onClick={() => panZoomRef.current?.zoomIn()}
                >
                  <ZoomInSharpIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div style={{ gridArea: "zoomOut" }}>
              <Tooltip title="縮小" arrow placement="bottom-end">
                <IconButton
                  sx={{ color: "black" }}
                  onClick={() => panZoomRef.current?.zoomOut()}
                >
                  <ZoomOutIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded view Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="lg"
        fullWidth={true}
        slotProps={{
          paper: {
            style: {
              padding: 0,
              width: "80%",
              height: "50%",
              margin: "auto",
              backgroundColor: "#fff",
            },
          },
          backdrop: {
            style: { backgroundColor: "rgba(0,0,0,0.5)" },
          },
        }}
      >
        <Tooltip title="關閉" arrow placement="bottom">
          <IconButton
            onClick={() => setIsDialogOpen(false)}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 2000,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
        <DialogContent style={{ padding: 0 }}>
          <div dangerouslySetInnerHTML={{ __html: svgContent }} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
