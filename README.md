# My Library App

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](LICENSE)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Husky](https://img.shields.io/badge/Husky-000000?style=flat-square&logo=husky&logoColor=white)](https://typicode.github.io/husky/)
[![Commitlint](https://img.shields.io/badge/Commitlint-000000?style=flat-square&logo=commitlint&logoColor=white)](https://commitlint.js.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TypeORM](https://img.shields.io/badge/TypeORM-262626?style=flat-square&logo=typeorm&logoColor=white)](https://typeorm.io/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=flat-square&logo=kubernetes&logoColor=white)](https://kubernetes.io/)


A TypeScript backend service for managing a personal library, built with Express, TypeORM, and MongoDB. Features modern tooling, Docker support, and integration with OpenLibrary for book data.

---

## 📚 Features

- Add books manually or by ISBN (fetches data from OpenLibrary)
- List books by device
- MongoDB with TypeORM
- RESTful API with Express
- Dockerized for easy deployment
- Unit tested with Vitest
- Linting, commit hooks, and best practices

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm
- MongoDB (local or Docker)

### Local Development

```bash
npm install
npm run build
npm start
```

The server will run on `http://localhost:3000` by default. Set `PORT` or `DATABASE_URL` in a `.env` file to override defaults.

### Using Docker Compose

```bash
docker-compose up --build
```

- App: [http://localhost:3000](http://localhost:3000)
- MongoDB: [localhost:27017](mongodb://localhost:27017)

---

## 🛠️ API Endpoints

Base URL: `/api`

### List Books by Device
- **GET** `/api/books/:id`
  - Returns all books for a given device ID.
  - **Params:** `id` (device ID)
  - **Response:** `[{ id, title, author, isbn, description, deviceId, ... }]`

### Create Book (Manual)
- **POST** `/api/books`
  - **Body:**
    ```json
    {
      "deviceId": "string",
      "title": "string",
      "author": "string",
      "description": "string",
      "isbn": "string"
    }
    ```
  - **Response:** Book object

### Create Book by ISBN
- **POST** `/api/books/isbn`
  - **Body:**
    ```json
    {
      "isbn": "string",
      "deviceId": "string"
    }
    ```
  - **Response:** `201 Created` on success

---

## 🗄️ Database Model

Books are stored with the following fields:
- `id` (ObjectId)
- `title` (string, required)
- `author` (string, optional)
- `isbn` (string, optional)
- `description` (string, optional)
- `deviceId` (string, required)
- `createdAt`, `updatedAt`, `startedReadAt`, `finishedReadAt` (dates)

---

## 🧪 Testing

Run all tests:
```bash
npm test
```

Run with coverage:
```bash
npm run test:coverage
```

---

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [OpenLibrary](https://github.com/internetarchive/openlibrary) for book data API

## ☸️ Kubernetes Deployment

Kubernetes manifests are provided in the `k8s/` directory for deploying the backend and MongoDB.

### 1. MongoDB Deployment & Service
- **File:** `k8s/mongo-deployment.yaml`
- Deploys a MongoDB instance and exposes it as a ClusterIP service named `mongodb-service` on port 27017.

### 2. Backend Deployment
- **File:** `k8s/backend-deployment.yaml`
- Deploys your backend app using the image `dsangelo/my-library-app:v1`.
- Sets environment variables for production, including `DATABASE_URL` pointing to the MongoDB service.

### 3. Backend Service
- **File:** `k8s/backend-service.yaml`
- Exposes the backend as a NodePort service on port 30001 (maps to container port 3000).

---

### 🏁 How to Deploy

1. **Start Minikube (or your k8s cluster):**
   ```bash
   minikube start
   ```

2. **Apply the manifests:**
   ```bash
   kubectl apply -f k8s/mongo-deployment.yaml
   kubectl apply -f k8s/backend-deployment.yaml
   kubectl apply -f k8s/backend-service.yaml
   ```

3. **Access the backend:**
   - Get the Minikube IP:
     ```bash
     minikube ip
     ```
   - The backend will be available at `http://<minikube-ip>:30001/api`.