# ✈️ AeroPredict
<img width="1147" height="935" alt="image" src="https://github.com/user-attachments/assets/9beacf5a-30e2-46c1-92b3-d1a4231cc2b8" />
<img width="1144" height="987" alt="image" src="https://github.com/user-attachments/assets/031af03a-1d01-41a1-a856-8f9d82ba91c5" />


> AI-powered predictive maintenance platform for aircraft engines using Machine Learning, FastAPI, PostgreSQL, React, and XGBoost.

![Python](https://img.shields.io/badge/Python-3.12-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1)
![XGBoost](https://img.shields.io/badge/XGBoost-ML-orange)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Overview

AeroPredict is a full-stack predictive maintenance platform that estimates the **Remaining Useful Life (RUL)** of aircraft engines using Machine Learning.

The application allows users to upload aircraft engine sensor data in CSV format, runs an XGBoost model trained on the NASA CMAPSS turbofan dataset, and visualizes engine health through an interactive dashboard.

Designed as a production-style portfolio project, AeroPredict combines modern backend engineering, authentication, database design, machine learning inference, and a responsive frontend into a single application.

---

## Features

### Authentication

- JWT Authentication
- User Registration
- Secure Login
- Protected API Routes

---

### Engine Management

- Create Engine Records
- Retrieve Engines
- Engine Search
- Pagination
- Engine Status Management

---

### Machine Learning

- Upload CSV datasets
- Automated preprocessing
- XGBoost inference
- Remaining Useful Life prediction
- Engine health classification

---

### Dashboard

- Interactive KPI Cards
- Health Distribution
- Remaining Useful Life Charts
- Prediction Table
- CSV Export
- Demo Mode

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Query
- Axios
- Recharts
- Framer Motion

### Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT Authentication
- Pydantic

### Machine Learning

- Python
- Pandas
- NumPy
- Scikit-Learn
- XGBoost
- Joblib

---

## Architecture

```
                CSV Upload
                     │
                     ▼
              FastAPI Backend
                     │
             Data Validation
                     │
             Feature Processing
                     │
               XGBoost Model
                     │
             RUL Prediction
                     │
          Health Classification
                     │
               JSON Response
                     │
                     ▼
            React Dashboard
```

---

## Project Structure

```
AeroPredict
│
├── backend
│   ├── app
│   │   ├── api
│   │   ├── core
│   │   ├── db
│   │   ├── ml
│   │   ├── models
│   │   ├── repositories
│   │   ├── schemas
│   │   └── services
│   │
│   └── docker
│
├── frontend
│
├── notebooks
│
└── README.md
```

---

## API Endpoints

### Authentication

```
POST /auth/register
POST /auth/login
GET  /auth/me
```

### Engines

```
GET    /engines
POST   /engines
GET    /engines/{id}
PUT    /engines/{id}
DELETE /engines/{id}
```

### Predictions

```
POST /predictions/upload
GET  /predictions/demo
GET  /predictions
```

---

## Machine Learning Pipeline

```
CSV Upload
    │
    ▼
Read Dataset
    │
    ▼
Preprocessing
    │
    ▼
Feature Selection
    │
    ▼
XGBoost Prediction
    │
    ▼
Remaining Useful Life
    │
    ▼
Health Classification
```

---

## Health Categories

| Status | Remaining Useful Life |
|---------|----------------------:|
| 🟢 Healthy | > 120 cycles |
| 🟡 Warning | 51 – 120 cycles |
| 🔴 Critical | ≤ 50 cycles |

---

## Local Setup

### Clone

```bash
git clone https://github.com/Ash707987/AeroPredict.git
cd AeroPredict
```

### Backend

```bash
cd backend

uv sync

docker compose up -d

uv run uvicorn app.main:app --reload
```

Backend runs at

```
http://127.0.0.1:8000
```

Swagger

```
http://127.0.0.1:8000/docs
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Example Prediction Response

```json
{
  "total_engines": 100,
  "healthy": 63,
  "warning": 22,
  "critical": 15,
  "average_rul": 124.8,
  "results": [
    {
      "engine_id": 1,
      "predicted_rul": 182.4,
      "status": "Healthy"
    }
  ]
}
```

---

## Future Improvements

- Engine history
- Model versioning
- Confidence scores
- Batch prediction jobs
- Docker deployment
- CI/CD with GitHub Actions
- Cloud deployment
- Role-based access
- Prediction history
- Model monitoring

---

## Screenshots

### Landing Page

<img width="1147" height="935" alt="image" src="https://github.com/user-attachments/assets/4db1580a-86b8-498e-a170-87976ecf5cda" />


### Dashboard

<img width="1144" height="987" alt="image" src="https://github.com/user-attachments/assets/b325ba1a-a2c8-40b1-8e63-00d8ce5fad57" />


---

## Dataset

NASA CMAPSS Turbofan Engine Degradation Dataset

The machine learning model is trained using the publicly available CMAPSS aircraft engine degradation dataset developed by NASA.

---

## Author

**Ashutosh Parmar**

Computer Science Engineering Student

BIT Mesra

GitHub

https://github.com/Ash707987

---

If you found this project interesting, consider giving it a ⭐.
