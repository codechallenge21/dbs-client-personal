"use client";

import { useEffect } from "react";
import Lightbox, { Plugin } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Video from "yet-another-react-lightbox/plugins/video";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import { LightBoxProps } from "./types";
import StyledLightbox from "./styles";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function CustomLightbox({
  slides,
  open,
  index,
  close,
  onGetCurrentIndex,
  disabledZoom,
  disabledVideo,
  disabledTotal,
  disabledCaptions,
  disabledSlideshow,
  disabledThumbnails,
  disabledFullscreen,
  ...other
}: LightBoxProps) {
  useEffect(() => {
    if (onGetCurrentIndex && typeof index === "number") {
      onGetCurrentIndex(index);
    }
  }, [onGetCurrentIndex, index]);

  const plugins: Plugin[] = [];

  if (!disabledVideo) plugins.push(Video);
  if (!disabledZoom) plugins.push(Zoom);
  if (!disabledCaptions) plugins.push(Captions);
  if (!disabledSlideshow) plugins.push(Slideshow);
  if (!disabledFullscreen) plugins.push(Fullscreen);
  if (!disabledThumbnails) plugins.push(Thumbnails);

  return (
    <>
      <StyledLightbox />
      
      <Lightbox
        slides={slides}
        open={open}
        close={close}
        index={index}
        plugins={plugins}
        {...other}
      />
    </>
  );
}
