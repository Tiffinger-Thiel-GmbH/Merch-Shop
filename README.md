# Merch-Shop

## Getting started

```sh
npm install
docker compose up -d  # start postgres
npm run prisma generate

```

## Starting the API

```sh
npm run prisma:reset    # reset and reseed the db for dev before starting the dev server
npm run start:dev
```

## Entity Relationship Diagram

To view the diagram, install the `bierner.markdown-mermaid` extension in VS Code.

```mermaid
erDiagram
    direction RL
    User ||--o{ ORDER : creates
    ORDER ||--}| ORDER_ITEM : contains
    PRODUCT ||--o{ ORDER_ITEM  : reference
    User {
        string id PK "UUID"
        string name
        string email UK
        string password "hash"
        string createdAt "Timestamp w Zone"
    }
    ORDER {
        string id PK "UUID"
        string idUser FK
        date createdAt  "Timestamp w Zone"
        string status  "Created, Ordered, Canceled, Done"
    }
    PRODUCT {
        string id PK "UUID"
        string name
        string size "nullable"
        string description "nullable"
        date   createdAt "Timestamp w Zone"
    }
    ORDER_ITEM {
        string id PK "UUID"
        string idProduct FK "UUID from PRODUCT"
        string idOrder FK "UUID from ORDER"
        string name  "name from PRODUCT"
        string size  "size from PRODUCT | nullable"
        string description "description from PRODUCT | nullable"
        int quantity
    }
```
