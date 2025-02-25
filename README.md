# Exhibition Curation

This is a web-based platform designed to allow users to browse artworks, view artwork details and add them to collections. This project was built using preact and interacts with data from the [Art Insitute of Chicago](https://api.artic.edu/docs/) and the [National Gallery of Denmark](https://www.smk.dk/article/smk-api/) to display information about artworks.

A link to the hosted site can be found [here](https://agreaves99-exhib-curation.netlify.app/)

This project is **front-end only**, and so the user made collections will not persist across sessions.

## Features

- View a list of artworks
- Search artworks and sort results
- View individual artwork details
- Create, view and add artworks to user collections

## Setup

### Prerequisites

Ensure you have the following installed:

- npm (^10.9.2)
- Node.js (^v23.6.0)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/AGreaves99/exhibition-curation.git
   cd exhibition-curation
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

## Usage

Start the development server with:

```bash
npm run dev
```

Then, open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

For production, use:

```bash
npm run build
```
