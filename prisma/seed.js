import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Users
  const user1 = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      password: 'password123',
      username: 'alice',
    },
  });
  const user2 = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      password: 'password456',
      username: 'bob',
      status: 'inactive',
    },
  });

  // Categories
  const cat1 = await prisma.category.create({
    data: {
      name: 'Music Promotion',
      description: 'Grow your audience with our music promotion packages.',
      imageUrl: 'https://example.com/music.jpg',
    },
  });
  const cat2 = await prisma.category.create({
    data: {
      name: 'Podcast Boost',
      description: 'Increase your podcast reach.',
      imageUrl: 'https://example.com/podcast.jpg',
    },
  });

  // Package Features
  const feat1 = await prisma.packageFeatures.create({
    data: {
      name: 'Fast Delivery',
      description: 'Get your order delivered in 24 hours.',
    },
  });
  const feat2 = await prisma.packageFeatures.create({
    data: {
      name: 'Premium Support',
      description: '24/7 customer support.',
    },
  });

  // Packages
  const pkg1 = await prisma.package.create({
    data: {
      name: 'Starter Music Pack',
      description: 'Perfect for new artists.',
      price: 19.99,
      discount: 5,
      deliveryTime: '2 days',
      categoryId: cat1.id,
      features: { connect: [{ id: feat1.id }, { id: feat2.id }] },
    },
  });
  const pkg2 = await prisma.package.create({
    data: {
      name: 'Pro Podcast Pack',
      description: 'For serious podcasters.',
      price: 49.99,
      deliveryTime: '3 days',
      categoryId: cat2.id,
      features: { connect: [{ id: feat2.id }] },
    },
  });

  // Orders
  await prisma.order.create({
    data: {
      packageId: pkg1.id,
      email: user1.email,
      url: 'https://soundcloud.com/alice/track1',
      quantity: 1,
      totalPrice: 19.99,
      status: 'completed',
    },
  });
  await prisma.order.create({
    data: {
      packageId: pkg2.id,
      email: user2.email,
      url: 'https://soundcloud.com/bob/podcast1',
      quantity: 2,
      totalPrice: 99.98,
      status: 'pending',
    },
  });

  // Review
  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Amazing service!',
      firstName: 'Alice',
      lastName: 'Smith',
      position: 'Musician',
    },
  });

  // SystemInfo
  await prisma.systemInfo.create({
    data: {
      name: 'SoundCloud Booster',
      description: 'Platform for boosting your SoundCloud presence.',
      imageUrl: 'https://example.com/logo.png',
    },
  });

  // Contact
  await prisma.contact.create({
    data: {
      name: 'Charlie',
      email: 'charlie@example.com',
      subject: 'Support Needed',
      message: 'I need help with my order.',
      status: 'open',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());