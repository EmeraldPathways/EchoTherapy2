# Frontend - AI Mental Health PWA

Next.js (React/TypeScript) Progressive Web App for the AI Mental Health Companion. This version connects to a backend that uses the OpenAI Assistants API.

## Setup

1.  Ensure you are in the `frontend` directory.
2.  Install dependencies:
    ```bash
    npm install
    # or
    # yarn install
    ```
3.  Create a `.env.local` file in this directory with the backend API URL:
    ```
    NEXT_PUBLIC_API_URL=http://localhost:8000
    ```

## Running in Development

```bash
npm run dev
# or
# yarn dev