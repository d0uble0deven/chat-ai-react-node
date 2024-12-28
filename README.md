# Chat AI React

A full-stack application for chatting with an AI, built using React for the frontend and Express with Prisma for the backend.

### Deployed Application

**Live Link**: [Chat AI React](https://secret-waters-32055-a87d6cb73364.herokuapp.com/)

---

## Features

- AI-driven chat functionality
- RESTful API backend
- Fully responsive frontend
- Seeded Prisma database

---

## Tech Stack

- **Frontend**: React, Axios, Lucide Icons, React Icons
- **Backend**: Express, Prisma, OpenAI API
- **Database**: PostgreSQL (Hosted on Heroku)

---

## Setup Instructions

### Prerequisites

- **Node.js**: v18 or higher
- **PostgreSQL**: v12 or higher
- **Heroku CLI**: To deploy or access Heroku services (optional for local development)

---

### Running Locally

#### Backend Setup

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd chat-ai-react
   ```

2. **Install Dependencies**:

```
npm install
```

3. **Setup .env File: Create a .env file in the root directory with the following variables**:

```
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<database_name>
OPENAI_API_KEY=<your_openai_api_key>
```

4. **Run Prisma Migrations**:

```
npx prisma migrate dev
```

5. **Seed the Database (optional)**:

```
npm run seed
```

6. **Start the Backend**:

```
npm run dev
```

The backend will be available at http://localhost:6002.

#### Frontend Setup

1. **Navigate to the Frontend Directory**:

```
cd frontend
```

2. **Install Dependencies**:

```
npm install
```

3. **Start the Frontend**:

```
npm start
```

The frontend will be available at http://localhost:6001.

### Project Structure

chat-ai-react/
├── prisma/ # Prisma schema and migration files
├── routes/ # Express routes
├── frontend/ # React frontend code
├── .env # Environment variables (not committed to version control)
├── server.js # Backend server entry point
└── package.json # Backend dependencies and scripts

### Deployment Notes

- Database: Ensure the Heroku PostgreSQL add-on is properly configured with the correct DATABASE_URL in your Heroku app settings.
- Prisma: Run npx prisma migrate deploy on your Heroku dyno to apply schema changes.
- Environment Variables: Set OPENAI_API_KEY in your Heroku config variables.
