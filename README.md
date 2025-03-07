# Signup Form

This is a simple signup form built with React, React Hook Form (RHF), and Zod for validation. It features a smooth validation flow and is automatically deployed to GitHub Pages.

## Features

- **React Hook Form (RHF)** for efficient form handling
- **Zod** for schema-based validation
- **Vite** for fast development and builds
- **GitHub Pages Auto Deployment**
- **SCSS Support**

## Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/yevhen-o/signupform.git
cd signupform
npm install
```

## Development

Run the development server:

```sh
npm run dev
```

The app will be available at `http://localhost:5173/`.

## Build

To build the project:

```sh
npm run build
```

The output will be in the `dist` folder.

## Deployment

This project is automatically deployed to GitHub Pages on changes to the `main` branch.
To deploy manually:

```sh
npm run deploy
```

Make sure the `homepage` field in `package.json` is correctly set to:

```
"homepage": "https://yevhen-o.github.io/signupform"
```

## Tech Stack

- React
- React Hook Form
- Zod
- Vite
- SCSS
- GitHub Pages

## License

This project is licensed under the MIT License.
