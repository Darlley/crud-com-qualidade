import React from "react";

const basePadding = "5%";
const breakPoint = "850px";

export function GlobalStylesLive() {
  return (
    <style jsx global>{`
      :root {
        --color-basic-light: #fff;
        --color-basic-dark: #000;
        --color-basic-transparent: transparent;

        --color-primary-x050: #E0E8F9; 
        --color-primary-x100: #BED0F7;
        --color-primary-x200: #98AEEB;
        --color-primary-x300: #7B93DB;
        --color-primary-x400: #647ACB;
        --color-primary-x500: #4C63B6;
        --color-primary-x600: #4055A8;
        --color-primary-x700: #35469C;
        --color-primary-x800: #2D3A8C;
        --color-primary-x900: #19216C;
        
        --color-neutral-x050: #E0E8F9;
        --color-neutral-x100: #BED0F7;
        --color-neutral-x200: #98AEEB;
        --color-neutral-x300: #7B93DB;
        --color-neutral-x400: #647ACB;
        --color-neutral-x500: #4C63B6;
        --color-neutral-x600: #4055A8;
        --color-neutral-x700: #35469C;
        --color-neutral-x800: #2D3A8C;
        --color-neutral-x900: #19216C;
        
        --color-negative-x050: #E0E8F9;
        --color-negative-x100: #BED0F7;
        --color-negative-x200: #98AEEB;
        --color-negative-x300: #7B93DB;
        --color-negative-x400: #647ACB;
        --color-negative-x500: #4C63B6;
        --color-negative-x600: #4055A8;
        --color-negative-x700: #35469C;
        --color-negative-x800: #2D3A8C;
        --color-negative-x900: #19216C;
      }
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      button {
        border: none;
        cursor: pointer;
        outline: none;
        --outline: currentColor;
      }
      input {
        --outline: currentColor;
      }
      input[type="text"]:focus-visible,
      button:focus-visible {
        outline-offset: 2px;
        outline: 2px solid var(--outline);
      }
      button:disabled {
        cursor: not-allowed;
      }
      input[type="checkbox"] {
        accent-color: var(--color-primary-x500);
        border-radius: 4px;
        --outline: var(--color-primary-x500);
      }
      input[type="checkbox"]:focus-visible {
        outline-offset: 2px;
        outline: 2px solid var(--outline);
      }
      html {
        min-height: 100%;
        display: flex;
        flex-direction: column;
      }
      #__next,
      body,
      main {
        display: flex;
        flex: 1;
        flex-direction: column;
      }
      @media (min-width: ${breakPoint}) {
        main {
          flex-direction: row;
          max-height: 100vh;
        }
        main > header,
        main > section {
          overflow: hidden;
          flex: 1;
          padding-left: 5%;
          padding-right: 5%;
        }
        main > header {
          flex: 0.7;
        }
        main > section {
          overflow-y: auto;
        }
      }
      body {
        font-family: ui-sans-serif, system-ui, -apple-system,
          BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial,
          Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji,
          Segoe UI Symbol, Noto Color Emoji;
      }
      // [Header Area]
      header {
        min-height: 250px;
        color: var(--color-primary-x050);
        background-color: var(--color-primary-x500);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        background-blend-mode: luminosity;
        position: relative;
        padding-left: ${basePadding};
        padding-right: ${basePadding};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      header:before {
        content: "";
        background-color: rgba(0, 0, 0, 0.5);
        position: absolute;
        z-index: 1;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
      header > * {
        z-index: 2;
        position: relative;
      }
      header h1 {
        max-width: 600px;
        font-size: 24px;
      }
      @media (min-width: ${breakPoint}) {
        header h1 {
          font-size: 36px;
        }
      }
      header form {
        position: relative;
        font-size: 18px;
        max-width: 320px;
        width: 100%;
        margin-top: 16px;
        display: flex;
        align-items: stretch;
        box-shadow: rgb(255, 255, 255) 0px 0px 0px 0px,
          rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
          rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
          rgba(0, 0, 0, 0.1) 0px 1px 2px -1px;
      }
      header form input {
        --outline: var(--color-neutral-x100);
        border-radius: 8px;
        font-size: inherit;
        flex: 1;
        border: 0;
        padding: 12px 24px;
        padding-right: calc(48px + 16px);
      }
      header form button {
        --outline: var(--color-primary-x500);
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        cursor: pointer;
        aspect-ratio: 1;
        border: none;
        padding: 0;
        font-size: 30px;
        transform: scale(0.8);
        transition: all 0.2s;
        background-color: var(--color-primary-x500);
        color: var(--color-neutral-x050);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      header form button:hover,
      header form button:focus {
        background-color: var(--color-primary-x600);
      }
      // [Content Area]
      section {
        flex: 1;
        background-color: var(--color-neutral-x100);
        padding-top: 50px;
        padding-bottom: 50px;
        padding-left: ${basePadding};
        padding-right: ${basePadding};
      }
      section form {
        --iconSize: 24px;
        margin: 0 auto;
        max-width: 600px;
        position: relative;
        font-size: 18px;
      }
      section form::before {
        content: "🔎";
        width: var(--iconSize);
        height: var(--iconSize);
        position: absolute;
        top: -4px;
        left: 16px;
        bottom: 0;
        margin: auto;
        font-size: inherit;
      }
      section form input {
        display: flex;
        font-size: inherit;
        border: 0;
        border-radius: 8px;
        padding: 16px 32px;
        padding-left: calc(16px + 2px + var(--iconSize));
        width: 100%;
        box-shadow: rgb(255, 255, 255) 0px 0px 0px 0px,
          rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
          rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
          rgba(0, 0, 0, 0.1) 0px 1px 2px -1px;
      }
      // == [Table Reset]
      table {
        width: 100%;
        border: 0;
        border: none;
        border-collapse: collapse;
        border-spacing: 0;
      }
      table td,
      table th {
        border: none;
      }
      // ./[Table Reset]
      table {
        font-size: 16px;
        border-radius: 8px;
        overflow: hidden;
        margin: 0 auto;
        max-width: 600px;
        margin-top: 16px;
        box-shadow: rgb(255, 255, 255) 0px 0px 0px 0px,
          rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
          rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
          rgba(0, 0, 0, 0.1) 0px 1px 2px -1px;
      }
      thead {
        background-color: var(--color-primary-x050);
      }
      thead th {
        font-weight: bold;
        color: var(--color-neutral-x900);
        font-weight: 600;
        padding: 10px;
      }
      tbody {
        background-color: var(--color-basic-light);
      }
      tbody td {
        padding: 10px;
      }
      button,
      a {
        transition: all 0.2s;
      }
      a:focus,
      a:hover {
        opacity: 0.6;
      }
      button[data-type] {
        border: 0;
        border-radius: 8px;
        padding: 8px 12px;
      }
      button[data-type="delete"] {
        background-color: transparent;
        color: var(--color-negative-x500);
      }
      button[data-type="delete"]:hover,
      button[data-type="delete"]:focus {
        background-color: var(--color-negative-x050);
      }
      button[data-type="load-more"] {
        font-weight: bold;
        color: var(--color-primary-x500);
        background-color: var(--color-primary-x050);
      }
      button[data-type="load-more"]:hover,
      button[data-type="load-more"]:focus {
        background-color: var(--color-primary-x100);
      }
      // [Common Stuff]
      .typewriter h1 {
        display: inline-block;
        overflow: hidden; /* Ensures the content is not revealed until the animation */
        border-right: 0.15em solid var(--color-primary-x100); /* The typwriter cursor */
        white-space: nowrap; /* Keeps the content on a single line */
        margin: 0 auto; /* Gives that scrolling effect as the typing happens */
        letter-spacing: 0.05em; /* Adjust as needed */
        animation: typing 3s steps(40, end),
          blink-caret 0.75s step-end infinite;
      }
      /* The typing effect */
      @keyframes typing {
        from {
          width: 0;
        }
        to {
          width: 100%;
        }
      }
      /* The typewriter cursor effect */
      @keyframes blink-caret {
        from,
        to {
          border-color: transparent;
        }
        50% {
          border-color: var(--color-primary-x100);
        }
      }
    `}</style>
  )
}

/* ANNOTATIONS 

  https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
  https://caniuse.com/?search=custom%20properties (BOM)
  https://youtu.be/ESMLqFWIEDQ
  https://youtu.be/PVzWaxzY2BU
  https://youtu.be/TnafhcH9I4c
*/