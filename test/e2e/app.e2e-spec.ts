import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import * as request from 'supertest'

import { AppModule } from '../../src/app.module'

describe('QRCode Application (e2e)', () => {
  let app: INestApplication
  const prisma = new PrismaClient()

  beforeAll(async () => {
    const { execSync } = require('child_process')

    execSync('npx prisma migrate deploy', {
      stdio: 'inherit',
    })

    if (app)
      console.log('routes', app.getHttpServer()._events.request._router.stack)

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    const qrCodes = await prisma.qRCode.findMany()
    console.log('\nQRCode Table after tests:')
    console.table(qrCodes)

    await prisma.qRCode.deleteMany()
    console.log('\n ** test db cleared **')

    if (app) 
      await app.close()

    await prisma.$disconnect()
  })

  it('should create a QR code via POST /qrcode/create', async () => {
    const response = await request(app.getHttpServer())
      .post('/qrcode/create')
      .send({ metadata: 'e2e - Create Test'})
    
    expect(response.status).toBe(201)
    expect(response.body.metadata).toBe('e2e - Create Test')

  })

  it('should retrieve a QR code via GET /qrcode/:id', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/qrcode/create')
      .send({ metadata: 'e2e - Retrieve Test'})

    const { id } = createResponse.body
    
    const retrieveResponse = await request(app.getHttpServer())
      .get(`/qrcode/${id}`)
      .expect(200)

    expect(retrieveResponse.body.metadata).toBe('e2e - Retrieve Test')
  })

  it('should return 404 for non-existing QR code', async () => {
    await request(app.getHttpServer())
      .get('/qrcode/non-existing-id')
      .expect(404)
  })
})
