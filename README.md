# ProjectMark Assessment

A Node.js/TypeScript REST API built with Express.js, Clean Architecture principles, featuring user authentication, topic management, and resource handling.

## Project Architecture

This project follows **Clean Architecture** principles with a clear separation of concerns across multiple layers:

### Directory Structure

```
src/
├── domain/           # Business entities and core business logic
│   ├── user/        # User domain entities and business rules
│   ├── topic/       # Topic domain entities and business rules
│   └── resource/    # Resource domain entities and business rules
├── application/      # Application services and use cases
│   ├── dto/         # Data Transfer Objects
│   └── exception/   # Exception handling
├── interface/        # External interfaces and adapters
│   └── api/         # REST API controllers and routes
├── infra/           # Infrastructure concerns
│   └── persistence/ # Data persistence layer
├── shared/          # Shared utilities and services
│   ├── di/          # Dependency Injection container
│   ├── jwt/         # JWT authentication utilities
│   └── logger/      # Logging utilities
└── main.ts          # Application entry point
```

### Architecture Layers

- **Domain Layer**: Contains business entities and core business logic
- **Application Layer**: Orchestrates use cases and application services
- **Interface Layer**: Handles HTTP requests/responses and API routing
- **Infrastructure Layer**: Manages external concerns like data persistence
- **Shared Layer**: Provides cross-cutting concerns like DI, JWT, and logging

## Installation

### Setup Steps

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Environment Setup**
   Rename `.env.example` file to `.env`.

## Running the Project

### Run

For development with auto-recompilation:
```bash
pnpm run dev
```

### Run Tests
```bash
pnpm test
```
NOTE: integration tests was not finished.


## REST API Endpoints

### Authentication Endpoints

#### User Registration
- **POST** `/user/auth/register`
  - **Description**: Register a new user
  - **Body**:
    ```json
    {
      "name": "string",
      "email": "string", 
      "role": "ADMIN" | "USER"
    }
    ```
  - **Access**: Public

#### User Login
- **POST** `/user/auth/login`
  - **Description**: Authenticate user and get JWT token
  - **Body**:
    ```json
    {
      "email": "string"
    }
    ```
  - **Access**: Public

### User Management Endpoints

#### Get User by ID
- **GET** `/user/:id`
  - **Description**: Retrieve user information by ID
  - **Access**: Requires VIEW permission

### Topic Management Endpoints

#### Get All Topics
- **GET** `/topic/`
  - **Description**: Retrieve all topics
  - **Access**: Requires VIEW permission

#### Get Topic by ID
- **GET** `/topic/:id`
  - **Description**: Retrieve topic by ID with optional version parameter
  - **Query Parameters**: `version` (optional)
  - **Access**: Requires VIEW permission

#### Create Topic
- **POST** `/topic/`
  - **Description**: Create a new topic
  - **Body**:
    ```json
    {
      "name": "string",
      "content": "string",
      "parentTopicId": "string"
    }
    ```
  - **Access**: Requires CREATE permission

#### Update Topic
- **PUT** `/topic/:id`
  - **Description**: Update an existing topic
  - **Body**:
    ```json
    {
      "name": "string" (optional),
      "content": "string" (optional)
    }
    ```
  - **Access**: Requires EDIT permission

#### Delete Topic
- **DELETE** `/topic/:id`
  - **Description**: Delete a topic
  - **Access**: Requires DELETE permission

#### Get Topic Hierarchy Tree
- **GET** `/topic/hierarchy`
  - **Description**: Get topic hierarchy tree structure
  - **Query Parameters**: `id` (optional)
  - **Access**: Requires VIEW permission

#### Get Shortest Path Between Topics
- **GET** `/topic/shortest-path`
  - **Description**: Find shortest path between two topics
  - **Query Parameters**: `startId`, `endId`
  - **Access**: Requires VIEW permission

### Resource Management Endpoints

#### Get Resources by Topic ID
- **GET** `/resource/:topicId`
  - **Description**: Retrieve all resources for a specific topic
  - **Access**: Public

#### Create Resource
- **POST** `/resource/`
  - **Description**: Create a new resource
  - **Body**:
    ```json
    {
      "url": "string",
      "description": "string",
      "type": "VIDEO" | "ARTICLE" | "BOOK",
      "topicId": "string"
    }
    ```
  - **Access**: Requires CREATE permission

## Files

- `src/main.ts` - Application entry point and server setup
- `data/db.json` - JSON-based data storage
- `src/shared/di/init.di.ts` - Dependency injection configuration
- `src/interface/api/route/index.ts` - Route definitions
