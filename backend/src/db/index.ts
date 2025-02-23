import { config } from '../config';
import { User } from '../module/user/user.model';

export const createSuperAdmin = async () => {
  try {
    // Check if super admin already exists
    const existingSuperAdmin = await User.findOne({ role: 'super-admin' });

    if (existingSuperAdmin) {
      console.log('Super admin already exists');
      return;
    }

    // Create super admin user
    const superAdmin = {
      name: config.super_admin_name,
      email: config.super_admin_email,
      password: config.super_admin_password,
      role: 'super-admin',
      status: 'active',
      agreeTerms: true,
      isVerified: true,
      isDeleted: false,
      profilePicture: config.super_admin_profile_picture || null,
    };

    await User.create(superAdmin);
    console.log('🎉 Super admin created successfully');
  } catch (error) {
    console.error('❌ Error creating super admin:', error);
  }
};
