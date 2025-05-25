import { IUser } from '../../src/types'; // Adjust the import path as needed

export class UserBuilder {
  private data: IUser;

  constructor() {
    // Initialize with default values
    this.data = {
      email: 'kitmanwork@gmail.com',
      isAdmin: 0,
      projectsRoles: [],
      paymentHistoryId: [],
      subscriptionHistoryId: [],
      stripePaymentIntentId: null,
      invoiceHistory: [],
      productHistory: [],
      tenants: ['67da9e56747fb7e9714934cd'],
      createdAt: '2025-03-19T10:37:12.766Z',
      updatedAt: '2025-03-19T10:37:46.985Z',
      name: 'techscrum',
      id: '67da9e58d29a0b82bb478c38',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGE5ZTU4ZDI5YTBiODJiYjQ3OGMzOCIsImlhdCI6MTc0MjgwMTU3NiwiZXhwIjoxNzQyOTc0Mzc2fQ.-K55VjeKxh3CSLh0gAh63OhB-eJqRXRjqx6J_4lJvTY'
    };
  }

  // Method to build the final project object
  build(): IUser {
    return { ...this.data };
  }
}
