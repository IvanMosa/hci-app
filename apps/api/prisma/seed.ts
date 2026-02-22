import {
  PrismaClient,
  UserType,
  JobCategory,
  JobStatus,
  ApplicationStatus,
} from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  await prisma.application.deleteMany();
  await prisma.freelancerSkill.deleteMany();
  await prisma.portfolio.deleteMany();
  await prisma.job.deleteMany();
  await prisma.freelancerProfile.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Database cleaned.');

  const skillsData = [
    'Node.js',
    'React',
    'Java',
    'PostgreSQL',
    'HTML5',
    'Figma',
  ];

  await prisma.skill.createMany({
    data: skillsData.map((name) => ({ name })),
  });

  const skills = await prisma.skill.findMany();

  console.log(`✅ Created ${skills.length} skills.`);

  const hashedPassword = await hash('password123', 10);

  // ---------------------------------------------------------------------------
  // KLIJENTI
  // ---------------------------------------------------------------------------

  const clientUser = await prisma.user.create({
    data: {
      name: 'Alice',
      surname: 'Clientson',
      email: 'alice@client.com',
      password: hashedPassword,
      type: UserType.client,
      phone: '+1-212-555-0101',
      dateOfBirth: new Date('1985-04-12'),
      jobs: {
        create: [
          {
            title: 'Build a corporate website',
            description:
              'Need a full-stack developer to build a site for our agency. Must include CMS integration and SEO optimization.',
            category: JobCategory.web_development,
            budget: 5000.0,
            status: JobStatus.active,
          },
          {
            title: 'Logo Redesign',
            description:
              'Looking for a modern take on our existing logo. Brand colors are blue and white.',
            category: JobCategory.design,
            budget: 800.0,
            status: JobStatus.active,
          },
        ],
      },
    },
    include: { jobs: true },
  });

  const secondClientUser = await prisma.user.create({
    data: {
      name: 'Diana',
      surname: 'Hargreaves',
      email: 'diana@startupco.com',
      password: hashedPassword,
      type: UserType.client,
      phone: '+44-20-5550-0198',
      dateOfBirth: new Date('1990-11-03'),
      jobs: {
        create: [
          {
            title: 'Python Data Pipeline',
            description:
              'We need an experienced Python developer to build an ETL pipeline that ingests CSV data into PostgreSQL.',
            category: JobCategory.data_science,
            budget: 3200.0,
            status: JobStatus.active,
          },
          {
            title: 'Write blog articles about fintech',
            description:
              'Looking for a writer to produce 10 high-quality SEO-optimized articles about fintech trends.',
            category: JobCategory.writing,
            budget: 600.0,
            status: JobStatus.completed,
          },
        ],
      },
    },
    include: { jobs: true },
  });

  const thirdClientUser = await prisma.user.create({
    data: {
      name: 'Marco',
      surname: 'Bellini',
      email: 'marco@belliniagency.com',
      password: hashedPassword,
      type: UserType.client,
      phone: '+39-02-555-0134',
      dateOfBirth: new Date('1978-07-22'),
      jobs: {
        create: [
          {
            title: 'E-commerce store frontend',
            description:
              'We need a React developer to build a product listing page, cart, and checkout flow for our online store.',
            category: JobCategory.web_development,
            budget: 4200.0,
            status: JobStatus.active,
          },
          {
            title: 'PostgreSQL database optimization',
            description:
              'Our queries are running slow. We need someone to audit indexes, rewrite slow queries and set up proper connection pooling.',
            category: JobCategory.other,
            budget: 1500.0,
            status: JobStatus.active,
          },
          {
            title: 'Social media marketing campaign',
            description:
              'Plan and execute a 3-month Instagram and LinkedIn marketing campaign for our software product launch.',
            category: JobCategory.marketing,
            budget: 2000.0,
            status: JobStatus.active,
          },
        ],
      },
    },
    include: { jobs: true },
  });

  const fourthClientUser = await prisma.user.create({
    data: {
      name: 'Sara',
      surname: 'Novak',
      email: 'sara@novakventures.hr',
      password: hashedPassword,
      type: UserType.client,
      phone: '+385-91-555-0277',
      dateOfBirth: new Date('1993-03-15'),
      jobs: {
        create: [
          {
            title: 'Mobile app UI design',
            description:
              'Need a Figma designer to create a full set of screens for our iOS fitness tracking app. Around 20 screens expected.',
            category: JobCategory.design,
            budget: 2400.0,
            status: JobStatus.active,
          },
          {
            title: 'Java backend microservice',
            description:
              'Build a REST API microservice in Java Spring Boot for handling user authentication and authorization.',
            category: JobCategory.web_development,
            budget: 3800.0,
            status: JobStatus.active,
          },
          {
            title: 'HTML5 email templates',
            description:
              'Design and code 5 responsive HTML5 email templates for our marketing campaigns.',
            category: JobCategory.design,
            budget: 500.0,
            status: JobStatus.completed,
          },
        ],
      },
    },
    include: { jobs: true },
  });

  console.log(
    `✅ Created Clients: ${clientUser.name}, ${secondClientUser.name}, ${thirdClientUser.name}, ${fourthClientUser.name}`,
  );

  // ---------------------------------------------------------------------------
  // FREELANCERI
  // ---------------------------------------------------------------------------

  const devFreelancer = await prisma.user.create({
    data: {
      name: 'Bob',
      surname: 'Builder',
      email: 'bob@freelancer.com',
      password: hashedPassword,
      type: UserType.freelancer,
      phone: '+1-415-555-0177',
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
            ],
          },
          portfolio: {
            create: [
              {
                title: 'E-commerce Platform',
                description:
                  'A full featured shop built with Next.js and Stripe integration.',
                url: 'https://github.com/bob/shop',
              },
              {
                title: 'Task Manager SaaS',
                description:
                  'A multi-tenant task management app with real-time updates via WebSockets.',
                url: 'https://github.com/bob/taskmanager',
              },
            ],
          },
        },
      },
    },
    include: { freelancerProfile: true },
  });

  const designFreelancer = await prisma.user.create({
    data: {
      name: 'Charlie',
      surname: 'Creative',
      email: 'charlie@freelancer.com',
      password: hashedPassword,
      type: UserType.freelancer,
      phone: '+44-7911-555023',
      dateOfBirth: new Date('1998-02-14'),
      freelancerProfile: {
        create: {
          bio: 'Passionate UI/UX designer specialized in mobile apps and brand identity.',
          location: 'London, UK',
          hourlyRate: 60.0,
          skills: {
            create: [
              { skillId: skills.find((s) => s.name === 'Figma')!.id },
              { skillId: skills.find((s) => s.name === 'HTML5')!.id },
            ],
          },
          portfolio: {
            create: [
              {
                title: 'Finance App UI',
                description: 'Mobile interface design for a banking app.',
                url: 'https://dribbble.com/charlie/finance',
              },
              {
                title: 'Travel Agency Rebrand',
                description:
                  'Full brand identity redesign including logo, typography and color palette.',
                url: 'https://dribbble.com/charlie/travelrebrand',
              },
            ],
          },
        },
      },
    },
    include: { freelancerProfile: true },
  });

  const dataFreelancer = await prisma.user.create({
    data: {
      name: 'Eva',
      surname: 'Kowalski',
      email: 'eva@freelancer.com',
      password: hashedPassword,
      type: UserType.freelancer,
      phone: '+48-601-555-309',
      dateOfBirth: new Date('1993-06-30'),
      freelancerProfile: {
        create: {
          bio: 'Data engineer with expertise in PostgreSQL and building scalable pipelines.',
          location: 'Warsaw, Poland',
          hourlyRate: 70.0,
          skills: {
            create: [
              { skillId: skills.find((s) => s.name === 'PostgreSQL')!.id },
            ],
          },
          portfolio: {
            create: [
              {
                title: 'Real-time Analytics Dashboard',
                description:
                  'Built a streaming data pipeline with Kafka and PostgreSQL for a logistics company.',
                url: 'https://github.com/eva/analytics-pipeline',
              },
            ],
          },
        },
      },
    },
    include: { freelancerProfile: true },
  });

  const javaFreelancer = await prisma.user.create({
    data: {
      name: 'Luka',
      surname: 'Horvat',
      email: 'luka@freelancer.com',
      password: hashedPassword,
      type: UserType.freelancer,
      phone: '+385-98-555-0412',
      dateOfBirth: new Date('1991-05-18'),
      freelancerProfile: {
        create: {
          bio: 'Java backend developer with 7 years of experience building enterprise microservices with Spring Boot.',
          location: 'Zagreb, Croatia',
          hourlyRate: 75.0,
          skills: {
            create: [
              { skillId: skills.find((s) => s.name === 'Java')!.id },
              { skillId: skills.find((s) => s.name === 'PostgreSQL')!.id },
            ],
          },
          portfolio: {
            create: [
              {
                title: 'Insurance Claims API',
                description:
                  'Spring Boot REST API handling claims processing for a major insurance provider.',
                url: 'https://github.com/luka/claims-api',
              },
              {
                title: 'Auth Service',
                description:
                  'JWT-based authentication and role management microservice used across 3 products.',
                url: 'https://github.com/luka/auth-service',
              },
            ],
          },
        },
      },
    },
    include: { freelancerProfile: true },
  });

  const frontendFreelancer = await prisma.user.create({
    data: {
      name: 'Nina',
      surname: 'Petrović',
      email: 'nina@freelancer.com',
      password: hashedPassword,
      type: UserType.freelancer,
      phone: '+381-63-555-0891',
      dateOfBirth: new Date('1997-09-05'),
      freelancerProfile: {
        create: {
          bio: 'Frontend developer focused on pixel-perfect React interfaces and accessible HTML5 markup.',
          location: 'Belgrade, Serbia',
          hourlyRate: 55.0,
          skills: {
            create: [
              { skillId: skills.find((s) => s.name === 'React')!.id },
              { skillId: skills.find((s) => s.name === 'HTML5')!.id },
              { skillId: skills.find((s) => s.name === 'Node.js')!.id },
            ],
          },
          portfolio: {
            create: [
              {
                title: 'Portfolio Website Builder',
                description:
                  'A drag-and-drop portfolio site builder built with React and a Node.js backend.',
                url: 'https://github.com/nina/portfolio-builder',
              },
              {
                title: 'Restaurant Menu App',
                description:
                  'Responsive HTML5/React web app for a restaurant chain with dynamic menu filtering.',
                url: 'https://github.com/nina/menu-app',
              },
            ],
          },
        },
      },
    },
    include: { freelancerProfile: true },
  });

  const figmaFreelancer = await prisma.user.create({
    data: {
      name: 'Tomas',
      surname: 'Varga',
      email: 'tomas@freelancer.com',
      password: hashedPassword,
      type: UserType.freelancer,
      phone: '+421-903-555-0765',
      dateOfBirth: new Date('1996-12-01'),
      freelancerProfile: {
        create: {
          bio: 'Product designer with a strong focus on Figma prototyping, design systems and user research.',
          location: 'Bratislava, Slovakia',
          hourlyRate: 65.0,
          skills: {
            create: [
              { skillId: skills.find((s) => s.name === 'Figma')!.id },
              { skillId: skills.find((s) => s.name === 'HTML5')!.id },
            ],
          },
          portfolio: {
            create: [
              {
                title: 'Design System for SaaS',
                description:
                  'Built a full component library and design system in Figma for a B2B SaaS startup.',
                url: 'https://www.figma.com/tomas/design-system',
              },
              {
                title: 'Onboarding Flow Redesign',
                description:
                  'Redesigned a 12-step onboarding flow reducing drop-off rate by 40%.',
                url: 'https://www.figma.com/tomas/onboarding',
              },
            ],
          },
        },
      },
    },
    include: { freelancerProfile: true },
  });

  console.log(
    `✅ Created Freelancers: ${devFreelancer.name}, ${designFreelancer.name}, ${dataFreelancer.name}, ${javaFreelancer.name}, ${frontendFreelancer.name}, ${figmaFreelancer.name}`,
  );

  // ---------------------------------------------------------------------------
  // APLIKACIJE
  // ---------------------------------------------------------------------------

  const aliceWebJob = clientUser.jobs[0];
  const aliceLogoJob = clientUser.jobs[1];
  const dianaDataJob = secondClientUser.jobs[0];
  const marcoEcommerceJob = thirdClientUser.jobs[0];
  const marcoDbJob = thirdClientUser.jobs[1];
  const saraUiJob = fourthClientUser.jobs[0];
  const saraJavaJob = fourthClientUser.jobs[1];
  const saraEmailJob = fourthClientUser.jobs[2];

  // Bob -> Alice web job (pending)
  if (aliceWebJob && devFreelancer.freelancerProfile) {
    await prisma.application.create({
      data: {
        jobId: aliceWebJob.id,
        freelancerId: devFreelancer.freelancerProfile.id,
        proposal:
          'I have built similar corporate sites before using React and Node. Here is my plan...',
        bidAmount: 4800.0,
        status: ApplicationStatus.pending,
      },
    });
    console.log(`✅ Application: Bob -> "${aliceWebJob.title}" (pending)`);
  }

  // Nina -> Alice web job (pending)
  if (aliceWebJob && frontendFreelancer.freelancerProfile) {
    await prisma.application.create({
      data: {
        jobId: aliceWebJob.id,
        freelancerId: frontendFreelancer.freelancerProfile.id,
        proposal:
          'I specialize in React and have delivered 10+ corporate websites. Happy to discuss scope.',
        bidAmount: 4500.0,
        status: ApplicationStatus.pending,
      },
    });
    console.log(`✅ Application: Nina -> "${aliceWebJob.title}" (pending)`);
  }

  // Charlie -> Alice logo job (accepted)
  if (aliceLogoJob && designFreelancer.freelancerProfile) {
    await prisma.application.create({
      data: {
        jobId: aliceLogoJob.id,
        freelancerId: designFreelancer.freelancerProfile.id,
        proposal:
          'Logo redesign is my specialty. I will deliver 3 concepts within a week.',
        bidAmount: 750.0,
        status: ApplicationStatus.accepted,
      },
    });
    console.log(
      `✅ Application: Charlie -> "${aliceLogoJob.title}" (accepted)`,
    );
  }

  // Tomas -> Alice logo job (rejected)
  if (aliceLogoJob && figmaFreelancer.freelancerProfile) {
    await prisma.application.create({
      data: {
        jobId: aliceLogoJob.id,
        freelancerId: figmaFreelancer.freelancerProfile.id,
        proposal:
          'I have redesigned logos for 5 companies in the past year. Here are some examples.',
        bidAmount: 820.0,
        status: ApplicationStatus.rejected,
      },
    });
    console.log(`✅ Application: Tomas -> "${aliceLogoJob.title}" (rejected)`);
  }

  // Eva -> Diana data job (pending)
  if (dianaDataJob && dataFreelancer.freelancerProfile) {
    await prisma.application.create({
      data: {
        jobId: dianaDataJob.id,
        freelancerId: dataFreelancer.freelancerProfile.id,
        proposal:
          'I have built multiple ETL pipelines with PostgreSQL for mid-size companies.',
        bidAmount: 3000.0,
        status: ApplicationStatus.pending,
      },
    });
    console.log(`✅ Application: Eva -> "${dianaDataJob.title}" (pending)`);
  }

  // Bob -> Diana data job (rejected)
  if (dianaDataJob && devFreelancer.freelancerProfile) {
    await prisma.application.create({
      data: {
        jobId: dianaDataJob.id,
        freelancerId: devFreelancer.freelancerProfile.id,
        proposal:
          'I have some experience with data pipelines as well, happy to take this on.',
        bidAmount: 3100.0,
        status: ApplicationStatus.rejected,
      },
    });
    console.log(`✅ Application: Bob -> "${dianaDataJob.title}" (rejected)`);
  }

  // Bob -> Marco e-commerce job (accepted)
  if (marcoEcommerceJob && devFreelancer.freelancerProfile) {
    await prisma.application.create({
      data: {
        jobId: marcoEcommerceJob.id,
        freelancerId: devFreelancer.freelancerProfile.id,
        proposal:
          'I built an e-commerce platform with cart and checkout using React. This is right in my wheelhouse.',
        bidAmount: 4000.0,
        status: ApplicationStatus.accepted,
      },
    });
    console.log(
      `✅ Application: Bob -> "${marcoEcommerceJob.title}" (accepted)`,
    );
  }

  // Nina -> Marco e-commerce job (pending)
  if (marcoEcommerceJob && frontendFreelancer.freelancerProfile) {
    await prisma.application.create({
      data: {
        jobId: marcoEcommerceJob.id,
        freelancerId: frontendFreelancer.freelancerProfile.id,
        proposal:
          'Frontend is my core strength. I can deliver a clean, accessible React storefront.',
        bidAmount: 3900.0,
        status: ApplicationStatus.pending,
      },
    });
    console.log(
      `✅ Application: Nina -> "${marcoEcommerceJob.title}" (pending)`,
    );
  }

  // Eva -> Marco DB optimization job (accepted)
  if (marcoDbJob && dataFreelancer.freelancerProfile) {
    await prisma.application.create({
      data: {
        jobId: marcoDbJob.id,
        freelancerId: dataFreelancer.freelancerProfile.id,
        proposal:
          'PostgreSQL optimization is one of my key skills. I will audit your schema, indexes and query plans.',
        bidAmount: 1400.0,
        status: ApplicationStatus.accepted,
      },
    });
    console.log(`✅ Application: Eva -> "${marcoDbJob.title}" (accepted)`);
  }

  // Tomas -> Sara UI job (pending)
  if (saraUiJob && figmaFreelancer.freelancerProfile) {
    await prisma.application.create({
      data: {
        jobId: saraUiJob.id,
        freelancerId: figmaFreelancer.freelancerProfile.id,
        proposal:
          'I have designed 20+ screen mobile apps in Figma. I can start immediately.',
        bidAmount: 2200.0,
        status: ApplicationStatus.pending,
      },
    });
    console.log(`✅ Application: Tomas -> "${saraUiJob.title}" (pending)`);
  }

  // Charlie -> Sara UI job (pending)
  if (saraUiJob && designFreelancer.freelancerProfile) {
    await prisma.application.create({
      data: {
        jobId: saraUiJob.id,
        freelancerId: designFreelancer.freelancerProfile.id,
        proposal:
          'Mobile UI is my specialty — I designed the Finance App UI in my portfolio under similar constraints.',
        bidAmount: 2300.0,
        status: ApplicationStatus.pending,
      },
    });
    console.log(`✅ Application: Charlie -> "${saraUiJob.title}" (pending)`);
  }

  // Luka -> Sara Java job (accepted)
  if (saraJavaJob && javaFreelancer.freelancerProfile) {
    await prisma.application.create({
      data: {
        jobId: saraJavaJob.id,
        freelancerId: javaFreelancer.freelancerProfile.id,
        proposal:
          'I have built a near-identical auth microservice in Spring Boot. I can deliver this in 2 weeks.',
        bidAmount: 3600.0,
        status: ApplicationStatus.accepted,
      },
    });
    console.log(`✅ Application: Luka -> "${saraJavaJob.title}" (accepted)`);
  }

  // Nina -> Sara email templates job (accepted)
  if (saraEmailJob && frontendFreelancer.freelancerProfile) {
    await prisma.application.create({
      data: {
        jobId: saraEmailJob.id,
        freelancerId: frontendFreelancer.freelancerProfile.id,
        proposal:
          'I have coded responsive HTML5 email templates for several marketing agencies. Happy to share samples.',
        bidAmount: 480.0,
        status: ApplicationStatus.accepted,
      },
    });
    console.log(`✅ Application: Nina -> "${saraEmailJob.title}" (accepted)`);
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
