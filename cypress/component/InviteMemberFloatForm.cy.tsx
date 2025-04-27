import { ModalContext } from "../../src/context/ModalProvider";
import InviteMemberFloatForm from "../../src/pages/ProjectMembersPage/InviteMemberFloatForm/InviteMemberFloatForm";
import { IRole } from "../../src/types";
import DropdownV2 from "../../src/lib/FormV2/DropdownV2/DropdownV2";


describe('InviteMemberFloatForm.cy.tsx', () => {
  const mockRoles: IRole[] = [
    {
      id: '0',
      name: 'Admin',
      permissions: [],
      isPublic: true
    },
    {
      id: '1',
      name: 'Developer',
      permissions: [],
      isPublic: true
    },
    {
      id: '2',
      name: 'Project Manager',
      permissions: [],
      isPublic: true
    },
    {
      id: '3',
      name: 'Guest',
      permissions: [],
      isPublic: true
    }
  ];

  const options = [
    { value: 'admin', label: 'Admin' },
    { value: 'Developer', label: 'Developer' },
    { value: 'Project Manager', label: 'Project Manager' },
    { value: 'Guest', label: 'Guest' }
  ];


  beforeEach(function () {
    const closeModal = cy.stub().as('closeModal');
    const showModal = cy.stub().as('showModal');
    const onInviteMember = cy.stub().as('onInviteMember');

    cy.mount(
      <ModalContext.Provider value={{ closeModal, showModal }}>
        <InviteMemberFloatForm roles={mockRoles} onInviteMember={onInviteMember} />
        <DropdownV2
          label="Role"
          name="role"
          options={options}
          onValueChanged={(e) => console.log(e.target.value)}
          dataTestId="dropdown-role"
      />
      </ModalContext.Provider>
    );
  });

  it('invite user (role as developer)', () => {

    cy.intercept('POST', `**/api/v2/projects/:projectId/members/invite`, {
      statusCode: 200,
      body: {}
    }).as('inviteMember');
    cy.get('[data-testid="add-button"]').contains('Add').as('addButton');
    cy.get('[data-testid="email"]').type('techscrumapp@.com');

    // clcik on the dropdown
    cy.get('[data-testid="dropdown-role"]').click();

    // Verify dropdown menu is open

    // Select specific option using testid
    //cy.get('[data-testid="leader-name-Developer"]').contains('Developer').click(); 


    cy.wait('@inviteMember');
    cy.get('@addButton').click();



    
  });
});