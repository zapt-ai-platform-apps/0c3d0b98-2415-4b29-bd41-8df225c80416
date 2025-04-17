import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { authenticateUser, handleApiError } from './_apiUtils.js';
import { users, merchants, investors, transportStations, serviceProviders } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';
import Sentry from './_sentry.js';

export default async function handler(req, res) {
  console.log('User profile API called');
  
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await authenticateUser(req);
    console.log('User authenticated:', user.id);
    
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);

    // GET: Fetch user profile
    if (req.method === 'GET') {
      console.log('Fetching user profile for:', user.id);
      
      // Get base user info
      const userInfo = await db
        .select()
        .from(users)
        .where(eq(users.email, user.email))
        .limit(1);
      
      if (userInfo.length === 0) {
        return res.status(404).json({ error: 'User profile not found' });
      }
      
      const userData = userInfo[0];
      console.log('Found user data:', userData);
      
      // Get role-specific data
      let roleData = null;
      
      if (userData.role === 'merchant') {
        const merchantData = await db
          .select()
          .from(merchants)
          .where(eq(merchants.userId, userData.id))
          .limit(1);
        roleData = merchantData[0] || null;
      } 
      else if (userData.role === 'investor') {
        const investorData = await db
          .select()
          .from(investors)
          .where(eq(investors.userId, userData.id))
          .limit(1);
        roleData = investorData[0] || null;
      }
      else if (userData.role === 'transport') {
        const transportData = await db
          .select()
          .from(transportStations)
          .where(eq(transportStations.userId, userData.id))
          .limit(1);
        roleData = transportData[0] || null;
      }
      else if (userData.role === 'service') {
        const serviceData = await db
          .select()
          .from(serviceProviders)
          .where(eq(serviceProviders.userId, userData.id))
          .limit(1);
        roleData = serviceData[0] || null;
      }
      
      console.log('Role-specific data:', roleData);
      
      res.status(200).json({
        user: userData,
        roleData
      });
    }
    // POST: Create or update user profile
    else if (req.method === 'POST') {
      const { role, name, phone, ...roleData } = req.body;
      console.log('Updating profile with role:', role, 'and data:', roleData);
      
      if (!role) {
        return res.status(400).json({ error: 'Role is required' });
      }
      
      // First check if user exists
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, user.email))
        .limit(1);
      
      let userId;
      
      // Create or update user record
      if (existingUser.length === 0) {
        console.log('Creating new user record');
        const [newUser] = await db
          .insert(users)
          .values({
            email: user.email,
            role,
            name,
            phone
          })
          .returning();
        
        userId = newUser.id;
      } else {
        console.log('Updating existing user record');
        const [updatedUser] = await db
          .update(users)
          .set({
            role,
            name,
            phone,
            updatedAt: new Date()
          })
          .where(eq(users.email, user.email))
          .returning();
        
        userId = existingUser[0].id;
      }
      
      // Insert or update role-specific data
      let roleSpecificData;
      
      if (role === 'merchant') {
        const { businessName, businessType, businessDescription, location, logoUrl } = roleData;
        
        if (!businessName) {
          return res.status(400).json({ error: 'Business name is required for merchants' });
        }
        
        // Check if merchant record exists
        const existingMerchant = await db
          .select()
          .from(merchants)
          .where(eq(merchants.userId, userId))
          .limit(1);
          
        if (existingMerchant.length === 0) {
          roleSpecificData = await db
            .insert(merchants)
            .values({
              userId,
              businessName,
              businessType,
              businessDescription,
              location,
              logoUrl
            })
            .returning();
        } else {
          roleSpecificData = await db
            .update(merchants)
            .set({
              businessName,
              businessType,
              businessDescription,
              location,
              logoUrl,
              updatedAt: new Date()
            })
            .where(eq(merchants.userId, userId))
            .returning();
        }
      }
      else if (role === 'investor') {
        const { investmentFocus, investmentRange, bio } = roleData;
        
        // Check if investor record exists
        const existingInvestor = await db
          .select()
          .from(investors)
          .where(eq(investors.userId, userId))
          .limit(1);
          
        if (existingInvestor.length === 0) {
          roleSpecificData = await db
            .insert(investors)
            .values({
              userId,
              investmentFocus,
              investmentRange,
              bio
            })
            .returning();
        } else {
          roleSpecificData = await db
            .update(investors)
            .set({
              investmentFocus,
              investmentRange,
              bio,
              updatedAt: new Date()
            })
            .where(eq(investors.userId, userId))
            .returning();
        }
      }
      else if (role === 'transport') {
        const { stationName, stationType, location, capacity, operatingHours } = roleData;
        
        if (!stationName) {
          return res.status(400).json({ error: 'Station name is required for transport stations' });
        }
        
        // Check if transport station record exists
        const existingStation = await db
          .select()
          .from(transportStations)
          .where(eq(transportStations.userId, userId))
          .limit(1);
          
        if (existingStation.length === 0) {
          roleSpecificData = await db
            .insert(transportStations)
            .values({
              userId,
              stationName,
              stationType,
              location,
              capacity,
              operatingHours
            })
            .returning();
        } else {
          roleSpecificData = await db
            .update(transportStations)
            .set({
              stationName,
              stationType,
              location,
              capacity,
              operatingHours,
              updatedAt: new Date()
            })
            .where(eq(transportStations.userId, userId))
            .returning();
        }
      }
      else if (role === 'service') {
        const { serviceName, serviceType, serviceDescription, location, availability } = roleData;
        
        if (!serviceName) {
          return res.status(400).json({ error: 'Service name is required for service providers' });
        }
        
        // Check if service provider record exists
        const existingProvider = await db
          .select()
          .from(serviceProviders)
          .where(eq(serviceProviders.userId, userId))
          .limit(1);
          
        if (existingProvider.length === 0) {
          roleSpecificData = await db
            .insert(serviceProviders)
            .values({
              userId,
              serviceName,
              serviceType,
              serviceDescription,
              location,
              availability
            })
            .returning();
        } else {
          roleSpecificData = await db
            .update(serviceProviders)
            .set({
              serviceName,
              serviceType,
              serviceDescription,
              location,
              availability,
              updatedAt: new Date()
            })
            .where(eq(serviceProviders.userId, userId))
            .returning();
        }
      }
      
      res.status(200).json({
        success: true,
        userId,
        roleSpecificData: roleSpecificData[0]
      });
    }
  } catch (error) {
    return handleApiError(res, error, 'Failed to process user profile');
  }
}