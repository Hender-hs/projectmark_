# ProjectMark Assessment

A Node.js/TypeScript REST API built with Express.js, Clean Architecture principles, featuring user authentication, topic management, and resource handling.

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


## Authentication & Authorization

### User Roles

The API supports three user roles with different permission levels:

- **ADMIN**: Full access to all operations (view, edit, create, delete)
- **EDITOR**: Can view, edit, and create, but cannot delete
- **VIEWER**: Can only view content

### Permissions

- **VIEW**: Read access to resources
- **EDIT**: Update/modify access to resources  
- **CREATE**: Create new resources
- **DELETE**: Remove resources

### Role-Permission Matrix

| Role | VIEW | EDIT | CREATE | DELETE |
|------|------|------|--------|--------|
| ADMIN | ✅ | ✅ | ✅ | ✅ |  ✅
| EDITOR | ✅ | ✅ | ✅ | ❌ |  ❌
| VIEWER | ✅ | ❌ | ❌ | ❌ |  ❌

### Authentication

All protected endpoints require a valid JWT token in the Authorization header:
```
Authorization: <jwt_token>
```

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
      "role": "ADMIN" | "EDITOR" | "VIEWER"
    }
    ```
  - **Authentication**: Not required (Public)
  - **Permissions**: None
  - **Response**: Returns created user object

#### User Login
- **POST** `/user/auth/login`
  - **Description**: Authenticate user and get JWT token
  - **Body**:
    ```json
    {
      "email": "string"
    }
    ```
  - **Authentication**: Not required (Public)
  - **Permissions**: None
  - **Response**: Returns JWT token for authentication

### User Management Endpoints

#### Get User by ID
- **GET** `/user/:id`
  - **Description**: Retrieve user information by ID
  - **Authentication**: Required (JWT token)
  - **Permissions**: VIEW
  - **Roles**: ADMIN, EDITOR, VIEWER
  - **Response**: Returns user object

### Topic Management Endpoints

#### Get All Topics
- **GET** `/topic/`
  - **Description**: Retrieve all topics
  - **Authentication**: Required (JWT token)
  - **Permissions**: VIEW
  - **Roles**: ADMIN, EDITOR, VIEWER
  - **Response**: Returns array of topic objects

#### Get Topic by ID
- **GET** `/topic/:id`
  - **Description**: Retrieve topic by ID with optional version parameter
  - **Authentication**: Required (JWT token)
  - **Permissions**: VIEW
  - **Roles**: ADMIN, EDITOR, VIEWER
  - **Query Parameters**: `version` (optional)
  - **Response**: Returns topic object

#### Create Topic
- **POST** `/topic/`
  - **Description**: Create a new topic
  - **Authentication**: Required (JWT token)
  - **Permissions**: CREATE
  - **Roles**: ADMIN, EDITOR
  - **Body**:
    ```json
    {
      "name": "string",
      "content": "string",
      "parentTopicId": "string"
    }
    ```
  - **Response**: Returns created topic object

#### Update Topic
- **PUT** `/topic/:id`
  - **Description**: Update an existing topic
  - **Authentication**: Required (JWT token)
  - **Permissions**: EDIT
  - **Roles**: ADMIN, EDITOR
  - **Body**:
    ```json
    {
      "name": "string" (optional),
      "content": "string" (optional)
    }
    ```
  - **Response**: Returns updated topic object

#### Delete Topic
- **DELETE** `/topic/:id`
  - **Description**: Delete a topic
  - **Authentication**: Required (JWT token)
  - **Permissions**: DELETE
  - **Roles**: ADMIN
  - **Response**: Returns success message

#### Get Topic Hierarchy Tree
- **GET** `/topic/hierarchy`
  - **Description**: Get topic hierarchy tree structure
  - **Authentication**: Required (JWT token)
  - **Permissions**: VIEW
  - **Roles**: ADMIN, EDITOR, VIEWER
  - **Query Parameters**: `id` (optional)
  - **Response**: Returns topic hierarchy tree

#### Get Shortest Path Between Topics
- **GET** `/topic/shortest-path`
  - **Description**: Find shortest path between two topics
  - **Authentication**: Required (JWT token)
  - **Permissions**: VIEW
  - **Roles**: ADMIN, EDITOR, VIEWER
  - **Query Parameters**: `startId`, `endId`
  - **Response**: Returns shortest path array

### Resource Management Endpoints

#### Get Resources by Topic ID
- **GET** `/resource/:topicId`
  - **Description**: Retrieve all resources for a specific topic
  - **Authentication**: Not required (Public)
  - **Permissions**: None
  - **Response**: Returns array of resource objects

#### Create Resource
- **POST** `/resource/`
  - **Description**: Create a new resource
  - **Authentication**: Required (JWT token)
  - **Permissions**: CREATE
  - **Roles**: ADMIN, EDITOR
  - **Body**:
    ```json
    {
      "url": "string",
      "description": "string",
      "type": "VIDEO" | "ARTICLE" | "BOOK",
      "topicId": "string"
    }
    ```
  - **Response**: Returns created resource object

## Files

- `src/main.ts` - Application entry point and server setup
- `data/db.json` - JSON-based data storage
- `src/shared/di/init.di.ts` - Dependency injection configuration
- `src/interface/api/route/index.ts` - Route definitions
