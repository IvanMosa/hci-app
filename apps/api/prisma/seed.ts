import { PrismaClient, UserType, JobCategory, JobStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // 1. Clean up existing data (Order matters if you didn't have Cascade delete)
  // Since you have Cascade, deleting Users and Skills cleans up most things.
  await prisma.application.deleteMany();
  await prisma.freelancerSkill.deleteMany();
  await prisma.portfolio.deleteMany();
  await prisma.job.deleteMany();
  await prisma.freelancerProfile.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Database cleaned.');

  // 2. Create Skills
  const skillsData = [
    'TypeScript',
    'React',
    'Node.js',
    'NestJS',
    'PostgreSQL',
    'Figma',
    'SEO',
    'Content Writing',
    'Python',
    'Data Analysis',
  ];

  // We map them to promises to create them all
  const skills = await Promise.all(
    skillsData.map((name) => prisma.skill.create({ data: { name } })),
  );

  console.log(`✅ Created ${skills.length} skills.`);

  // 3. Create Clients
  const clientUser = await prisma.user.create({
    data: {
      name: 'Alice',
      surname: 'Clientson',
      email: 'alice@client.com',
      password: 'hashed_password_123', // In real app, hash this!
      type: UserType.client,
      dateOfBirth: new Date('1985-04-12'),
      jobs: {
        create: [
          {
            title: 'Build a corporate website',
            description:
              'Need a full-stack developer to build a site for our agency.',
            category: JobCategory.web_development,
            budget: 5000.0,
            status: JobStatus.active,
          },
          {
            title: 'Logo Redesign',
            description: 'Looking for a modern take on our existing logo.',
            category: JobCategory.design,
            budget: 800.0,
            status: JobStatus.active,
          },
        ],
      },
    },
    include: { jobs: true }, // Return jobs so we can link applications later
  });

  console.log(`✅ Created Client: ${clientUser.name}`);

  // 4. Create Freelancers

  // Freelancer 1: Web Developer
  const devFreelancer = await prisma.user.create({
    data: {
      name: 'Bob',
      surname: 'Builder',
      email: 'bob@freelancer.com',
      password: 'hashed_password_123',
      type: UserType.freelancer,
      dateOfBirth: new Date('1995-08-20'),
      freelancerProfile: {
        create: {
          bio: 'Full-stack developer with 5 years of experience in React and Node.',
          location: 'New York, USA',
          hourlyRate: 85.0,
          skills: {
            create: [
              { skillId: skills.find((s) => s.name === 'React')!.id },
              { skillId: skills.find((s) => s.name === 'Node.js')!.id },
              { skillId: skills.find((s) => s.name === 'TypeScript')!.id },
            ],
          },
          portfolio: {
            create: [
              {
                title: 'E-commerce Platform',
                description: 'A full featured shop built with Next.js',
                url: 'https://github.com/bob/shop',
              },
            ],
          },
        },
      },
    },
    include: { freelancerProfile: true },
  });

  // Freelancer 2: Designer
  const designFreelancer = await prisma.user.create({
    data: {
      name: 'Charlie',
      surname: 'Creative',
      email: 'charlie@freelancer.com',
      password: 'hashed_password_123',
      type: UserType.freelancer,
      dateOfBirth: new Date('1998-02-14'),
      freelancerProfile: {
        create: {
          bio: 'Passionate UI/UX designer specialized in mobile apps.',
          location: 'London, UK',
          hourlyRate: 60.0,
          skills: {
            create: [{ skillId: skills.find((s) => s.name === 'Figma')!.id }],
          },
          portfolio: {
            create: [
              {
                title: 'Finance App UI',
                description: 'Mobile interface design for a banking app.',
                url: 'https://dribbble.com/charlie/finance',
              },
            ],
          },
        },
      },
    },
    include: { freelancerProfile: true },
  });

  console.log(
    `✅ Created Freelancers: ${devFreelancer.name}, ${designFreelancer.name}`,
  );

  // 5. Create Applications
  // Bob applies to Alice's "Corporate Website" job
  const jobToApply = clientUser.jobs[0]; // The first job we created for Alice

  if (jobToApply && devFreelancer.freelancerProfile) {
    await prisma.application.create({
      data: {
        jobId: jobToApply.id,
        freelancerId: devFreelancer.freelancerProfile.id,
        proposal: 'I have built similar sites before. Here is my plan...',
        bidAmount: 4800.0,
      },
    });
    console.log(`✅ Created Application: Bob applied to "${jobToApply.title}"`);
  }

  console.log('🏁 Seed finished successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
