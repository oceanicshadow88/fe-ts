import { ITextPart } from './ReusableSection/TextPart/TextPart';
import { IVisualizeCard } from './VisualizeSection/VisualizeCard/VisualizeCard';

const REUSABLE_SECTION_TEXT: ITextPart[] = [
  {
    subtitle: 'Ongoing Tickets',
    heading: 'Work in Progress',
    text: "Work in Progress refers to tickets that need to be completed in the current sprint, which means a specific time period during which your team is focused on achieving a set of predetermined tickets or goals. The particular length and timing of the sprint can vary depending on the team's needs and the project's nature. All the tickets in this section must with high priority and well-planned before it starts. This can help your team to plan specific goals for the current sprint and execute them efficiently."
  },
  {
    subtitle: 'Upcoming Tickets',
    heading: 'Work in Backlog',
    text: 'Work in backlog refers to tickets planned and scheduled for completion in the future. It is useful for your team to plan and ensure team members clearly understand what tickets need to be completed and when. These tickets have been identified as a medium priority and necessary but have not yet been scheduled for execution. As your team completes tickets from the current sprint, you can pull tickets from the backlog section and move them into the current sprint.'
  },
  {
    subtitle: 'Unplanned Tickets',
    heading: 'Work in Advance',
    text: 'Work in advance refers to unplanned tickets with a low priority that has not been assigned to anyone, but their requirement has been confirmed and needs to be done in the future—for example, tech debt. If a team member starts working on a ticket that is not the top priority, it can cause confusion or delays in the overall project plan. After finishing tickets in the current sprint and backlog, your team can pull relatively urgent tickets from this section and move them into the current sprint.'
  }
];

const VISUALIZE_CARD_TEXT: IVisualizeCard[] = [
  {
    listTitle: 'Stay on track with sorting and filtering.',
    listItemText: [
      'Sort tickets in a column by due date, priority, and more',
      'Filter tickets by assignee to only see your work',
      'Add filtered views to your Favorites for future reference'
    ],
    imageUrl: 'https://clickup.com/images/features/kanban-board/board-view-fiter.png'
  },
  {
    listTitle: 'Monitor capacity with Work in Progress Limits.',
    listItemText: [
      "Easily see when there's too much work in a status",
      'Measure workload by sprint points, time estimates, and more',
      'Spot bottlenecks at a glance to ship projects faster'
    ],
    imageUrl: 'https://clickup.com/images/features/kanban-board/board-view-limits.png'
  }
];

export default REUSABLE_SECTION_TEXT;
export { VISUALIZE_CARD_TEXT };
