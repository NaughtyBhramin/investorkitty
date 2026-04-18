const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  // Hash demo passwords
  const founderPasswordHash = await bcrypt.hash('demo123founder', 10);
  const investorPasswordHash = await bcrypt.hash('demo123investor', 10);

  const seeker = await prisma.user.upsert({
    where: { email: 'founder@investorkitty.demo' },
    update: { passwordHash: founderPasswordHash },
    create: {
      email: 'founder@investorkitty.demo',
      name: 'Founder Demo',
      role: 'SEEKER',
      emailVerified: new Date(),
      passwordHash: founderPasswordHash
    }
  });

  const investor = await prisma.user.upsert({
    where: { email: 'investor@investorkitty.demo' },
    update: { passwordHash: investorPasswordHash },
    create: {
      email: 'investor@investorkitty.demo',
      name: 'Investor Demo',
      role: 'INVESTOR',
      emailVerified: new Date(),
      passwordHash: investorPasswordHash
    }
  });

  await prisma.seekerProfile.upsert({
    where: { userId: seeker.id },
    update: {
      companyName: 'Kitty Labs',
      headline: 'Building the next AI-native marketplace',
      stage: 'MVP',
      fundingGoal: 1200000,
      equityOffered: 12,
      industries: ['AI', 'Marketplace', 'SaaS'],
      location: 'Bangalore, India',
      website: 'https://kitty-labs.example',
      linkedIn: 'https://linkedin.com/in/founder-demo',
      kittyScore: 74,
      traction: { monthlyUsers: 3200, revenue: 85000 },
      teamMembers: ['Founder', 'CTO']
    },
    create: {
      userId: seeker.id,
      companyName: 'Kitty Labs',
      headline: 'Building the next AI-native marketplace',
      stage: 'MVP',
      fundingGoal: 1200000,
      equityOffered: 12,
      industries: ['AI', 'Marketplace', 'SaaS'],
      traction: { monthlyUsers: 3200, revenue: 85000 },
      teamMembers: ['Founder', 'CTO'],
      location: 'Bangalore, India',
      website: 'https://kitty-labs.example',
      linkedIn: 'https://linkedin.com/in/founder-demo',
      angelList: null,
      kittyScore: 74
    }
  });

  await prisma.investorProfile.upsert({
    where: { userId: investor.id },
    update: {
      firmName: 'Kitty Capital',
      investmentRange: 'Seed',
      preferredIndustries: ['AI', 'Fintech', 'Healthtech'],
      ticketSize: '$100k-$500k',
      location: 'Mumbai, India',
      website: 'https://kittycapital.example',
      linkedin: 'https://linkedin.com/in/investor-demo'
    },
    create: {
      userId: investor.id,
      firmName: 'Kitty Capital',
      investmentRange: 'Seed',
      preferredIndustries: ['AI', 'Fintech', 'Healthtech'],
      ticketSize: '$100k-$500k',
      portfolio: { companies: ['Kitty Labs', 'GrowthGrid'] },
      website: 'https://kittycapital.example',
      location: 'Mumbai, India',
      linkedin: 'https://linkedin.com/in/investor-demo'
    }
  });

  await prisma.match.create({
    data: {
      seekerId: seeker.id,
      investorId: investor.id,
      seekerLiked: true,
      investorLiked: false,
      status: 'PENDING'
    }
  });

  console.log('[SEED] Demo accounts created successfully with passwords');
  console.log('[SEED] Founder: founder@investorkitty.demo / demo123founder');
  console.log('[SEED] Investor: investor@investorkitty.demo / demo123investor');
  console.log('Seed completed.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
