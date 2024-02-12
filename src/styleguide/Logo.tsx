// src/styleguide/Wrapper.js
import React, { useLayoutEffect } from "react";

import { ThemeCustomizer } from "./ThemeCustomizer";
import { useLocalTheme } from "./useLocalTheme";

declare global {
  interface Window {
    ybug_settings: Ybug;
  }
}

interface Ybug {
  id: string;
}
window.ybug_settings = window.ybug_settings || false;

window.ybug_settings = { id: "4a30b8sn4pfpdw7wp4c0" };

export const Logo: React.FC = () => {
  const [, setTheme] = useLocalTheme();

  useLayoutEffect(() => {
    // ybug
    (function () {
      if (window && window.ybug_settings) {
        try {
          const ybug = document.createElement("script");
          ybug.type = "text/javascript";
          ybug.async = true;
          ybug.src =
            "https://widget.ybug.io/button/" + window.ybug_settings.id + ".js";
          const s = document.getElementsByTagName("script")[0];
          s && s.parentNode && s.parentNode.insertBefore(ybug, s);
        } catch (er) {
          console.warn("ybug error", er);
        }
      }
    })();
  }, []);

  return (
    <React.Fragment>
      {process.env.NODE_ENV !== "development" && (
        <ThemeCustomizer
          // hasAll
          onUpdate={(theme) => {
            setTheme(theme);
          }}
        />
      )}
      <svg
        version="1.0"
        id="Warstwa_1"
        x="0px"
        y="0px"
        viewBox="0 0 841.89 595.28"
        enableBackground="new 0 0 841.89 595.28"
      >
        <g>
          <path
            d="M354.76,340.5l-22.91-60.1h12.81l16.13,45.57l16.63-45.57h9.61l16.38,45.82l16.38-45.82h12.19l-22.91,60.1h-11.33
		l-15.89-42.98l-15.76,42.98H354.76z"
          />
          <path
            d="M469.8,341.61c-9.85,0-17.61-2.77-23.28-8.31c-5.67-5.54-8.5-13.12-8.5-22.72c0-6.16,1.25-11.6,3.76-16.32
		c2.5-4.72,5.97-8.39,10.41-11.02c4.43-2.63,9.52-3.94,15.27-3.94c8.29,0,14.82,2.65,19.58,7.94c4.76,5.3,7.14,12.58,7.14,21.86
		v4.19h-44.09c0.9,12.48,7.51,18.72,19.83,18.72c3.45,0,6.84-0.53,10.16-1.6c3.33-1.07,6.47-2.83,9.42-5.3l3.7,8.62
		c-2.71,2.46-6.2,4.39-10.47,5.79C478.46,340.91,474.15,341.61,469.8,341.61z M467.95,288.03c-5.17,0-9.28,1.6-12.32,4.8
		c-3.04,3.2-4.89,7.47-5.54,12.81h33.62c-0.25-5.58-1.72-9.91-4.43-12.99C476.57,289.57,472.8,288.03,467.95,288.03z"
          />
          <path
            d="M527.32,341.61c-6.57,0-11.48-1.85-14.72-5.54c-3.24-3.69-4.86-9.11-4.86-16.26v-66.14h12.44v65.4
		c0,8.13,3.33,12.19,9.98,12.19c0.99,0,1.91-0.04,2.77-0.12c0.86-0.08,1.74-0.25,2.65-0.49l-0.25,9.98
		C532.53,341.28,529.86,341.61,527.32,341.61z"
          />
          <path
            d="M565,341.61c-6.57,0-11.48-1.85-14.72-5.54c-3.24-3.69-4.86-9.11-4.86-16.26v-66.14h12.44v65.4
		c0,8.13,3.33,12.19,9.98,12.19c0.99,0,1.91-0.04,2.77-0.12c0.86-0.08,1.74-0.25,2.65-0.49l-0.25,9.98
		C570.22,341.28,567.55,341.61,565,341.61z"
          />
          <path
            d="M583.36,340.5v-60.1h12.07v9.73c1.81-3.45,4.31-6.12,7.51-8.01c3.2-1.89,6.94-2.83,11.21-2.83
		c9.2,0,15.15,4.02,17.86,12.07c1.89-3.78,4.6-6.73,8.13-8.87c3.53-2.13,7.55-3.2,12.07-3.2c13.47,0,20.2,8.05,20.2,24.14v37.07
		h-12.44v-36.46c0-5.09-0.88-8.83-2.65-11.21c-1.77-2.38-4.66-3.57-8.68-3.57c-4.52,0-8.09,1.58-10.72,4.74
		c-2.63,3.16-3.94,7.45-3.94,12.87v33.62h-12.44v-36.46c0-5.09-0.86-8.83-2.59-11.21c-1.72-2.38-4.6-3.57-8.62-3.57
		c-4.52,0-8.07,1.58-10.65,4.74c-2.59,3.16-3.88,7.45-3.88,12.87v33.62H583.36z"
          />
          <path
            d="M710.83,341.61c-4.93,0-9.53-0.64-13.79-1.91c-4.27-1.27-7.84-3.06-10.72-5.36l3.57-8.38c3.04,2.14,6.38,3.78,10.04,4.93
		c3.65,1.15,7.33,1.72,11.02,1.72c4.35,0,7.64-0.78,9.85-2.34c2.22-1.56,3.33-3.65,3.33-6.28c0-2.13-0.74-3.8-2.22-4.99
		c-1.48-1.19-3.7-2.11-6.65-2.77l-11.7-2.34c-10.35-2.13-15.52-7.47-15.52-16.01c0-5.67,2.26-10.18,6.77-13.55
		c4.51-3.37,10.43-5.05,17.74-5.05c4.19,0,8.19,0.62,12.01,1.85c3.82,1.23,7,3.08,9.55,5.54l-3.57,8.38
		c-2.46-2.13-5.3-3.78-8.5-4.93c-3.2-1.15-6.36-1.72-9.48-1.72c-4.27,0-7.51,0.8-9.73,2.4c-2.22,1.6-3.33,3.76-3.33,6.47
		c0,4.11,2.71,6.73,8.13,7.88l11.7,2.34c5.34,1.07,9.38,2.88,12.13,5.42c2.75,2.55,4.13,5.99,4.13,10.35
		c0,5.75-2.26,10.24-6.77,13.49C724.3,339.99,718.3,341.61,710.83,341.61z"
          />
        </g>
        <path
          fill="#0000D9"
          d="M273.64,289.25c1.27-6.09,2.34-12.22,3.18-18.43c0.82-6.21,1.45-12.46,1.48-18.99c0,0,0,0,0-0.01
	c-0.01-4.1-0.3-8.27-1.1-12.47c-0.11-0.53-0.23-1.05-0.34-1.58c-0.12-0.53-0.22-1.05-0.37-1.58c-0.29-1.05-0.56-2.1-0.94-3.15
	c-0.68-2.09-1.59-4.17-2.69-6.17c-2.16-4.02-5.36-7.75-9.33-10.47c-0.12-0.09-0.25-0.17-0.37-0.26c-0.13-0.08-0.25-0.16-0.38-0.24
	c-0.26-0.16-0.51-0.32-0.77-0.48c-0.52-0.31-1.05-0.59-1.58-0.87c-1.08-0.53-2.18-1.03-3.32-1.42c-1.14-0.4-2.3-0.74-3.49-0.99
	c-0.3-0.06-0.6-0.12-0.91-0.18c-0.31-0.05-0.62-0.1-0.93-0.14c-0.32-0.04-0.63-0.08-0.97-0.11c-0.16-0.02-0.34-0.03-0.53-0.04
	c-0.05,0-0.11-0.01-0.16-0.01c-0.06,0-0.12,0-0.18-0.01c-0.12,0-0.24-0.01-0.36-0.01c0,0-0.01,0-0.01,0c-0.12,0-0.24,0.01-0.36,0.01
	c-0.06,0-0.12,0-0.18,0.01c-0.05,0-0.11,0.01-0.16,0.01c-0.19,0.01-0.36,0.02-0.53,0.04c-0.34,0.03-0.65,0.07-0.97,0.11
	c-0.32,0.04-0.62,0.09-0.93,0.14c-0.3,0.06-0.6,0.12-0.91,0.18c-1.2,0.25-2.36,0.59-3.49,0.99c-1.14,0.39-2.24,0.89-3.32,1.42
	c-0.53,0.28-1.06,0.57-1.58,0.87c-0.26,0.16-0.51,0.32-0.77,0.48c-0.13,0.08-0.25,0.16-0.38,0.24c-0.12,0.09-0.25,0.17-0.37,0.26
	c-3.97,2.72-7.17,6.45-9.33,10.47c-1.09,2.01-2.01,4.08-2.69,6.17c-0.38,1.04-0.65,2.1-0.94,3.15c-0.16,0.53-0.26,1.05-0.37,1.58
	c-0.11,0.53-0.23,1.05-0.34,1.58c-0.79,4.2-1.08,8.37-1.1,12.47c0,0,0,0,0,0.01c0.01,4.97,0.8,9.66,1.89,14.17
	c1.1,4.51,2.55,8.83,4.17,13.04c3.27,8.4,7.25,16.35,11.55,24.05c4.12,7.36,8.57,14.49,13.22,21.46c-1.65,4.55-3.43,9.03-5.39,13.41
	c-2.41,5.37-5.08,10.59-8.13,15.46c-1.52,2.43-3.14,4.77-4.88,6.95c-1.73,2.17-3.57,4.21-5.54,5.94c-0.5,0.42-0.98,0.87-1.49,1.24
	c-0.25,0.2-0.5,0.39-0.76,0.59c-0.26,0.18-0.51,0.36-0.77,0.54c-0.13,0.09-0.26,0.18-0.38,0.27c-0.13,0.08-0.26,0.16-0.39,0.24
	c-0.26,0.16-0.52,0.32-0.78,0.48c-0.26,0.14-0.53,0.28-0.79,0.42c-0.13,0.07-0.26,0.14-0.39,0.21c-0.13,0.06-0.27,0.12-0.4,0.18
	c-0.26,0.12-0.53,0.24-0.79,0.36c-0.27,0.1-0.53,0.2-0.8,0.29c-0.26,0.11-0.53,0.18-0.8,0.26c-0.13,0.04-0.27,0.08-0.4,0.12
	c-0.13,0.04-0.27,0.08-0.4,0.1c-0.27,0.06-0.53,0.11-0.8,0.17c-0.13,0.04-0.27,0.05-0.4,0.06c-0.13,0.02-0.27,0.03-0.4,0.05
	c-0.13,0.02-0.27,0.04-0.4,0.05c-0.13,0.02-0.27,0.01-0.4,0.02c-0.27,0.01-0.53,0.02-0.8,0.04c0,0,0,0,0,0
	c-3.41,0.01-6.69-0.71-9.74-2.14c-1.78-0.82-3.48-1.89-5.1-3.15c1.44-1.89,2.76-3.84,3.98-5.83c2.36-3.88,4.36-7.9,6.07-11.99
	c3.43-8.18,5.85-16.6,7.62-25.12c0.88-4.26,1.59-8.56,2.11-12.89c0.51-4.34,0.87-8.7,0.88-13.24c0,0,0,0,0-0.01
	c0-3.53-0.49-7.25-1.77-10.89c-0.07-0.23-0.16-0.45-0.26-0.68c-0.09-0.22-0.19-0.45-0.28-0.67c-0.19-0.45-0.37-0.9-0.6-1.33
	c-0.22-0.44-0.44-0.88-0.68-1.31c-0.26-0.42-0.51-0.84-0.77-1.27c-1.08-1.66-2.35-3.2-3.78-4.56c-2.87-2.71-6.26-4.63-9.7-5.9
	c-1.73-0.64-3.48-1.12-5.25-1.48c-0.89-0.17-1.77-0.32-2.68-0.43c-0.45-0.05-0.91-0.1-1.38-0.14c-0.23-0.02-0.48-0.03-0.71-0.05
	c-0.13-0.01-0.25-0.01-0.38-0.02c-0.07,0-0.14,0-0.21-0.01c-0.09,0-0.18,0-0.27,0c0,0,0,0-0.01,0s0,0-0.01,0c-0.09,0-0.18,0-0.27,0
	c-0.07,0-0.14,0-0.21,0.01c-0.13,0.01-0.25,0.01-0.38,0.02c-0.24,0.02-0.49,0.03-0.71,0.05c-0.47,0.04-0.92,0.08-1.38,0.14
	c-0.91,0.11-1.79,0.26-2.68,0.43c-1.77,0.36-3.52,0.84-5.25,1.48c-3.44,1.27-6.83,3.19-9.7,5.9c-1.43,1.36-2.7,2.9-3.78,4.56
	c-0.26,0.42-0.51,0.84-0.77,1.27c-0.23,0.43-0.45,0.87-0.68,1.31c-0.23,0.43-0.42,0.88-0.6,1.33c-0.09,0.22-0.19,0.45-0.28,0.67
	c-0.09,0.22-0.19,0.45-0.26,0.68c-1.28,3.64-1.77,7.35-1.77,10.89c0,0,0,0,0,0.01c0.01,4.53,0.37,8.9,0.88,13.24
	c0.52,4.34,1.23,8.63,2.11,12.89c1.77,8.52,4.19,16.94,7.62,25.12c1.71,4.09,3.71,8.11,6.07,11.99c1.21,1.99,2.53,3.94,3.98,5.83
	c-1.62,1.25-3.32,2.32-5.1,3.15c-3.06,1.43-6.34,2.14-9.74,2.14c0,0,0,0,0,0c-0.27-0.02-0.53-0.03-0.8-0.04
	c-0.13-0.01-0.27,0-0.4-0.02c-0.13-0.02-0.27-0.04-0.4-0.05c-0.13-0.02-0.27-0.03-0.4-0.05c-0.13-0.01-0.27-0.03-0.4-0.06
	c-0.27-0.06-0.53-0.11-0.8-0.17c-0.13-0.02-0.27-0.06-0.4-0.1c-0.13-0.04-0.27-0.08-0.4-0.12c-0.27-0.08-0.53-0.14-0.8-0.26
	c-0.27-0.1-0.53-0.2-0.8-0.29c-0.26-0.12-0.53-0.24-0.79-0.36c-0.13-0.06-0.27-0.12-0.4-0.18c-0.13-0.07-0.26-0.14-0.39-0.21
	c-0.26-0.14-0.53-0.28-0.79-0.42c-0.26-0.16-0.52-0.32-0.78-0.48c-0.13-0.08-0.26-0.16-0.39-0.24c-0.13-0.09-0.26-0.18-0.38-0.27
	c-0.26-0.18-0.51-0.36-0.77-0.54c-0.25-0.2-0.5-0.39-0.76-0.59c-0.51-0.38-1-0.82-1.49-1.24c-1.97-1.73-3.81-3.77-5.54-5.94
	c-1.73-2.18-3.35-4.52-4.88-6.95c-3.04-4.87-5.72-10.09-8.13-15.46c-1.95-4.38-3.74-8.86-5.39-13.41c4.65-6.97,9.1-14.1,13.22-21.46
	c4.3-7.7,8.28-15.65,11.55-24.05c1.62-4.21,3.07-8.53,4.17-13.04c1.09-4.51,1.88-9.21,1.89-14.17c0,0,0,0,0-0.01
	c-0.01-4.1-0.3-8.27-1.1-12.47c-0.11-0.53-0.23-1.05-0.34-1.58c-0.12-0.53-0.22-1.05-0.37-1.58c-0.29-1.05-0.56-2.1-0.94-3.15
	c-0.68-2.09-1.59-4.17-2.69-6.17c-2.16-4.02-5.36-7.75-9.33-10.47c-0.12-0.09-0.25-0.17-0.37-0.26c-0.13-0.08-0.25-0.16-0.38-0.24
	c-0.26-0.16-0.51-0.32-0.77-0.48c-0.52-0.31-1.05-0.59-1.58-0.87c-1.08-0.53-2.18-1.03-3.32-1.42c-1.14-0.4-2.3-0.74-3.49-0.99
	c-0.3-0.06-0.6-0.12-0.91-0.18c-0.31-0.05-0.62-0.1-0.93-0.14c-0.32-0.04-0.63-0.08-0.97-0.11c-0.16-0.02-0.34-0.03-0.53-0.04
	c-0.05,0-0.11-0.01-0.16-0.01c-0.06,0-0.12,0-0.18-0.01c-0.12,0-0.24-0.01-0.36-0.01c0,0-0.01,0-0.01,0c-0.12,0-0.24,0.01-0.36,0.01
	c-0.06,0-0.12,0-0.18,0.01c-0.05,0-0.11,0.01-0.16,0.01c-0.19,0.01-0.36,0.02-0.53,0.04c-0.34,0.03-0.65,0.07-0.97,0.11
	c-0.32,0.04-0.62,0.09-0.93,0.14c-0.3,0.06-0.6,0.12-0.91,0.18c-1.2,0.25-2.36,0.59-3.49,0.99c-1.14,0.39-2.24,0.89-3.32,1.42
	c-0.53,0.28-1.06,0.57-1.58,0.87c-0.26,0.16-0.51,0.32-0.77,0.48c-0.13,0.08-0.25,0.16-0.38,0.24c-0.12,0.09-0.25,0.17-0.37,0.26
	c-3.97,2.72-7.17,6.45-9.33,10.47c-1.09,2.01-2.01,4.08-2.69,6.17c-0.38,1.04-0.65,2.1-0.94,3.15c-0.16,0.53-0.26,1.05-0.37,1.58
	c-0.11,0.53-0.23,1.05-0.34,1.58c-0.79,4.2-1.08,8.37-1.1,12.47c0,0,0,0,0,0.01c0.03,6.53,0.66,12.78,1.48,18.99
	c0.84,6.2,1.91,12.34,3.18,18.43c1.27,6.09,2.71,12.13,4.35,18.13c1.41,5.19,2.98,10.35,4.7,15.47c-1.53,2.22-3.08,4.43-4.66,6.62
	c-1.24,1.72-2.5,3.43-3.77,5.13c-1.27,1.69-2.56,3.39-3.84,5.01c0,0-0.05,0.07-0.16,0.2c0,0,0,0,0,0c-0.8,1-1.28,2.26-1.28,3.64
	c0,3.21,2.61,5.82,5.82,5.82c1.86,0,3.52-0.88,4.58-2.24c0.1-0.13,0.16-0.21,0.16-0.21c1.39-1.76,2.71-3.5,4.03-5.26
	c1.31-1.76,2.61-3.52,3.89-5.3c0.04-0.05,0.08-0.11,0.12-0.17c0.89,2.21,1.82,4.41,2.79,6.6c2.58,5.75,5.47,11.41,8.89,16.88
	c1.71,2.73,3.57,5.42,5.63,8.01c1.02,1.3,2.12,2.57,3.26,3.81c0.57,0.62,1.18,1.22,1.77,1.83c0.63,0.59,1.24,1.19,1.89,1.76
	c0.66,0.57,1.31,1.15,2.02,1.68c0.35,0.27,0.7,0.55,1.05,0.81c0.37,0.26,0.74,0.51,1.1,0.77c0.18,0.13,0.37,0.26,0.55,0.38
	c0.19,0.12,0.39,0.24,0.58,0.36c0.39,0.24,0.78,0.48,1.17,0.72c0.41,0.22,0.82,0.44,1.22,0.66c0.2,0.11,0.41,0.22,0.61,0.33
	c0.21,0.1,0.43,0.2,0.64,0.29c0.43,0.19,0.86,0.39,1.29,0.58c0.45,0.17,0.9,0.33,1.35,0.5c0.44,0.18,0.91,0.31,1.38,0.44
	c0.23,0.07,0.47,0.13,0.7,0.2c0.23,0.07,0.47,0.13,0.71,0.18c1.9,0.46,3.89,0.67,5.87,0.7c0,0,0,0,0.01,0c2.49,0,5.01-0.26,7.48-0.8
	c2.47-0.54,4.88-1.36,7.15-2.42c3.03-1.4,5.78-3.21,8.27-5.25c2.49,2.04,5.24,3.85,8.27,5.25c2.27,1.06,4.68,1.88,7.15,2.42
	c2.47,0.54,4.99,0.8,7.48,0.8c0,0,0,0,0.01,0c1.98-0.03,3.96-0.24,5.87-0.7c0.24-0.05,0.47-0.11,0.71-0.18
	c0.23-0.07,0.47-0.13,0.7-0.2c0.47-0.13,0.93-0.27,1.38-0.44c0.45-0.17,0.9-0.33,1.34-0.5c0.43-0.19,0.86-0.38,1.29-0.58
	c0.21-0.1,0.43-0.2,0.64-0.29c0.2-0.11,0.41-0.22,0.61-0.33c0.41-0.22,0.82-0.44,1.22-0.66c0.39-0.24,0.78-0.48,1.17-0.72
	c0.19-0.12,0.39-0.24,0.58-0.36c0.18-0.13,0.37-0.26,0.55-0.38c0.37-0.26,0.74-0.51,1.1-0.77c0.36-0.27,0.7-0.54,1.05-0.81
	c0.71-0.53,1.35-1.12,2.02-1.68c0.66-0.57,1.27-1.17,1.89-1.76c0.59-0.61,1.2-1.21,1.77-1.83c1.14-1.24,2.24-2.51,3.26-3.81
	c2.06-2.59,3.91-5.28,5.63-8.01c3.42-5.47,6.31-11.14,8.89-16.88c0.98-2.19,1.9-4.39,2.79-6.6c0.04,0.05,0.08,0.11,0.12,0.17
	c1.28,1.77,2.58,3.54,3.89,5.3c1.32,1.76,2.64,3.49,4.03,5.26c0,0,0.02,0.02,0.03,0.03c1.06,1.46,2.77,2.41,4.71,2.41
	c3.21,0,5.82-2.61,5.82-5.82c0-1.38-0.48-2.64-1.28-3.64c0,0,0,0,0.01-0.01c-0.11-0.13-0.16-0.2-0.16-0.2
	c-1.28-1.62-2.57-3.32-3.84-5.01c-1.27-1.7-2.53-3.41-3.77-5.13c-1.58-2.19-3.13-4.4-4.66-6.62c1.72-5.12,3.28-10.28,4.7-15.47
	C270.93,301.38,272.37,295.34,273.64,289.25z M117.96,251.83C117.96,251.83,117.96,251.83,117.96,251.83
	c0.01-3.53,0.27-7,0.89-10.29c0.09-0.41,0.18-0.81,0.27-1.22c0.09-0.4,0.16-0.82,0.28-1.21c0.22-0.79,0.42-1.58,0.7-2.33
	c0.49-1.53,1.14-2.96,1.86-4.3c0.19-0.33,0.36-0.67,0.57-0.98c0.2-0.31,0.41-0.63,0.61-0.94c0.22-0.3,0.44-0.59,0.66-0.89
	c0.1-0.15,0.22-0.29,0.34-0.42c0.12-0.14,0.24-0.28,0.35-0.41c0.95-1.09,2.02-2.03,3.18-2.83c0.07-0.05,0.14-0.1,0.22-0.15
	c0.07-0.05,0.15-0.09,0.22-0.14c0.15-0.09,0.3-0.19,0.45-0.28c0.3-0.18,0.61-0.34,0.92-0.51c0.63-0.3,1.27-0.61,1.93-0.83
	c0.66-0.23,1.33-0.43,2-0.57c0.17-0.03,0.33-0.06,0.5-0.1c0.16-0.02,0.32-0.05,0.48-0.07c0.15-0.02,0.31-0.04,0.45-0.05
	c0.07-0.01,0.14-0.01,0.19-0.01c0.01,0,0.01,0,0.02,0c0.01,0,0.01,0,0.02,0c0.05,0,0.11,0.01,0.19,0.01
	c0.14,0.01,0.29,0.03,0.45,0.05c0.16,0.02,0.32,0.05,0.48,0.07c0.17,0.03,0.33,0.06,0.5,0.1c0.67,0.14,1.34,0.34,2,0.57
	c0.67,0.22,1.3,0.53,1.93,0.83c0.31,0.17,0.62,0.33,0.92,0.51c0.15,0.09,0.3,0.19,0.45,0.28c0.07,0.05,0.15,0.09,0.22,0.14
	c0.07,0.05,0.14,0.1,0.22,0.15c1.16,0.8,2.22,1.75,3.18,2.83c0.12,0.14,0.24,0.28,0.35,0.41c0.12,0.14,0.24,0.27,0.34,0.42
	c0.22,0.29,0.44,0.59,0.66,0.88c0.2,0.31,0.41,0.63,0.61,0.94c0.2,0.31,0.37,0.66,0.57,0.98c0.73,1.34,1.37,2.77,1.86,4.3
	c0.28,0.75,0.48,1.55,0.7,2.33c0.12,0.39,0.19,0.8,0.28,1.21c0.09,0.41,0.18,0.81,0.27,1.22c0.62,3.29,0.88,6.76,0.89,10.29
	c0,0,0,0,0,0.01c0,3.67-0.62,7.55-1.56,11.42c-0.94,3.87-2.24,7.75-3.71,11.59c-2.99,7.68-6.74,15.21-10.85,22.57
	c-2.45,4.37-5.04,8.68-7.73,12.94c-0.59-2-1.17-4.01-1.72-6.03c-1.58-5.76-2.96-11.58-4.18-17.43c-1.22-5.85-2.25-11.73-3.04-17.61
	C118.55,263.41,117.98,257.5,117.96,251.83z M177.98,321.42c-0.82-3.95-1.47-7.94-1.95-11.93c-0.47-3.98-0.79-8-0.8-11.85
	c0,0,0,0,0-0.01c0-2.52,0.37-4.88,1.09-6.96c0.04-0.14,0.09-0.26,0.15-0.38c0.05-0.13,0.1-0.25,0.16-0.38
	c0.1-0.25,0.2-0.51,0.33-0.74c0.12-0.24,0.24-0.47,0.36-0.71c0.14-0.22,0.28-0.45,0.41-0.67c0.58-0.88,1.24-1.68,2-2.42
	c1.54-1.45,3.5-2.61,5.73-3.43c1.11-0.41,2.29-0.74,3.49-0.98c0.6-0.11,1.21-0.22,1.8-0.29c0.3-0.04,0.6-0.07,0.88-0.09
	c0.15-0.01,0.28-0.02,0.42-0.03c0.09,0,0.18-0.01,0.27-0.01c0.09,0,0.18,0.01,0.27,0.01c0.14,0.01,0.27,0.01,0.42,0.03
	c0.29,0.02,0.58,0.05,0.88,0.09c0.6,0.07,1.2,0.17,1.8,0.29c1.2,0.24,2.38,0.57,3.49,0.98c2.23,0.82,4.19,1.98,5.73,3.43
	c0.76,0.73,1.42,1.54,2,2.42c0.13,0.23,0.27,0.45,0.41,0.67c0.12,0.24,0.24,0.47,0.36,0.71c0.13,0.23,0.23,0.48,0.33,0.74
	c0.05,0.13,0.1,0.25,0.16,0.38c0.05,0.12,0.11,0.25,0.15,0.38c0.72,2.08,1.09,4.45,1.09,6.96c0,0,0,0,0,0.01
	c-0.01,3.85-0.32,7.87-0.8,11.85c-0.48,3.99-1.14,7.98-1.95,11.93c-1.64,7.89-3.89,15.67-6.95,22.96
	c-1.53,3.65-3.28,7.16-5.28,10.44c-0.67,1.1-1.38,2.15-2.11,3.19c-0.73-1.04-1.44-2.09-2.11-3.19c-2-3.28-3.75-6.79-5.28-10.44
	C181.87,337.09,179.61,329.31,177.98,321.42z M266.67,251.83c-0.02,5.67-0.59,11.58-1.38,17.45c-0.79,5.88-1.82,11.76-3.04,17.61
	c-1.22,5.85-2.61,11.67-4.18,17.43c-0.55,2.02-1.13,4.03-1.72,6.03c-2.69-4.26-5.28-8.57-7.73-12.94
	c-4.11-7.36-7.87-14.89-10.85-22.57c-1.48-3.84-2.78-7.72-3.71-11.59c-0.94-3.87-1.56-7.75-1.56-11.42c0,0,0,0,0-0.01
	c0.01-3.52,0.27-6.99,0.89-10.29c0.09-0.41,0.18-0.81,0.27-1.22c0.09-0.4,0.16-0.82,0.28-1.21c0.22-0.79,0.42-1.58,0.7-2.33
	c0.49-1.53,1.14-2.96,1.86-4.3c0.19-0.33,0.36-0.67,0.57-0.98c0.2-0.31,0.41-0.63,0.61-0.94c0.22-0.29,0.44-0.59,0.66-0.88
	c0.1-0.15,0.22-0.29,0.34-0.42c0.12-0.14,0.24-0.28,0.35-0.41c0.95-1.09,2.02-2.03,3.18-2.83c0.07-0.05,0.14-0.1,0.22-0.15
	c0.07-0.05,0.15-0.09,0.22-0.14c0.15-0.09,0.3-0.19,0.45-0.28c0.3-0.18,0.61-0.34,0.92-0.51c0.63-0.3,1.27-0.61,1.93-0.83
	c0.66-0.23,1.33-0.43,2-0.57c0.17-0.03,0.33-0.06,0.5-0.1c0.16-0.02,0.32-0.05,0.48-0.07c0.15-0.02,0.31-0.04,0.45-0.05
	c0.07-0.01,0.14-0.01,0.19-0.01c0.01,0,0.01,0,0.02,0c0.01,0,0.01,0,0.02,0c0.05,0,0.11,0.01,0.19,0.01
	c0.14,0.01,0.29,0.03,0.45,0.05c0.16,0.02,0.32,0.05,0.48,0.07c0.17,0.03,0.33,0.06,0.5,0.1c0.67,0.14,1.34,0.34,2,0.57
	c0.67,0.22,1.3,0.53,1.93,0.83c0.31,0.17,0.62,0.33,0.92,0.51c0.15,0.09,0.3,0.19,0.45,0.28c0.07,0.05,0.15,0.09,0.22,0.14
	c0.07,0.05,0.14,0.1,0.22,0.15c1.16,0.8,2.22,1.75,3.18,2.83c0.12,0.14,0.24,0.28,0.35,0.41c0.12,0.14,0.24,0.27,0.34,0.42
	c0.22,0.29,0.44,0.59,0.66,0.89c0.2,0.31,0.41,0.63,0.61,0.94c0.2,0.31,0.37,0.66,0.57,0.98c0.73,1.34,1.37,2.77,1.86,4.3
	c0.28,0.75,0.48,1.55,0.7,2.33c0.12,0.39,0.19,0.8,0.28,1.21c0.09,0.41,0.18,0.81,0.27,1.22
	C266.4,244.83,266.66,248.3,266.67,251.83C266.67,251.83,266.67,251.83,266.67,251.83z"
        />
      </svg>
    </React.Fragment>
  );
};

export default Logo;
