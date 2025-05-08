import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import styles from "./styles.module.css";

type ImageDefinition = {
  src: string;
  alt: string;
};

export function SlideShow({ images }: { images: ImageDefinition[] }) {
  return (
    <Slide>
      {images.map((image, index) => (
        <div key={index}>
          <div
            className={styles.imageContainer}
            style={{ backgroundImage: `url(${image.src})` }}
          />
        </div>
      ))}
    </Slide>
  );
}
