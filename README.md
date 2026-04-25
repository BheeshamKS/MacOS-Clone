# MacOS Clone

A stunning, highly interactive web-based clone of macOS built with React, Vite, Tailwind CSS, and Framer Motion. 

This project aims to recreate the fluid, weightless "liquid glass" aesthetic of modern macOS, featuring accurate window management physics, a dynamic dock, and beautifully designed application interfaces.

## 🌟 Key Features

*   **Advanced Window Management:** 
    *   Drag windows freely around the desktop space.
    *   **Minimize:** Features the authentic macOS "Scale Effect"—windows smoothly shrink and fly precisely into their exact corresponding dock icons.
    *   **Maximize:** Bounds-aware maximizing that snaps perfectly beneath the Menu Bar without covering the dock.
    *   **Focus State:** Accurate z-index management brings active windows to the front.
*   **Interactive Dock:** Smooth icon magnification (Genie/Mac style) driven by precise Framer Motion physics.
*   **Dynamic Menu Bar:** Features a real-time clock, date, and dynamically updates the title based on the currently focused application.
*   **Authentic Applications:**
    *   **Calculator:** Fully functional calculator featuring the brand new macOS Sequoia Currency Converter layout with a split display and circular buttons.
    *   **Calendar:** A dynamic, functional calendar component.
    *   **System Shells:** Finder, Contacts, and Settings apps feature accurate full-height translucent title bar integration.
*   **Deep Glassmorphism:** Utilizes `@hashintel/refractive` to achieve true backdrop blurring, refraction, and the signature Apple "liquid glass" visual style.

## 🛠️ Technology Stack

*   **Core:** React 18, TypeScript, Vite
*   **Styling:** Tailwind CSS (Vanilla CSS for base tokens)
*   **Animations:** Framer Motion
*   **Icons:** Lucide React & Custom SVGs
*   **Effects:** `@hashintel/refractive`

## 🚀 Getting Started

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/macos-clone.git
    cd macos-clone
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Open in Browser:** Navigate to `http://localhost:5173` (or the port provided by Vite).

## 🎨 Design Philosophy
This project strictly adheres to modern, premium design aesthetics. Instead of generic colors, it utilizes curated HSL palettes, smooth gradients, and subtle micro-animations to create a responsive, lively environment that goes beyond a simple MVP.
