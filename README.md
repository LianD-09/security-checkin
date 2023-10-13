# Security check in app

## Develop by Team 8 

## 1. Local development

- Running backend:
```
$ cd security-checkin-backend

$ yarn 

$ yarn prisma generate

// seed database for first run
$ yarn prisma db seed

// if you don't want to reset your DB run this command instead
$ yarn prisma db seed --skip-seed

$ yarn start:dev
```

> Note: Don't worry when run ```yarn prisma db seed``` and your log contains error lines. Just go to next command line

- Running web app:
```
$ cd security-checkin-frontend

$ yarn 

$ yarn start
```

- Running mobile app:

## 2. Deployment

> Chưa nghĩ ra viết gì