# TrueBalance - Your Personal Finance Manager App

## Overview

TrueBalance is a clean, responsive, and powerful full-stack personal finance manager application designed to help you effortlessly track expenses, monitor income, and visualize your financial health with intuitive analytics. Built with modern web technologies, it provides a robust foundation for managing your money.

## Live Demo

Experience TrueBalance in action:
<https://true-balance-m2dq.vercel.app/>

## Features

* **Comprehensive Dashboard:** Get an at-a-glance overview of your financial health with real-time charts displaying income, expenses, and savings.
* **Easy Transaction Management:** Quickly add and categorize your financial transactions to maintain accurate records.
* **Powerful Analytics:** Visualize your spending habits and financial trends through dynamic charts and graphs.
* **Clean & Modular Codebase:** Designed for clarity and extensibility, making it easy to understand, customize, and build upon.
* **Fully Responsive UI:** Enjoy a seamless user experience across all devices, from desktop computers to mobile phones.

## Tech Stack

TrueBalance is built with a modern and robust technology stack:

* **Frontend & Backend (Next.js App Router):**
    * [Next.js](https://nextjs.org/) (React Framework with App Router for both frontend and API routes)
    * [TypeScript](https://www.typescriptlang.org/)
    * [Tailwind CSS](https://tailwindcss.com/) (for styling)
    * [Recharts](https://recharts.org/) (for data visualization)
* **Database:**
    * [MongoDB](https://www.mongodb.com/) (NoSQL database)

## Getting Started

Follow these steps to set up and run TrueBalance locally, or deploy it to Vercel.

### Prerequisites

Before you begin, ensure you have the following installed:

* [Node.js](https://nodejs.org/en/download/) (LTS version recommended)
* [npm](https://www.npmjs.com/get-npm) (comes with Node.js) or [Yarn](https://yarnpkg.com/getting-started/install)
* [MongoDB](https://www.mongodb.com/try/download/community) (Community Server for local development, or a cloud-based service like MongoDB Atlas)
* [Git](https://git-scm.com/downloads)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/TrueBalance.git](https://github.com/your-username/TrueBalance.git) # Replace with your actual repo URL
    cd TrueBalance
    ```

2.  **Install dependencies:**
    ```bash
    npm install # or yarn install
    ```

3.  **Configure Environment Variables:**
    * Create a `.env` file in the **root directory** of your project (i.e., `TrueBalance/.env`).
    * Add your MongoDB connection string:
        ```
        MONGO_URI=your_mongodb_connection_string
        ```
        (Replace `your_mongodb_connection_string` with your actual MongoDB URI, e.g., `mongodb://localhost:27017/truebalance` for local or an Atlas connection string.)

### Running Locally

1.  **Start the MongoDB server:**
    Ensure your MongoDB instance is running. If using local MongoDB, start it via your preferred method (e.g., `mongod` in your terminal).

2.  **Start the Next.js development server:**
    ```bash
    npm run dev # or yarn dev
    ```
    The application will typically open in your browser at `http://localhost:3000`. Next.js handles both the frontend and API routes from this single command.

### Deployment to Vercel

TrueBalance is optimized for deployment on Vercel.

1.  **Connect your GitHub repository to Vercel:**
    * Go to [Vercel](https://vercel.com/) and log in.
    * Click "New Project" and import your TrueBalance GitHub repository.
2.  **Configure Environment Variables on Vercel:**
    * In your Vercel project settings, go to "Environment Variables."
    * Add `MONGO_URI` with your production MongoDB connection string (e.g., from MongoDB Atlas).
3.  **Deploy:**
    * Vercel will automatically detect the Next.js project and deploy your application. No special root directory adjustments are typically needed for standard Next.js App Router projects.

## What You Get

Upon purchasing TrueBalance, you will receive:

* **Full Source Code:** Complete frontend and backend code for the TrueBalance application.
* **Comprehensive Setup Guide:** Detailed instructions for setting up the project locally and deploying it to Vercel.
* **Responsive UI:** A mobile-friendly and adaptive layout that looks great on any device.
* **Lifetime Updates:** Access to all future updates, enhancements, and bug fixes for the project.

## Who It's For

This project is ideal for:

* **Developers:** Those looking to build or integrate a personal finance management tool.
* **Indie Hackers:** Entrepreneurs aiming to launch MVPs (Minimum Viable Products) quickly.
* **Students:** Individuals learning full-stack project structure with Next.js, TypeScript, Tailwind CSS, and MongoDB.

## Important Note

This version of TrueBalance **does not include user authentication**. It is designed for personal use, demo purposes, or as a starting point for projects where you plan to implement authentication separately.

## License

This project is open-sourced under the [MIT License](https://opensource.org/licenses/MIT). You are free to use, modify, and distribute the code, provided you include the original copyright and license notice.
