# Run & Local Testing

Frontend (dev):

```bash
cd frontend
npm install
npm run dev
```

Backend matching function (sample):

The node function is at `node-functions/matching/index.js` and expects a JSON POST payload:

```json
{
  "campaign": { "budget": 100, "niche": "beauty", "location": "Jakarta" },
  "influencers": [ { "id": "inf1", "niche": "beauty", "rate": 80, "location": "Jakarta" } ]
}
```

You can POST to the deployed function URL or test with your EdgeOne/Cloud Functions runner.
