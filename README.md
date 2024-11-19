# Code Challenge Roberto Lemes
- Nest JS
- Clean Architeture
- Domain Driven Design
- Clean Code
- More

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup
## (You need docker installed or install)

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

## Run tests

# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e


## Deployment on Google Cloud Run
# Steps

# Authenticate Google Cloud CLI:
$ gcloud auth login
$ gcloud auth configure-docker

# Set Your Project:
$ gcloud config set project <PROJECT_ID>
$ gcloud config set run/region <REGION>

# Configure permissions
$ gcloud projects add-iam-policy-binding <PROJECT_NAME> --member="<SERVICE_ACCOUNT>" --role="roles/storage.objectViewer"

# Create and then pull your Docker Image from Docker Hub
$ docker pull <IMAGE>:<VERSION>

# Tag the image 
$ docker-= tag  <IMAGE_TAG> gcr.io/ <PROJECT_ID>/<SERVICE_NAME>:<TVERSION_NAME>

# Push the Image to Google Container Registry:
$ docker push gcr.io/<PROJECT_ID>/<SERVICE_NAME>:<VERSION_NAME>

# Deploy the Image to Google Cloud Run:
$ gcloud run deploy qrcode-api \
  --image gcr.io/<PROJECT_ID>/<SERVICE_NAME>:<VERSION_NAME> \
  --platform managed \
  --region <REGION> \
  --allow-unauthenticated \
```

# Test the Deployment:

Access the service URL provided by Cloud Run.
Test an endpoint using curl:

```bash
curl -X POST https://<SERVICE_URL>/qrcode/create \
-H "Content-Type: application/json" \
-d '{"metadata": "Test QR Code"}'
```


## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
