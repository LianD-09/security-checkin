import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.checkin.deleteMany();
  await prisma.user.deleteMany();
  await prisma.location.deleteMany();

  const adminSeed = await prisma.user.create({
    data: {
      id: 1,
      userName: 'admin',
      password: '123456',
      role: 'ADMIN',
      name: 'Super Admin',
      phone: '99999999',
      dob: '2001-09-15T00:00:000Z',
    },
  });
  const securitySeed = await prisma.user.create({
    data: {
      userName: 'security_staff',
      password: '123456',
      role: 'SECURITY',
      name: 'Security Staff 1',
      phone: '0123456789',
      dob: '2001-09-15T00:00:000Z',
    },
  });

  const locationSeed = await prisma.location.create({
    data: {
      name: 'HUST',
      latitude: 21.007302,
      longtitude: 105.842657,
    },
  });
  const checkinSeed = await prisma.checkin.create({
    data: {
      createBy: 0,
      latitude: 0,
      longtitude: 0,
      status: 'REJECT',
      locationId: 1,
    },
  });
  console.log(adminSeed, securitySeed, locationSeed, checkinSeed);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
