import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Skills that have images in the frontend
  const skillNames = [
    'Node.js',
    'React',
    'Java',
    'PostgreSQL',
    'HTML5',
    'Figma',
  ];

  for (const name of skillNames) {
    await prisma.skill.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  const skills = await prisma.skill.findMany();
  console.log('Skills in DB:', JSON.stringify(skills, null, 2));
  await prisma.$disconnect();
}

main();
