import React from 'react';
import styles from './ServicesTabs.module.scss';
import Tab from './Tabs/Tab';

const company = {
  title: 'company',
  contents: [
    { href: '/#', item: 'About TechScrum' },
    { href: '/#', item: 'LeaderShip' },
    { href: '/#', item: 'Careers' },
    { href: '/#', item: 'Security' },
    { href: '/#', item: 'News' },
    { href: '/#', item: 'Brand' },
    { href: '/#', item: 'Affiliate program' },
    { href: '/#', item: 'Partner program' },
    { href: '/#', item: 'Contact us' },
    { href: '/#', item: 'Support Center' },
    { href: '/#', item: 'Startups' }
  ]
};

const product = {
  title: 'product',
  contents: [
    { href: '/#', item: 'TechScrum Desk' },
    { href: '/#', item: 'TechScrum Chat' },
    { href: '/#', item: 'TechScrum Spaces' },
    { href: '/#', item: 'TechScrum CRM' },
    { href: '/#', item: 'View all products' },
    { href: '/#', item: 'Integrations' },
    { href: '/#', item: 'Roadmap' },
    { href: '/#', item: 'Status' },
    { href: '/#', item: 'API' }
  ]
};

const solution = {
  title: 'product',
  contents: [
    { href: '/#', item: 'Remote work' },
    { href: '/#', item: 'Marketing agency' },
    { href: '/#', item: 'Marketing teams' },
    { href: '/#', item: 'Product teams' },
    { href: '/#', item: 'Professional services' },
    { href: '/#', item: 'Product development' },
    { href: '/#', item: 'Work management' }
  ]
};

const resources = {
  title: 'resources',
  contents: [
    { href: '/terms-of-service', item: 'Term of Service' },
    { href: '/#', item: 'Project management guild' },
    { href: '/#', item: 'Project timeline guild' },
    { href: '/#', item: 'Project schedule guild' },
    { href: '/#', item: 'Product launch template' },
    { href: '/#', item: 'Software launch plan' },
    { href: '/#', item: 'Event marketing template' },
    { href: '/#', item: 'Creative request form' }
  ]
};

const compare = {
  title: 'compare',
  contents: [
    { href: '/#', item: 'TechScrum vs Asana' },
    { href: '/#', item: 'TechScrum vs Monday' },
    { href: '/#', item: 'TechScrum vs Wrike' },
    { href: '/#', item: 'TechScrum vs Trello' },
    { href: '/#', item: 'TechScrum vs Smartsheet' },
    { href: '/#', item: 'TechScrum vs MS Planner' },
    { href: '/#', item: 'TechScrum vs Basecamp' },
    { href: '/#', item: 'TechScrum vs ClickUp' }
  ]
};

export default function servicesTabs() {
  return (
    <div className={styles.servicesList}>
      <Tab services={company} />
      <Tab services={product} />
      <Tab services={solution} />
      <Tab services={resources} />
      <Tab services={compare} />
    </div>
  );
}
