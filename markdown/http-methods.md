# What Are HTTP Methods? — Summary

## HTTP & REST
HTTP is the protocol that moves data (pages, images, etc.) between clients and servers using a request-response model. It's stateless — each request is handled independently. REST, the most common API architecture style, relies on HTTP methods to tell the server what action to perform on a resource; without an HTTP method, you can't send a REST request at all.

## The Core HTTP Methods (CRUD)
- **GET** — retrieves data; no request body needed
- **POST** — creates a new resource; includes a request body with the resource's data
- **PUT** — replaces an entire existing resource with new data (missing fields get deleted)
- **PATCH** — updates only specific fields of a resource, leaving the rest untouched
- **DELETE** — removes a resource permanently

## Safe Methods
"Safe" methods are read-only — they never change data. **GET** and **HEAD** (which fetches only headers, not the body) fall into this category.

## Idempotent Methods
A method is "idempotent" if calling it repeatedly produces the same result. All safe methods qualify, plus **PUT** and **DELETE**. **POST** is *not* idempotent (each call creates a new resource), and **PATCH** *can* go either way depending on what the update does.