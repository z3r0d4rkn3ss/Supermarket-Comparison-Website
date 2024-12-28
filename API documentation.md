# Supermarket Comparison API Documentation

Welcome to the Supermarket Comparison API! Below you'll find all the information you need to use our API.

## Base URL

The base URL for accessing the API is:

```
https://yourdomain.com/api
```

---

## Authentication

Currently, the API does not require authentication. All endpoints are publicly accessible. However, in the future, you might need an API key for rate-limiting purposes or to track usage.

---

## Endpoints

### 1. `GET /api/compare_prices`

This endpoint returns a list of products and their prices from various supermarkets.

#### Request

```
GET /api/compare_prices?supermarkets=asda,tesco&sort=asc
```

#### Query Parameters (Optional):
- `supermarkets` - A comma-separated list of supermarkets to filter by (e.g., `asda,tesco`). If not provided, data from all supermarkets is returned.
- `sort` - Sort the results by price. Can be `asc` (ascending) or `desc` (descending).

#### Example Request:

```
GET /api/compare_prices?supermarkets=asda,tesco&sort=asc
```

#### Response Example:

```json
[
    {
        "product": "Apple",
        "asda_price": 1.00,
        "tesco_price": 1.10
    },
    {
        "product": "Banana",
        "asda_price": 1.20,
        "tesco_price": 1.25
    }
]
```

**Description:**
- Returns a list of products with their prices from the selected supermarkets.
- If no supermarket filter is specified, prices from all supermarkets are included.

---

### 2. `GET /api/proxy_scrape`

This endpoint allows you to scrape product prices from a supermarket's website through a proxy (if configured).

#### Request

```
GET /api/proxy_scrape?url=https://groceries.asda.com
```

#### Query Parameters:
- `url` (required) - The URL of the supermarket's product page to scrape.

#### Example Request:

```
GET /api/proxy_scrape?url=https://groceries.asda.com
```

#### Response Example:

```json
{
    "status": "success",
    "message": "Scraping successful"
}
```

**Description:**
- Scrapes product prices from the provided URL and returns the result.
- You can use this endpoint to fetch data directly from the supermarket's website.

---

## Error Handling

If there is an issue with the request, the API will respond with an error message and an appropriate HTTP status code.

### Common Error Responses:

- **400 Bad Request**: The request is malformed or missing required parameters.
    - Example: Missing the `url` parameter in the `proxy_scrape` endpoint.
- **404 Not Found**: The endpoint does not exist.
- **500 Internal Server Error**: An issue occurred on the server while processing the request.

#### Example Error Response:

```json
{
    "status": "error",
    "message": "Missing 'url' parameter in request"
}
```

---

## Rate Limiting

To prevent abuse, there may be rate limiting in place. If you exceed the rate limit, the API will return a `429 Too Many Requests` error with a message.

---

## API Usage Example

Here’s an example of how a third-party developer might integrate this API into their project.

### Example in JavaScript (Fetch API)

```javascript
// Fetch price comparison data from the API
fetch('https://yourdomain.com/api/compare_prices?supermarkets=asda,tesco&sort=asc')
  .then(response => response.json())
  .then(data => {
      console.log('Price Comparison Data:', data);
  })
  .catch(error => {
      console.error('Error fetching data:', error);
  });
```

### Example in Python (Requests)

```python
import requests

url = "https://yourdomain.com/api/compare_prices"
params = {
    'supermarkets': 'asda,tesco',
    'sort': 'asc'
}

response = requests.get(url, params=params)

if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code}")
```

---

## Best Practices for Integrating with the API

1. **Handle Errors Gracefully**: Always check for error responses from the API (like `400` or `500` status codes) and handle them appropriately in your application.
2. **Respect Rate Limits**: Avoid making too many requests in a short amount of time to prevent being rate-limited.
3. **Secure Scraping**: When using the `/proxy_scrape` endpoint, make sure you respect the target supermarket's website’s robots.txt or terms of service.

---

## Contact & Support

If you have any questions or need further assistance, feel free to contact us at **No Where**.
```
