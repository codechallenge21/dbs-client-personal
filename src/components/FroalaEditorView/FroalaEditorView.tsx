import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { MyComponentProps } from "react-froala-wysiwyg/FroalaEditorView";
import Lightbox from "minimal/components/lightbox";
import { Box, SxProps, Theme } from "@mui/material";

const DefaultFroalaEditorView = dynamic(
  async () => {
    const values = await Promise.all([
      import("react-froala-wysiwyg/FroalaEditorView"),
    ]);
    return values[0];
  },
  {
    loading: () => <div />,
    ssr: false,
  }
);

type CustomizedFroalaEditorViewProps = {
  id?: string;
  testId?: string;
  sx?: SxProps<Theme>;
} & MyComponentProps;

const FroalaEditorView: FC<CustomizedFroalaEditorViewProps> = function (props) {
  const {
    id = "default-froala-editor-view",
    testId = id,
    model,
    ...otherProps
  } = props;
  const [updatedModel, setUpdatedModel] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const addTableWrapper = useCallback(
    (model) => {
      const tableWrapper = model.querySelectorAll(".table-wrapper");

      tableWrapper.forEach((element) => {
        if (!element.querySelector("table")) element.remove();
      });

      const tables = model.querySelectorAll("table");

      tables.forEach((table) => {
        const parentTable = table.parentElement;
        const style = table.getAttribute("style");
        if (style) {
          const newStyle = style.replace(
            /margin-left:\s*calc\([^)]+\);?\s*|margin-right:\s*calc\([^)]+\);?/g,
            ""
          );
          table.setAttribute("style", newStyle);
        }
        if (parentTable && parentTable.classList.contains("table-wrapper")) {
          return;
        }

        if (!parentTable || !parentTable.classList.contains("table-wrapper")) {
          const wrapper = document.createElement("div");
          wrapper.className = "table-wrapper";
          if (table.parentElement) {
            table.parentElement.insertBefore(wrapper, table);
            wrapper.appendChild(table);
          }
        }
      });

      setUpdatedModel(model.innerHTML);
    },
    [setUpdatedModel]
  );

  const setTableWrapperWidth = () => {
    const container = document.querySelector(".froala-editor-view-text-indent")
      ?.parentElement?.parentElement;
    const tableWrappers = document.querySelectorAll(
      ".table-wrapper"
    ) as NodeListOf<HTMLElement>;
    if (container && tableWrappers.length) {
      const containerWidth = container.getBoundingClientRect().width;
      tableWrappers.forEach((tableWrapper) => {
        tableWrapper.style.width = `${containerWidth - 60}px`;
      });
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (model) {
      const div = document.createElement("div");
      div.innerHTML = model.toString();
      addTableWrapper(div);
    }
  }, [model, addTableWrapper]);

  useEffect(() => {
    const div = divRef?.current;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLImageElement;
      if (target.tagName === "IMG") {
        setImageUrl(target.src);
        setIsOpen(true);
      }
    };
    div?.addEventListener("click", handleClick);

    return () => {
      div?.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    // Set links to open in a new page
    const div = divRef.current;
    const setLinkTargetBlank = () => {
      if (div) {
        const links = div.getElementsByTagName("a");
        for (let i = 0; i < links.length; i++) {
          links[i]?.setAttribute("target", "_blank");
        }
      }
    };
    setLinkTargetBlank();
    // Observer to handle dynamic content changes
    const observer = new MutationObserver(setLinkTargetBlank);
    if (div) {
      observer.observe(div, { childList: true, subtree: true });
    }
    return () => {
      if (div) {
        observer.disconnect();
      }
    };
  }, [divRef]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const froalaElement = document.querySelector(`#${CSS.escape(id)}`);
      const targetChild = froalaElement?.children[0];
      if (targetChild) {
        targetChild.setAttribute("id", `${id}-content`);
        targetChild.setAttribute("data-tid", `${testId}-content`);
      }
    });
    observer.observe(document, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [id, testId]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setTableWrapperWidth();
    });
    const observer = new MutationObserver(() => {
      setTableWrapperWidth();
    });
    observer.observe(document, { childList: true, subtree: true });
    return () => {
      window.removeEventListener("resize", setTableWrapperWidth);
      observer.disconnect();
    };
  }, []);

  return (
    <Box
      id={id}
      data-tid={testId}
      ref={divRef}
      sx={{
        "& .fr-view": { position: "relative" },
        "& .fr-view .table-wrapper .fr-non-editable": { display: "none" },
      }}
    >
      <DefaultFroalaEditorView model={updatedModel || model} {...otherProps} />
      {isOpen && imageUrl && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={[{ src: imageUrl }]}
          disabledVideo
          disabledTotal
          disabledCaptions
          disabledSlideshow
          disabledThumbnails
          disabledFullscreen
          className="fr-lightbox-img"
        />
      )}
    </Box>
  );
};

export default FroalaEditorView;
