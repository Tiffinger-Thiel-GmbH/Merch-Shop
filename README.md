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
    direction LR
    User 1 to many ORDER : creates
    ORDER 1 to one or many ORDER_ITEM : contains
    PRODUCT 1 to zero or many PRODUCT_VARIANT  : contains
    PRODUCT_VARIANT 1 to 1 ORDER_ITEM_VARIANT : refences
    ORDER_ITEM_VARIANT zero or many to 1 ORDER_ITEM : contains
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
        string description "nullable"
        date   createdAt "Timestamp w Zone"
    }
    ORDER_ITEM {
        string id PK "UUID"
        string idProduct FK "UUID from PRODUCT"
        string idOrder FK "UUID from ORDER"
        string name  "name from PRODUCT"
        string description "description from PRODUCT | nullable"
        int quantity
    }
    PRODUCT_VARIANT {
        string id PK "UUID"
        string productId FK "UUID"
        string category "Grösse, Typ etc."
        string name
        string description
        date createdAt "Timestamp w Z"
    }
    ORDER_ITEM_VARIANT {
        string id PK "UUID"
        string orderItemId FK "UUID"
        string productVariantId FK "UUID"
        string category
        string name
        string description
    }
```
