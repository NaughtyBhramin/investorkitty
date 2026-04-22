import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Security check - only allow this in development or with a valid setup token
    const setupToken = req.headers.get('x-setup-token');
    if (process.env.NODE_ENV === 'production' && setupToken !== process.env.SETUP_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Demo founder account
    const founderEmail = 'demo-founder@investorkitty.com';
    const founderPassword = 'DemoPassword123!';
    const founderPasswordHash = await bcrypt.hash(founderPassword, 10);

    const existingFounder = await prisma.user.findUnique({
      where: { email: founderEmail }
    });

    if (!existingFounder) {
      await prisma.user.create({
        data: {
          email: founderEmail,
          name: 'Demo Founder',
          role: 'SEEKER',
          passwordHash: founderPasswordHash,
          emailVerified: new Date(),
          image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=founder'
        }
      });
      console.log('✅ Demo founder account created');
    } else {
      // Update password in case it was changed
      await prisma.user.update({
        where: { email: founderEmail },
        data: {
          passwordHash: founderPasswordHash,
          emailVerified: new Date()
        }
      });
      console.log('✅ Demo founder account updated');
    }

    // Demo investor account
    const investorEmail = 'demo-investor@investorkitty.com';
    const investorPassword = 'DemoPassword123!';
    const investorPasswordHash = await bcrypt.hash(investorPassword, 10);

    const existingInvestor = await prisma.user.findUnique({
      where: { email: investorEmail }
    });

    if (!existingInvestor) {
      await prisma.user.create({
        data: {
          email: investorEmail,
          name: 'Demo Investor',
          role: 'INVESTOR',
          passwordHash: investorPasswordHash,
          emailVerified: new Date(),
          image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=investor'
        }
      });
      console.log('✅ Demo investor account created');
    } else {
      // Update password in case it was changed
      await prisma.user.update({
        where: { email: investorEmail },
        data: {
          passwordHash: investorPasswordHash,
          emailVerified: new Date()
        }
      });
      console.log('✅ Demo investor account updated');
    }

    return NextResponse.json({
      success: true,
      message: 'Demo accounts set up successfully',
      accounts: [
        {
          email: founderEmail,
          password: founderPassword,
          role: 'SEEKER'
        },
        {
          email: investorEmail,
          password: investorPassword,
          role: 'INVESTOR'
        }
      ]
    });
  } catch (error: any) {
    console.error('Setup demo error:', error);
    return NextResponse.json(
      { error: 'Failed to set up demo accounts', details: error.message },
      { status: 500 }
    );
  }
}
