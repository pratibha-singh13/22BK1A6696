# URL Shortener API

This project is a basic URL shortening service built with Node.js, Express, and MongoDB. It allows users to generate shortened versions of long URLs with optional custom short codes and set validity periods for each link.

## Project Structure

All implementation is contained within the `question1/` directory.

## Features

- Shortens long URLs
- Allows optional custom short codes
- Supports expiry based on validity period (in minutes)
- Automatically invalidates expired URLs
- Built using ES Modules (`type: "module"` in `package.json`)

## API Endpoints

### POST `/shorturls`

**Description:**  
Creates a new shortened URL.

**URL:**  
`http://localhost:3000/shorturls`

**Method:**  
`POST`

**Request Body:**

```json
{
  "url": "https://example.com/very/long/url",
  "validity": 30,
  "shortCode": "abcd1"
}
