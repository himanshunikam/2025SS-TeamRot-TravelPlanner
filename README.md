# TravelPlanner

TravelPlanner is a lightweight, single‑instance MERN‑stack application deployed on a low‑cost AWS EC2 micro instance. It offers a fast, static React front-end and an Express API backed by embedded MongoDB for atomic user‑data updates. Curated content for ten flagship cities—including attractions, ratings, and optimized imagery—is seeded into the database, while users can save and organize their own itineraries securely via JWT authentication and encrypted passwords.

---

## Features

* **Curated City Guides:** Pre-loaded data for some cities, complete with attractions, user ratings, and optimized imagery.
* **Itinerary Builder:** Save, organize, and manage your favorite places and attractions within personalized trip plans.
* **Secure Authentication:** User registration and login with hashed passwords (bcrypt) and JWT-based session management.
* **Atomic Data Updates:** MongoDB documents embed `savedPlaces` and `savedAttractions` arrays for efficient, atomic modifications.
* **Optimized Performance:** Static React SPA served by Express; images are resized and compressed via Sharp for quick load times.
* **Flexible Deployment:** Start locally with npm scripts or containerize with Docker Compose for consistent builds and deployments. Also hosted on AWS EC2 but not constantly running.
* **Responsive UI:** Mobile-first design using CSS Modules and React Context for state management, ensuring seamless experiences across devices.

---

## Tech Stack

* **Frontend:** React 18, plain JavaScript, CSS Modules, React-Router 6, native Fetch API
* **Backend:** Node.js, Express, bcrypt for password hashing, JSON Web Tokens for authentication
* **Database:** MongoDB (single-instance deployment on AWS EC2)
* **Image Processing:** Curated images sourced from Unsplash and compressed via ImageCompressor.com for optimal performance.
* **Testing:** Jest for unit tests (frontend and backend), Supertest for API endpoint tests
* **Containerization:** Docker Compose for containerized builds and deployments

---

## Prerequisites

* [Node.js](https://nodejs.org/) 
* [npm](https://www.npmjs.com/) 
* [MongoDB](https://www.mongodb.com/)

---

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/himanshunikam/2025SS-TeamRot-TravelPlanner.git
   cd 2025SS-TeamRot-TravelPlanner
   ```

2. **Install root dependencies**

   ```bash
   npm install
   ```

3. **Install client dependencies**

   ```bash
   cd client
   npm install
   ```

4. **Install server dependencies**

   ```bash
   cd ../server
   npm install
   ```

---

## Running the Application

From the project root directory, you can start the app locally:

```bash
npm run start:all
```

This script will concurrently start both the frontend and backend servers. Once the build completes, your browser should automatically open the app at `http://localhost:3000` (frontend) and `http://localhost:5000` (API).

To stop the servers, press `Ctrl+C` in the terminal where `start:all` is running.

---

### Running with Docker

Alternatively, you can use Docker Compose to build and run the application in containers. From the project root directory, run:

```bash
docker compose up --build
```

This command will build the Docker images and start both the frontend and backend services. Once the services are up, access the app at `http://localhost:3000`.

---

## Available Scripts

In both `client` and `server` directories, you’ll find these npm scripts:

| Command         | Description                                   |
| --------------- | --------------------------------------------- |
| `npm start`     | Start the development server.                 |
| `npm run build` | Build the production-ready app (client only). |
| `npm run lint`  | Run ESLint to catch code issues.              |
| `npm test`      | Run automated tests (if configured).          |

Additionally, at the root you have:

| Command             | Description                                |
| ------------------- | ------------------------------------------ |
| `npm run start:all` | Start both client and server concurrently. |

---

## Project Structure

```
2025SS-TeamRot-TravelPlanner/
├── .idea/                      # IDE settings
├── client/                     # React frontend
│   ├── public/                 # Static assets
│   ├── src/                    # Source code
│   │   ├── components/         # React components and tests
│   │   ├── App.js              # Root component
│   │   ├── index.js            # React entry point
│   │   └── setupTests.js       # Jest setup
│   ├── package.json            # Frontend dependencies and scripts
│   └── src.zip                 # Archived source (optional)
├── server/                     # Node.js backend
│   ├── middleware/             # Express middleware (e.g., auth)
│   ├── models/                 # Mongoose schemas (User.js)
│   ├── routes/                 # API route handlers
│   ├── config.js               # Environment configuration
│   ├── index.js                # Server entry point
│   └── __tests__/              # Jest/Supertest tests and coverage
├── Dockerfile                  # Container build instructions
├── docker-compose.yml          # Multi-container setup
├── .env                        # Environment variables
├── .gitignore
├── package.json                # Root dependencies and start scripts
└── README.md                   # Project documentation
```

---

## Architecture

TravelPlanner follows a traditional three‑tier MERN‑stack architecture deployed entirely on a single AWS EC2 micro instance, minimizing cost and complexity by running the React SPA, Express API, and MongoDB on one virtual machine.

### Frontend (React 18 + JavaScript + CSS Modules)

* **Framework & Styling:** Built with React 18 using plain JavaScript and CSS modules—no UI libraries or CSS frameworks to keep bundle sizes minimal.
* **Routing & State:** React‑Router 6 manages navigation, while two React Context providers handle global state: one for the JWT authentication token, and another for `savedPlaces` and `savedAttractions`.
* **Data Fetching:** Uses the native Fetch API, automatically attaching JWTs in the `Authorization` header for protected calls.
* **Build & Serve:** The frontend is compiled into static assets and served directly by the backend process in production fileciteturn2file3.

### Backend (Node.js + Express)

* **API Design:** A RESTful API built with Node.js and Express exposes endpoints under `/api/auth` for registration and login, and `/api/destinations` (and related routes) for CRUD operations on user data.
* **Security:** Passwords are hashed with bcrypt before storage, and JWTs (valid for one hour) secure protected routes.
* **Unified Process:** In production, the same Node.js process serves both the API and the built frontend, simplifying deployment and reducing resource use fileciteturn2file3.

### Databank (MongoDB)

* **Single-Instance Deployment:** MongoDB runs on the same EC2 instance alongside the application.
* **Schema Design:** Each user document contains `username`, `passwordHash`, and two embedded arrays—`savedPlaces` and `savedAttractions`.
* **Embedded Updates:** Storing saved items within the user document ensures atomic updates, fast dashboard rendering, and straightforward extensibility for additional per-item metadata fileciteturn2file8.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork this repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "feat: add new feature"`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request


---





