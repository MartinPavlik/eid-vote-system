# eid-vote-system

Implemented as a part of https://www.paralelnipolis.cz/obcanka/ hackaton in ParalelniPolis.

## How to run

### Backend
```
cd backend;
yarn install;
yarn build
yarn start
```

### Frontend

If you want to run app on different port, for example 5000, use `PORT=5000 yarn start`.
You can change the url to backend simply by variable `GRAPHQL_URL_WS`.

Check `.env` for more.

```
cd frontend;
yarn build;
yarn start;
```