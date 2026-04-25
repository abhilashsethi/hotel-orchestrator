# Hotel Offer Orchestrator

## 🚀 Tech Stack

- Node.js (TypeScript)
- Express
- Temporal (Workflow Orchestration)
- Redis (Caching)
- Docker

---

## 📌 Features

- Fetch hotels from multiple suppliers
- Deduplicate hotels by name
- Select the cheapest offer
- Orchestrate workflows using Temporal
- Redis caching with TTL for performance
- Price filtering (`minPrice`, `maxPrice`)

---

## ⚙️ Setup

### 1. Clone Repository

```bash
git clone https://github.com/abhilashsethi/hotel-orchestrator.git
cd hotel-orchestrator
```

---

### 2. Run with Docker (Recommended)

```bash
docker compose up --build
```

---

### 3. Environment Variables

Create a `.env` file:

```env
PORT=3000
REDIS_URL=redis://redis:6379
TEMPORAL_ADDRESS=temporal:7233
```

---

## 📡 API Endpoints

### Get Hotels

```http
GET /api/hotels?city=delhi
```

### With Price Filter

```http
GET /api/hotels?city=delhi&minPrice=5500&maxPrice=6000
```

---

## 📥 Sample Response

```json
[
  {
    "name": "Hotel Taj",
    "city": "delhi",
    "price": 5500
  }
]
```

---

## 🧠 Architecture

```
Client → Express API → Temporal Workflow → Activities (Suppliers)
                                 ↓
                             Redis Cache
```

### Explanation

- The API triggers a Temporal workflow
- The workflow fetches data from multiple suppliers (activities)
- Results are deduplicated and optimized
- Redis caches results to improve performance
- Worker processes execute workflows asynchronously

---

## ⚡ Optimization

- Redis caching reduces repeated workflow execution
- Temporal ensures reliable execution and retry handling
- Separation of API and worker improves scalability

---

## ▶️ How It Works

1. Client calls API
2. Cache is checked (Redis)
3. If miss → Temporal workflow starts
4. Worker executes supplier activities
5. Result is cached and returned
