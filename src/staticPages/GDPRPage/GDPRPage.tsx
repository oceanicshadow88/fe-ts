import React from 'react';
import TermsAndConditionsLayout from '../../lib/Layout/TermsAndConditionsLayout/TermsAndConditionsLayout';
import styles from './GDPRPage.module.scss';

export default function Gdpr() {
  return (
    <TermsAndConditionsLayout title="GDPR Compliance">
      <div className={styles.container}>
        <h2>What is the GDPR?</h2>
        <p>
          The General Data Protection Regulation (GDPR) was introduced to harmonize data privacy
          laws across Europe, to protect the data privacy of all EU citizens’ data, and to shape the
          way organizations across the region approach data privacy. GDPR replaced the Data
          Protection Directive 95/46/EC and it came into force on May 25th, 2018. The full text of
          the GDPR can be found <a href="https://gdpr-info.eu/">here</a>.
          <br />
          <br />
          GDPR significantly increased the responsibilities for organizations and businesses in how
          they collect, use, and protect personal data. At the centre of the new law is the
          requirement for organizations and businesses to be fully transparent about how they are
          using and protecting personal data, and to be able to demonstrate accountability for their
          data processing activities.
        </p>

        <h2>Why we welcome GDPR at TechScrum</h2>
        <p>
          At TechScrum, we understand the importance of putting privacy and data protection in the
          hands of our customers, so we are fully in compliance with the GDPR. We have carefully
          examined the relevant provisions of the GDPR and we closely followed applicable GDPR
          guidance issued by regulatory authorities. The GDPR strengthens individuals’ privacy
          rights through tighter controls over the processing of their personal data, significant
          expansion of their rights over their data, and increased transparency into the nature,
          purpose, and use of it. In our eyes, GDPR is a good thing.
        </p>

        <h2>TechScrum &rsquo;s commitment to GDPR compliance</h2>
        <p>
          In preparation for GDPR, we formed a core team of leaders from each area of TechScrum
          business, coordinated by our internal Data Protection Officer (DPO). The representatives
          in this group were charged with ensuring that all the requirements of GDPR were addressed
          across all teams.
        </p>

        <h2>What steps did we take in preparation for GDPR?</h2>
        <h3>Data collection and processing audit</h3>
        <p>
          We reviewed all TechScrum activities and all of our product suite to identify where we are
          collecting and processing customer data. Based on this, we validated our legal basis for
          collecting and processing that personal data. We also ensured that we are applying the
          appropriate safeguards across our entire infrastructure (both hardware and software) to
          fully protect this data.
        </p>

        <h3>Third-party vendors audit</h3>
        <p>
          We completed an audit of all third party vendors and validated their GDPR compliance. All
          vendor agreements were in place by 25th May.
        </p>

        <h3>Updated Terms of Service and Privacy Policy</h3>
        <p>
          We have updated our Terms of Service and Privacy Policy. These updated versions clearly
          outlined what personal data we’re collecting and processing, why, how we use it, who we
          share it with, and how long we store it for. As always, we aim to keep the language in our
          Terms of Service and Privacy Policy as clear as possible.
        </p>

        <h3>Data access, portability, and deletion</h3>
        <p>
          We know that you’ll want to provide the same level of GDPR compliance to your customers as
          we do to you. We made it easy to support your customers and give them the ability to
          access, handle, and delete their personal data. Because we operate on a self-service
          basis, you’ll always have full control over your own data, including autonomy in how you
          process your customers’ information. We also ensure that all of your data – and your
          customers’ data – is easily exportable in a commonly used and computer readable format.
        </p>

        <h3>Breach management</h3>
        <p>
          As part of our HIPAA compliance, we already have management and communication processes in
          place in the unlikely event of a data breach; we’ve updated these to further comply with
          the GDPR regulations.
        </p>

        <h3>We’re here to help</h3>
        <p>
          We know that navigating GDPR can seem daunting, but we’re here to help. If you have any
          questions or concerns regarding how we protect your personal data, please don’t hesitate
          to reach out to us at gdpr@techscrum.com.
        </p>
      </div>
    </TermsAndConditionsLayout>
  );
}
