Serverless Backend API on Google Cloud
======================================

This project contains a serverless backend API that handles requests to provide data processing and integration services. The API is built using [Node.js](https://nodejs.org/) and deployed using [Google Cloud Functions](https://cloud.google.com/functions).

Features
--------

-   API Endpoints: Provides various endpoints for data manipulation and retrieval.
-   Scalability: Leverages Google Cloud Functions for auto-scaling and efficient cost management.

Prerequisites
-------------

Before you begin, ensure you have the following installed:

-   Node.js (version 12.x or later recommended)
-   [npm](https://npmjs.com/) (comes with Node.js)
-   [Google Cloud SDK](https://cloud.google.com/sdk) configured with your Google Cloud account

Installation
------------

`npm install`

Configuration
-------------

Configure your environment variables in a `.env` file (you should create this at the root of your project):

`OPEN_AI_URL=''`

`OPENAI_API_KEY=''`

Note: When deploying to Google Cloud Functions, make sure to configure the environment variables in the Google Cloud Console or using the Google Cloud SDK.
