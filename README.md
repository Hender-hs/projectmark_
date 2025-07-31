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


## REST API endpoints:

- **User Management**: User CRUD operations and authentication
- **Topic Management**: Topic-related operations
- **Resource Management**: Resource handling operations
- **Authentication**: User authentication and authorization

## Files

- `src/main.ts` - Application entry point and server setup
- `data/db.json` - JSON-based data storage
- `src/shared/di/init.di.ts` - Dependency injection configuration
- `src/interface/api/route/index.ts` - Route definitions
