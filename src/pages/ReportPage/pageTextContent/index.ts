import { ISummaryLink } from '../components/Card/SummaryLinksCard/SummaryLinksCard';

const PAGE_TITLE_MAIN_TEXT = 'create the perfect Agile workflow with Board vie';
const GET_START_SECTION_DESCRIPTION_TEXT =
  'Build a flexible Kanban system to visualize your work and improve project management.';
const GET_START_SECTION_VIDEO_URL =
  'https://clickup.com/videos/features/kanban-board/board-view-agile-inventory.mp4';

export const GET_START_SECTION_DATA = {
  PAGE_TITLE_MAIN_TEXT,
  GET_START_SECTION_DESCRIPTION_TEXT,
  GET_START_SECTION_VIDEO_URL
};

export const BOARD_SECTION_DATA_LIST = [
  {
    MAIN_TITLE_TEXT: 'Visual Achievements',
    SUB_TITLE_TEXT: 'Visualization',
    THEME_COLOR: 'purple',
    DESCRIPTION:
      'You will be provided different kinds of virtualizing tools which can offer additional analytical capabilities, such as interactive charts and diagrams, which can help your teams to identify trends, patterns, and potential issues quickly. Based on the data and analysis, you will obtain timely advice and suggestions for improvement so your team can work effectively and achieve better results.',
    VIDEO_URL: 'https://clickup.com/videos/features/kanban-board/board-view-grouping.mp4'
  },
  {
    MAIN_TITLE_TEXT: 'Delay Tracking and Management',
    SUB_TITLE_TEXT: 'Delay Tracker',
    THEME_COLOR: 'purple',
    DESCRIPTION:
      'This chart helps your team identify and address issues during the workflow process. It will provide an accurate number of the project delay to your team which will help manage your expectations and allow your team to work together on an updated plan to get the project back on track. In order to effectively address the delay problem, it will provide different solutions tailored to the specific causes of the problem. By understanding the root causes, your team can develop targeted solutions to address the underlying issues and prevent the problem from recurring.',
    VIDEO_URL: 'https://clickup.com/videos/features/kanban-board/board-view-status-change.mp4'
  },
  {
    MAIN_TITLE_TEXT: 'Sprint/Iteration Progress Report',
    SUB_TITLE_TEXT: 'Short-term Goals',
    THEME_COLOR: 'purple',
    DESCRIPTION:
      'This report summarises whether your team meets your goals and completes tickets based on the specific sprint. By analyzing the data in the reports, your team can identify areas where you need to improve in the next sprint and make necessary adjustments to your plan. You can also highlight these analysed data in retrospective meetings and make changes accordingly.',
    VIDEO_URL: 'https://clickup.com/videos/features/kanban-board/board-view-custom-status.mp4'
  },
  {
    MAIN_TITLE_TEXT: 'Cumulative Flow Diagram(CFD)',
    SUB_TITLE_TEXT: 'Long-term Goals',
    THEME_COLOR: 'purple',
    DESCRIPTION:
      "This diagram graphically represents your team's work in Progress (WIP) and throughput over time. It shows the number of items in each workflow stage over time, each in a different color. You can custom the time-period and check its metrics and analytics to help your team track progress, identify areas for improvement and achieve long-term goals.",
    VIDEO_URL: 'https://clickup.com/videos/features/kanban-board/board-view-drag-drop-status.mp4'
  },
  {
    MAIN_TITLE_TEXT: 'Take your project to the next level',
    SUB_TITLE_TEXT: 'Improvement Report',
    THEME_COLOR: 'purple',
    DESCRIPTION:
      'This report provides identify areas for improvement in your workflow, such as reducing cycle time or increasing throughput. Instead of focusing on individual performance, this report is more system-oriented improvement. It can help your team to identify bottlenecks in your workflow by showing where tickets are getting stuck or taking longer than expected to move through the workflow. By analyzing the trends, your team can predict how long it will take to complete future tickets, how much work should be arranged in each sprint, and reconsider ongoing tickets priority, estimated points and limits.',
    VIDEO_URL: 'https://clickup.com/videos/features/kanban-board/multitask-toolbar.mp4'
  }
];

export const FEATURE_SECTION_DATA = {
  SECTION_TITLE_MAIN_TEXT: 'organize work and assess bandwidth',
  SECTION_TITLE_SUB_TEXT: 'visualize',
  SECTION_TITLE_SUB_COLOR: 'purple',
  SECTION_CARDS: [
    {
      CARD_CONTENT_LIST: [
        'manage tickets, workflows, & goals',
        'collaborate in Docs & Whiteboards',
        'save time with no-code automations'
      ],
      CARD_TITLE_TEXT: 'stay on track with sorting and filtering',
      CARD_IMG_SRC: 'https://clickup.com/images/features/kanban-board/board-view-fiter.png',
      CARD_THEME_COLOR: 'brand'
    },

    {
      CARD_CONTENT_LIST: [
        "Easily see when there's too much work in a status",
        'Measure workload by sprint points, time estimates, and more',
        'Spot bottlenecks at a glance to ship projects faster'
      ],
      CARD_TITLE_TEXT: 'monitor capacity with Work in Progress Limits',
      CARD_IMG_SRC: 'https://clickup.com/images/features/kanban-board/board-view-limits.png',
      CARD_THEME_COLOR: 'pink'
    }
  ]
};

export const CUMSTOMER_SECTION_DATA = {
  SECTION_TITLE: "save on day every week with TechScrum's Board view",
  SECTION_BACKGROUND_IMG: 'https://clickup.com/images/collaboration-detection/bg__with-dotted.svg'
};

export const SUMMARY_LINKS_DATA: ISummaryLink[] = [
  {
    iconImgSrc: 'https://clickup.com/images/kindness/free-training.svg',
    summaryText: 'Free training & 24-hour support',
    linkText: 'Free training'
  },
  {
    iconImgSrc: 'https://clickup.com/images/kindness/security.svg',
    summaryText: 'Serious about security & privacy',
    linkText: 'security & privacy'
  },
  {
    iconImgSrc: 'https://clickup.com/images/kindness/uptime.svg',
    summaryText: 'Highest levels of uptime the last 12 months',
    linkText: 'the last 12 months'
  }
];
