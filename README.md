# Deeploma

Welcome to Deeploma, an e-learning platform designed specifically for HR professionals. This frontend application, built with Next.js and styled using Tailwind CSS, serves as the user interface for Deeploma. It communicates with a backend developed using NestJS

## Live Demo

You can check out the live demo of this application at [deeploma.me](https://deeploma.me).

## Features

- Home Page: A landing page that provides an overview of the deeploma platform.
- Courses View: A dedicated route to display HR-related courses. Including video streaming.
- Instructor panel: Instructors can manage their profile in this view.

## Technologies Used

- Next.js: A React framework for building server-rendered applications.
- Tailwind CSS: A utility-first CSS framework for rapidly building custom designs.
- NestJS: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.

## Getting Started

### Prerequisites

- Node.js (v20.x or higher)
- Yarn (v1.x or higher)
- Docker

## Running the App

Install the dependecies:

```
yarn install
```

Set up your local env:

```
cp apps/web/.env.sample apps/web/.env.local
```

To start the development server, run:

```
make dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.
