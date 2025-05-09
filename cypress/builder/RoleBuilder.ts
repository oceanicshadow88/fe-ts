export class RoleBuilder {
  private data: any;

  constructor() {
    // Initialize with default values
    this.data = [
      {
        id: '6819f0de7a055ee97c5ea855',
        name: 'Admin',
        slug: 'admin',
        permissions: [
          {
            id: '6819f0db7a055ee97c5ea80e',
            slug: 'view:projects',
            description: 'View Project',
            createdAt: '2025-05-06T11:22:03.565Z',
            updatedAt: '2025-05-06T11:22:03.565Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea80f',
            slug: 'edit:projects',
            description: 'Edit Project',
            createdAt: '2025-05-06T11:22:03.674Z',
            updatedAt: '2025-05-06T11:22:03.674Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea810',
            slug: 'delete:projects',
            description: 'Delete Project',
            createdAt: '2025-05-06T11:22:03.785Z',
            updatedAt: '2025-05-06T11:22:03.785Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea811',
            slug: 'create:boards',
            description: 'Create Boards',
            createdAt: '2025-05-06T11:22:03.891Z',
            updatedAt: '2025-05-06T11:22:03.891Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea812',
            slug: 'view:boards',
            description: 'View Boards',
            createdAt: '2025-05-06T11:22:04.004Z',
            updatedAt: '2025-05-06T11:22:04.004Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea813',
            slug: 'edit:boards',
            description: 'Edit Project',
            createdAt: '2025-05-06T11:22:04.121Z',
            updatedAt: '2025-05-06T11:22:04.121Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea814',
            slug: 'delete:boards',
            description: 'Delete Project',
            createdAt: '2025-05-06T11:22:04.227Z',
            updatedAt: '2025-05-06T11:22:04.227Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea816',
            slug: 'view:members',
            description: 'View Members',
            createdAt: '2025-05-06T11:22:04.439Z',
            updatedAt: '2025-05-06T11:22:04.439Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea817',
            slug: 'edit:members',
            description: 'Edit Members',
            createdAt: '2025-05-06T11:22:04.540Z',
            updatedAt: '2025-05-06T11:22:04.540Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea818',
            slug: 'delete:members',
            description: 'Delete Members',
            createdAt: '2025-05-06T11:22:04.648Z',
            updatedAt: '2025-05-06T11:22:04.648Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea81a',
            slug: 'view:roles',
            description: 'View Roles',
            createdAt: '2025-05-06T11:22:04.868Z',
            updatedAt: '2025-05-06T11:22:04.868Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea81b',
            slug: 'edit:roles',
            description: 'Edit Roles',
            createdAt: '2025-05-06T11:22:04.977Z',
            updatedAt: '2025-05-06T11:22:04.977Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea81c',
            slug: 'delete:roles',
            description: 'Delete Roles',
            createdAt: '2025-05-06T11:22:05.084Z',
            updatedAt: '2025-05-06T11:22:05.084Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea81e',
            slug: 'view:shortcuts',
            description: 'View Shortcuts',
            createdAt: '2025-05-06T11:22:05.298Z',
            updatedAt: '2025-05-06T11:22:05.298Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea81f',
            slug: 'edit:shortcuts',
            description: 'Edit Shortcuts',
            createdAt: '2025-05-06T11:22:05.404Z',
            updatedAt: '2025-05-06T11:22:05.404Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea820',
            slug: 'delete:shortcuts',
            description: 'Delete Shortcuts',
            createdAt: '2025-05-06T11:22:05.514Z',
            updatedAt: '2025-05-06T11:22:05.514Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea822',
            slug: 'view:tickets',
            description: 'View Tickets',
            createdAt: '2025-05-06T11:22:05.728Z',
            updatedAt: '2025-05-06T11:22:05.728Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea823',
            slug: 'edit:tickets',
            description: 'Edit Tickets',
            createdAt: '2025-05-06T11:22:05.837Z',
            updatedAt: '2025-05-06T11:22:05.837Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea824',
            slug: 'delete:tickets',
            description: 'Delete Tickets',
            createdAt: '2025-05-06T11:22:05.947Z',
            updatedAt: '2025-05-06T11:22:05.947Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea825',
            slug: 'view:settings',
            description: 'View Settings',
            createdAt: '2025-05-06T11:22:06.069Z',
            updatedAt: '2025-05-06T11:22:06.069Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea826',
            slug: 'edit:settings',
            description: 'Edit Settings',
            createdAt: '2025-05-06T11:22:06.181Z',
            updatedAt: '2025-05-06T11:22:06.181Z',
            __v: 0
          }
        ],
        isPublic: true,
        createdAt: '2025-05-06T11:22:06.290Z',
        updatedAt: '2025-05-06T11:22:06.290Z'
      },
      {
        id: '6819f0de7a055ee97c5ea856',
        name: 'Developer',
        slug: 'developer',
        permissions: [
          {
            id: '6819f0db7a055ee97c5ea80e',
            slug: 'view:projects',
            description: 'View Project',
            createdAt: '2025-05-06T11:22:03.565Z',
            updatedAt: '2025-05-06T11:22:03.565Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea80f',
            slug: 'edit:projects',
            description: 'Edit Project',
            createdAt: '2025-05-06T11:22:03.674Z',
            updatedAt: '2025-05-06T11:22:03.674Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea810',
            slug: 'delete:projects',
            description: 'Delete Project',
            createdAt: '2025-05-06T11:22:03.785Z',
            updatedAt: '2025-05-06T11:22:03.785Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea812',
            slug: 'view:boards',
            description: 'View Boards',
            createdAt: '2025-05-06T11:22:04.004Z',
            updatedAt: '2025-05-06T11:22:04.004Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea813',
            slug: 'edit:boards',
            description: 'Edit Project',
            createdAt: '2025-05-06T11:22:04.121Z',
            updatedAt: '2025-05-06T11:22:04.121Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea814',
            slug: 'delete:boards',
            description: 'Delete Project',
            createdAt: '2025-05-06T11:22:04.227Z',
            updatedAt: '2025-05-06T11:22:04.227Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea81e',
            slug: 'view:shortcuts',
            description: 'View Shortcuts',
            createdAt: '2025-05-06T11:22:05.298Z',
            updatedAt: '2025-05-06T11:22:05.298Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea81f',
            slug: 'edit:shortcuts',
            description: 'Edit Shortcuts',
            createdAt: '2025-05-06T11:22:05.404Z',
            updatedAt: '2025-05-06T11:22:05.404Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea820',
            slug: 'delete:shortcuts',
            description: 'Delete Shortcuts',
            createdAt: '2025-05-06T11:22:05.514Z',
            updatedAt: '2025-05-06T11:22:05.514Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea822',
            slug: 'view:tickets',
            description: 'View Tickets',
            createdAt: '2025-05-06T11:22:05.728Z',
            updatedAt: '2025-05-06T11:22:05.728Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea823',
            slug: 'edit:tickets',
            description: 'Edit Tickets',
            createdAt: '2025-05-06T11:22:05.837Z',
            updatedAt: '2025-05-06T11:22:05.837Z',
            __v: 0
          }
        ],
        isPublic: true,
        createdAt: '2025-05-06T11:22:06.397Z',
        updatedAt: '2025-05-06T11:22:06.397Z'
      },
      {
        id: '6819f0de7a055ee97c5ea857',
        name: 'Product Manager',
        slug: 'product-manager',
        permissions: [
          {
            id: '6819f0db7a055ee97c5ea80e',
            slug: 'view:projects',
            description: 'View Project',
            createdAt: '2025-05-06T11:22:03.565Z',
            updatedAt: '2025-05-06T11:22:03.565Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea80f',
            slug: 'edit:projects',
            description: 'Edit Project',
            createdAt: '2025-05-06T11:22:03.674Z',
            updatedAt: '2025-05-06T11:22:03.674Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea810',
            slug: 'delete:projects',
            description: 'Delete Project',
            createdAt: '2025-05-06T11:22:03.785Z',
            updatedAt: '2025-05-06T11:22:03.785Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea811',
            slug: 'create:boards',
            description: 'Create Boards',
            createdAt: '2025-05-06T11:22:03.891Z',
            updatedAt: '2025-05-06T11:22:03.891Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea812',
            slug: 'view:boards',
            description: 'View Boards',
            createdAt: '2025-05-06T11:22:04.004Z',
            updatedAt: '2025-05-06T11:22:04.004Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea813',
            slug: 'edit:boards',
            description: 'Edit Project',
            createdAt: '2025-05-06T11:22:04.121Z',
            updatedAt: '2025-05-06T11:22:04.121Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea814',
            slug: 'delete:boards',
            description: 'Delete Project',
            createdAt: '2025-05-06T11:22:04.227Z',
            updatedAt: '2025-05-06T11:22:04.227Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea816',
            slug: 'view:members',
            description: 'View Members',
            createdAt: '2025-05-06T11:22:04.439Z',
            updatedAt: '2025-05-06T11:22:04.439Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea817',
            slug: 'edit:members',
            description: 'Edit Members',
            createdAt: '2025-05-06T11:22:04.540Z',
            updatedAt: '2025-05-06T11:22:04.540Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea818',
            slug: 'delete:members',
            description: 'Delete Members',
            createdAt: '2025-05-06T11:22:04.648Z',
            updatedAt: '2025-05-06T11:22:04.648Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea81a',
            slug: 'view:roles',
            description: 'View Roles',
            createdAt: '2025-05-06T11:22:04.868Z',
            updatedAt: '2025-05-06T11:22:04.868Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea81b',
            slug: 'edit:roles',
            description: 'Edit Roles',
            createdAt: '2025-05-06T11:22:04.977Z',
            updatedAt: '2025-05-06T11:22:04.977Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea81c',
            slug: 'delete:roles',
            description: 'Delete Roles',
            createdAt: '2025-05-06T11:22:05.084Z',
            updatedAt: '2025-05-06T11:22:05.084Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea81e',
            slug: 'view:shortcuts',
            description: 'View Shortcuts',
            createdAt: '2025-05-06T11:22:05.298Z',
            updatedAt: '2025-05-06T11:22:05.298Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea81f',
            slug: 'edit:shortcuts',
            description: 'Edit Shortcuts',
            createdAt: '2025-05-06T11:22:05.404Z',
            updatedAt: '2025-05-06T11:22:05.404Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea820',
            slug: 'delete:shortcuts',
            description: 'Delete Shortcuts',
            createdAt: '2025-05-06T11:22:05.514Z',
            updatedAt: '2025-05-06T11:22:05.514Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea822',
            slug: 'view:tickets',
            description: 'View Tickets',
            createdAt: '2025-05-06T11:22:05.728Z',
            updatedAt: '2025-05-06T11:22:05.728Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea823',
            slug: 'edit:tickets',
            description: 'Edit Tickets',
            createdAt: '2025-05-06T11:22:05.837Z',
            updatedAt: '2025-05-06T11:22:05.837Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea824',
            slug: 'delete:tickets',
            description: 'Delete Tickets',
            createdAt: '2025-05-06T11:22:05.947Z',
            updatedAt: '2025-05-06T11:22:05.947Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea825',
            slug: 'view:settings',
            description: 'View Settings',
            createdAt: '2025-05-06T11:22:06.069Z',
            updatedAt: '2025-05-06T11:22:06.069Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea826',
            slug: 'edit:settings',
            description: 'Edit Settings',
            createdAt: '2025-05-06T11:22:06.181Z',
            updatedAt: '2025-05-06T11:22:06.181Z',
            __v: 0
          }
        ],
        isPublic: true,
        createdAt: '2025-05-06T11:22:06.505Z',
        updatedAt: '2025-05-06T11:22:06.505Z'
      },
      {
        id: '6819f0de7a055ee97c5ea858',
        name: 'Guest',
        slug: 'guest',
        permissions: [
          {
            id: '6819f0db7a055ee97c5ea80e',
            slug: 'view:projects',
            description: 'View Project',
            createdAt: '2025-05-06T11:22:03.565Z',
            updatedAt: '2025-05-06T11:22:03.565Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea812',
            slug: 'view:boards',
            description: 'View Boards',
            createdAt: '2025-05-06T11:22:04.004Z',
            updatedAt: '2025-05-06T11:22:04.004Z',
            __v: 0
          },
          {
            id: '6819f0db7a055ee97c5ea81e',
            slug: 'view:shortcuts',
            description: 'View Shortcuts',
            createdAt: '2025-05-06T11:22:05.298Z',
            updatedAt: '2025-05-06T11:22:05.298Z',
            __v: 0
          }
        ],
        isPublic: true,
        createdAt: '2025-05-06T11:22:06.610Z',
        updatedAt: '2025-05-06T11:22:06.610Z'
      }
    ];
  }

  // Method to build the final project object
  build() {
    return this.data;
  }
}
