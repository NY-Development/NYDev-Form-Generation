/**
 * Database seed script
 * Creates a superadmin user, sample organization, form, and submissions
 *
 * Usage: npm run seed
 */
const mongoose = require('mongoose');
const env = require('./config/env');
const connectDB = require('./config/database');
const User = require('./models/User');
const Organization = require('./models/Organization');
const Form = require('./models/Form');
const Submission = require('./models/Submission');
const Subscription = require('./models/Subscription');
const { generateUniqueId } = require('./utils/generateUniqueId');
const { generateQRCode } = require('./utils/generateQRCode');

const seedData = async () => {
  try {
    await connectDB(env.MONGO_URI);

    console.log('🗑️  Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Organization.deleteMany({}),
      Form.deleteMany({}),
      Submission.deleteMany({}),
      Subscription.deleteMany({}),
    ]);

    // ─── 1. Create SuperAdmin ─────────────────────────────
    console.log('👤 Creating SuperAdmin...');
    const superAdmin = await User.create({
      firstName: 'Super',
      lastName: 'Admin',
      email: 'superadmin@nydev.com',
      password: 'SuperAdmin123!',
      role: 'superadmin',
      isActive: true,
    });

    // ─── 2. Create Owner User ─────────────────────────────
    console.log('👤 Creating Organization Owner...');
    const owner = await User.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'Password123!',
      role: 'owner',
      isActive: true,
    });

    // ─── 3. Create Organization ───────────────────────────
    console.log('🏢 Creating Organization...');
    const organization = await Organization.create({
      name: 'Real Worship Ministry',
      description: 'A community of believers dedicated to authentic worship and spiritual growth.',
      owner: owner._id,
      branding: {
        primaryColor: '#6C63FF',
        secondaryColor: '#3F3D56',
        accentColor: '#FF6584',
        fontFamily: 'Inter',
      },
    });

    // ─── 4. Create Subscription ───────────────────────────
    console.log('💳 Creating Subscription...');
    const subscription = await Subscription.create({
      organizationId: organization._id,
      plan: 'pro',
      limits: Subscription.getPlanLimits('pro'),
      status: 'active',
    });

    organization.subscription = subscription._id;
    await organization.save();

    // Link user to org
    owner.organizationId = organization._id;
    await owner.save();

    // ─── 5. Create Admin User ─────────────────────────────
    console.log('👤 Creating Admin...');
    await User.create({
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      password: 'Password123!',
      role: 'admin',
      organizationId: organization._id,
      isActive: true,
    });

    // ─── 6. Create Sample Form ────────────────────────────
    console.log('📋 Creating Sample Form...');
    const form = await Form.create({
      title: 'Sunday Service Registration',
      description: 'Register for our weekly Sunday worship service. Get your unique QR code for entry.',
      organizationId: organization._id,
      createdBy: owner._id,
      fields: [
        {
          fieldId: 'full_name',
          label: 'Full Name',
          type: 'text',
          placeholder: 'Enter your full name',
          required: true,
          order: 1,
        },
        {
          fieldId: 'email',
          label: 'Email Address',
          type: 'email',
          placeholder: 'Enter your email',
          required: true,
          order: 2,
        },
        {
          fieldId: 'phone',
          label: 'Phone Number',
          type: 'phone',
          placeholder: '+1 (555) 000-0000',
          required: true,
          order: 3,
        },
        {
          fieldId: 'age_group',
          label: 'Age Group',
          type: 'select',
          required: true,
          options: [
            { label: 'Under 18', value: 'under_18' },
            { label: '18-25', value: '18_25' },
            { label: '26-35', value: '26_35' },
            { label: '36-50', value: '36_50' },
            { label: '50+', value: '50_plus' },
          ],
          order: 4,
        },
        {
          fieldId: 'first_time',
          label: 'Is this your first time visiting?',
          type: 'radio',
          required: true,
          options: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
          ],
          order: 5,
        },
        {
          fieldId: 'prayer_request',
          label: 'Prayer Request (Optional)',
          type: 'textarea',
          placeholder: 'Share your prayer request...',
          required: false,
          order: 6,
        },
      ],
      settings: {
        isPublic: true,
        acceptingResponses: true,
        maxResponses: 0,
        confirmationMessage: 'Thank you for registering! Please present your QR code at the entrance.',
        requireApproval: false,
        oneResponsePerEmail: true,
      },
      uniqueIdConfig: {
        prefix: 'RWM',
        useSequential: false,
      },
      status: 'published',
    });

    // ─── 7. Create Template Form ──────────────────────────
    console.log('📋 Creating Template Form...');
    await Form.create({
      title: 'Church Registration',
      description: 'Standard church service registration template',
      organizationId: organization._id,
      createdBy: owner._id,
      fields: [
        { fieldId: 'name', label: 'Full Name', type: 'text', required: true, order: 1 },
        { fieldId: 'email', label: 'Email', type: 'email', required: true, order: 2 },
        { fieldId: 'phone', label: 'Phone', type: 'phone', required: false, order: 3 },
      ],
      template: {
        isTemplate: true,
        category: 'church',
        templateName: 'Church Registration',
        templateDescription: 'Basic registration for church services',
      },
      status: 'draft',
    });

    // ─── 8. Create Sample Submissions ─────────────────────
    console.log('📝 Creating Sample Submissions...');
    const submitters = [
      { name: 'Alice Johnson', email: 'alice@example.com' },
      { name: 'Bob Williams', email: 'bob@example.com' },
      { name: 'Carol Davis', email: 'carol@example.com' },
      { name: 'David Brown', email: 'david@example.com' },
      { name: 'Eve Wilson', email: 'eve@example.com' },
    ];

    for (let i = 0; i < submitters.length; i++) {
      const uniqueId = generateUniqueId('RWM');
      const qrCode = await generateQRCode(uniqueId, env.CLIENT_URL);

      const statuses = ['pending', 'approved', 'approved', 'verified', 'approved'];

      await Submission.create({
        formId: form._id,
        organizationId: organization._id,
        responses: new Map([
          ['full_name', submitters[i].name],
          ['email', submitters[i].email],
          ['phone', `+1555000${1000 + i}`],
          ['age_group', '26_35'],
          ['first_time', i < 2 ? 'yes' : 'no'],
          ['prayer_request', i === 0 ? 'Please pray for my family.' : ''],
        ]),
        uniqueId,
        qrCode,
        status: statuses[i],
        submitterEmail: submitters[i].email,
        submitterName: submitters[i].name,
        verifiedAt: statuses[i] === 'verified' ? new Date() : null,
      });
    }

    // Update form submission count
    form.submissionCount = submitters.length;
    await form.save({ validateBeforeSave: false });

    console.log('\n═══════════════════════════════════════════');
    console.log('✅ Database seeded successfully!');
    console.log('═══════════════════════════════════════════');
    console.log('\n📋 Seeded Accounts:');
    console.log('───────────────────────────────────────────');
    console.log('SuperAdmin:  superadmin@nydev.com / SuperAdmin123!');
    console.log('Owner:       john@example.com / Password123!');
    console.log('Admin:       jane@example.com / Password123!');
    console.log('───────────────────────────────────────────');
    console.log(`Organization: ${organization.name} (${organization.slug})`);
    console.log(`Form:         ${form.title} (slug: ${form.slug})`);
    console.log(`Submissions:  ${submitters.length} sample entries`);
    console.log('═══════════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    console.error(error);
    process.exit(1);
  }
};

seedData();
