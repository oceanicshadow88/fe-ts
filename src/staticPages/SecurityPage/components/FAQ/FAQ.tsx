import React from 'react';
import styles from './FAQ.module.scss';
import FAQComponent from './FAQComponent/FAQComponent';

export default function Certifications() {
  const objs = [
    {
      title: 'Where are your servers located',
      content:
        'Our servers are with Amazon Web Services AWS and are hosted within the US and the EU. For more information on AWS, click here.'
    },
    {
      title: 'Who has access to the servers?',
      content:
        'Only certain members of our team have authorization to access the servers. We never breach customer confidentiality.'
    },
    {
      title: 'What about physical security?',
      content:
        'AWS infrastructure is housed in Amazon-controlled data centers throughout the world. Only those within Amazon who have a legitimate business need to have such information know the actual location of these data centers.'
    },
    {
      title: 'Where can I find your uptime report?',
      content: 'You can see the latest uptime report https://status.teamwork.com/.'
    },
    {
      title: 'Where do I report a security concern?',
      content: 'You can report a security concern by emailing us at security@teamwork.com.'
    }
  ];

  const faqComponent = objs.map((obj) => {
    return <FAQComponent key={obj.title} title={obj.title} content={obj.content} />;
  });

  return (
    <div className={styles.faqRoot}>
      <h3 className={styles.heading}>Frequently asked questions</h3>
      <div className={styles.faqDetailesContainer}>
        {faqComponent}
        <div className={styles.faqInfoContainer}>
          <div className={styles.descContainer}>
            <p className={styles.desc}>
              Have a question that we haven’t answered here? We’d love to talk to you. Get in touch
              with us by emailing{' '}
              <a className={styles.emailLink} href="mailto:support@teamwork.com">
                support@teamwork.com
              </a>
            </p>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.linkButton}>More Information</button>
          </div>
        </div>
      </div>
    </div>
  );
}
