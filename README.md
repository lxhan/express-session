## Testing API

```sh
# register
curl -X POST localhost:5000/register -H 'Content-Type: application/json' \
  -d '{ "name": "Alex", "password": "Secret123!", "passwordConfirmation": "Secret123!"}'

# login
curl -v -X POST localhost:5000/login -H 'Content-Type: application/json' \
  -d '{ "name": "Alex", "password": "Secret123!" }'

# login with cookie
curl -X POST localhost:5000/login -H 'Content-Type: application/json' \
  -d '{ "name": "Alex", "password": "Secret123!" }' \
  --cookie 'sid=s%3AqDZ3yFtLoRM6v-MbqT08R6nTKRQ36rlN.LcoszHoKEVkTG8yK9LNluO2ejQ4s84uTR2Ce6QDugPo'
```

## Docker shell

```sh
# mongo
docker exec -it db-container-id mongo -u user -p password db-name

# redis
docker exec -it cache-container-id redis-cli -a secret
```
