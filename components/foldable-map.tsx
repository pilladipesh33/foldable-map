"use client";

import {
  motion,
  MotionStyle,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { useState } from "react";

export const FoldableMap = () => {
  const [isFolded, setIsFolded] = useState(true);
  const dragX = useMotionValue(0);
  const xLeftSection = useTransform(dragX, [0, 300], ["100%", "0%"]);
  const xRightSection = useTransform(dragX, [0, 300], ["-100%", "0%"]);
  const centerScale = useTransform(dragX, [150, 300], [0, 1]);
  const centerBrightness = useTransform(dragX, [150, 300], [0.2, 1]);

  useMotionValueEvent(dragX, "change", (currentX) => {
    if (currentX > 260) {
      setIsFolded(false);
    } else {
      setIsFolded(true);
    }
  });

  console.log(isFolded);
  return (
    <div className="mx-auto grid aspect-video max-h-[80vh] p-8">
      <div className="aspect-video grid grid-cols-3 h-full w-full [grid-area:1/1]">
        <motion.div
          style={{ x: xLeftSection, skewY: "-1deg" }}
          className="map-image origin-bottom-right boder-r border-[rgba(255,255,255,.1)] shadow-2xl"
        />
        <motion.div
          style={
            {
              scaleX: centerScale,
              "--brightness": centerBrightness,
            } as MotionStyle
          }
          className="map-image brightness-[--brightness]"
        />
        <motion.div
          style={{ x: xRightSection, skewY: "1deg" }}
          className="map-image origin-bottom-left border-l border-[rgba(255,255,255,.1)] shadow-2xl"
        />
      </div>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 300 }}
        _dragX={dragX}
        dragTransition={{
          modifyTarget: (target: number) => {
            return target > 150 ? 300 : 0;
          },
          timeConstant: 45,
        }}
        className="relative z-10 [grid-area:1/1] cursor-grab active:cursor-grabbing"
      ></motion.div>
      {!isFolded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3, ease: "easeIn" }}
          className="flex w-full justify-center text-xl mt-14"
        >
          <p className="text-[hsl(40_15%_20%)] font-mono border-l border-[hsl(42_7%_50%)] pl-2 cursor-animation">
            select your location
          </p>
        </motion.div>
      )}
    </div>
  );
};
