"use client"

// import { useEffect, useRef } from "react"
// import * as THREE from "three"

import styles from './outrun-retro.module.css'

export default function OutrunRetro() {
  return <>
    <div
      className={`${styles.background80s} ${styles.animatedClouds} ${styles.stars}`}
      style={{'--background-height': '100vh'} as React.CSSProperties}
    >
      {/* <div className={`${styles.sun}`}></div> */}
      <div
        className={`${styles.grid}`}
        style={{
          '--grid-color': 'rgba(115,59,139,0.7)',
          '--grid-size': '30px',
          '--grid-blur': '1px',
        } as React.CSSProperties}
      ></div>
      {/* <div
        className={`${styles.mountain}`}
        style={{
          '--mountain-base': '10vw',
          '--mountain-height': '5vw',
          '--mountain-color1': '#a684cb',
          '--mountain-color2': '#b533b3',
          '--mountain-offset': '10vw',
          '--mountain-tilt': '-20deg',
        } as React.CSSProperties}
      ></div> */}
      {/* <div className="mountain" style="--mountain-base:10vw;--mountain-height:5vw;--mountain-color1:#a684cb;--mountain-color2:#681e6b;--mountain-tilt:59deg;--mountain-offset:20vw;"></div>
      <div className="mountain" style="--mountain-base:8vw;--mountain-height:4vw;--mountain-color1:#a684cb;--mountain-color2:#b533b3;--mountain-offset:20vw;--mountain-tilt:-20deg"></div>
      <div className="mountain" style="--mountain-base:3vw;--mountain-height:4vw;--mountain-color1:#a684cb;--mountain-color2:#681e6b;--mountain-tilt:45deg;--mountain-offset:28vw;"></div>
      <div className="mountain" style="--mountain-base:5vw;--mountain-height:5vw;--mountain-color1:#a684cb;--mountain-color2:#681e6b;--mountain-offset:-40vw;--mountain-tilt:-20deg"></div>
      <div className="mountain" style="--mountain-base:5vw;--mountain-height:5vw;--mountain-color1:#a684cb;--mountain-color2:#b533b3;--mountain-tilt:33deg;--mountain-offset:-35vw;"></div>
      <div className="mountain" style="--mountain-base:5vw;--mountain-height:5vw;--mountain-color1:#a684cb;--mountain-color2:#681e6b;--mountain-tilt:-62deg;--mountain-offset:-5vw;"></div>
      <div className="mountain" style="--mountain-base:10vw;--mountain-height:5vw;--mountain-color1:#a684cb;--mountain-color2:#2a025d;--mountain-tilt:-20deg"></div>
      <div className="mountain" style="--mountain-base:10vw;--mountain-height:5vw;--mountain-color1:#a684cb;--mountain-color2:#150030;--mountain-tilt:59deg;--mountain-offset:10vw;"></div>
      <div className="mountain" style="--mountain-base:10vw;--mountain-height:10vw;--mountain-color1:#a684cb;--mountain-color2:#150030;--mountain-tilt:-33deg;--mountain-offset:-30vw;"></div>
      <div className="mountain" style="--mountain-base:10vw;--mountain-height:10vw;--mountain-color1:#a684cb;--mountain-color2:#2a025d;--mountain-offset:-20vw;--mountain-tilt:20deg"></div>
      <div className="mountain" style="--mountain-base:3vw;--mountain-height:10vw;--mountain-color1:#a684cb;--mountain-color2:#681e6b;--mountain-tilt:45.5deg;--mountain-offset:-10vw;"></div> */}

      {/* <div className={`${styles.road}`} ></div> */}
      <div className={`${styles.overlay}`}></div>

      <div className={`${styles.text}`}>
        <span className={`${styles.chrome} ${styles.shine}`} data-text="Ben&nbsp;">
          Ben {/* <span className={`${styles.spark}`}></span> */}
        </span>
        <span
          className={`${styles.chrome} ${styles.shine}`} data-text="Orozco"
          style={{
            '--shine-delay': '1s',
          } as React.CSSProperties}
        >Orozco{/* <span className={`${styles.spark} ${styles.sparkOffset}`}></span> */}</span>

        <div className={`${styles.outrun} ${styles.glow}`}>Technologist, Tech Lead, Full-stack Dev</div>
      </div>
    </div>
    <svg width="0" height="0">
      <filter id="filter">
        <feTurbulence type="fractalNoise" baseFrequency=".01" numOctaves="10" id="fractalNoise" />
        <feDisplacementMap id="displacementMap" in="SourceGraphic" scale="120" />
      </filter>
      <animate
        xlinkHref="#displacementMap"
        id="animclouds1"
        begin="0; animclouds2.end"
        attributeName="scale"
        from="50"
        to="180"
        dur="3s"
        fill="freeze"
      />
      <animate
        xlinkHref="#displacementMap"
        id="animclouds2"
        begin="animclouds1.end"
        attributeName="scale"
        from="180"
        to="50"
        dur="3s"
        fill="freeze"
      />
      <animate
        xlinkHref="#fractalNoise"
        id="animclouds3"
        begin="0;animclouds4.end"
        attributeName="baseFrequency"
        from="0.03"
        to="0.01"
        dur="30s"
        fill="freeze"
      />
      <animate
        xlinkHref="#fractalNoise"
        id="animclouds4"
        begin="animclouds3.end"
        attributeName="baseFrequency"
        from="0.01"
        to="0.03"
        dur="30s"
        fill="freeze"
      />
    </svg>
  </>
}
