import React from 'react';
import TermsAndConditionsLayout from '../../lib/Layout/TermsAndConditionsLayout/TermsAndConditionsLayout';
import styles from './PrivacyPolicyPage.module.scss';

export default function PrivacyPolicyPage() {
  return (
    <TermsAndConditionsLayout title="Privacy Policy">
      <div className={styles.container}>
        <h2>Business Privacy Policy</h2>
        <p>
          This privacy policy sets out how TechScrum.com and any related products, services, apps or
          integrations uses and protects any information that you provide when you use our products
          TechScrum, Desk, Spaces, CRM, any of our mobile or desktop app offerings and our
          integrations with third party apps and services.
        </p>
        <p>
          TechScrum.com is committed to ensuring that your privacy is protected. Should we ask you
          to provide certain information by which you can be identified when using our products,
          then you can be assured that it will only be used in accordance with this privacy
          statement. This policy is effective from 25th May 2018.
        </p>
        <h2>What we collect</h2>
        <p>
          We may collect certain information that we need in order to provide you with the business
          service and products that you receive from us. The information may include the following:
        </p>
        <ul>
          <li>Internal record keeping.</li>
          <li>We may use the information to improve our products and services.</li>
          <li>
            We will communicate with individuals using our products based on their usage type and
            their communication preferences, as described here:
          </li>
          <ul className={styles.nestedUl}>
            <li className={styles.nestedLi}>
              Free Trial Users: We will support your free trial experience by sending you product
              and service-related announcements via email regarding technical or administrative
              issues considered valuable or essential to your continued ability to use the
              product/service e.g. free trial ending notifications. However, if you do not wish to
              receive these please unsubscribe by emailing unsubscribeTechScrum.com
            </li>
            <li className={styles.nestedLi}>
              Paid Users (including customers on a Free plan): From time to time, we may send you
              technical notices, updates, security alerts, and support and administrative messages
              and subscription alerts. These emails are not promotional in nature. If you have
              opted-in to receive email communications, we reserve the right to send email
              communications (regarding promotional offers, events, invites) from time to time in
              accordance with your communications preferences. Users who receive these marketing
              materials can opt out at any time. If you do not want to receive marketing materials
              from us, you can opt-out by clearly following the “unsubscribe” instructions at the
              bottom of any email you receive or by emailing us at unsubscribeTechScrum.com.
            </li>
          </ul>

          <li>
            From time to time, we may also use your information to contact you for market research
            purposes. We may contact you by email, phone, fax or mail.
          </li>
        </ul>
        <p>
          Additional Limits on Use of Your Google User Data: Notwithstanding anything elsein this
          Privacy Policy, if you provide the App access to the following types of your Google data,
          the App’s use of that data will be subject to these additional restrictions:
        </p>
        <ul>
          <li>
            The App will only use access to read, write, modify or control Gmail message bodies
            (including attachments), metadata, headers, and settings to provide a web email client
            that allows users to compose, send, read,and process emails and will not transfer this
            Gmail data to others unless doing so is necessary to provide and improve these features,
            comply with applicable law, or as part of a merger, acquisition, or sale of assets.
          </li>
          <li>The App will not use this Gmail data for serving advertisements.</li>
          <li>
            The App will not allow humans to read this data unless we have your affirmative
            agreement for specific messages, doing so is necessary for security purposes such as
            investigating abuse, to comply with applicable law, or for the App’s internal operations
            and even then only when the data have been aggregated and anonymized.
          </li>
          <li>
            The App use and transfer to any other app of information received from Google APIs will
            adhere to{' '}
            <a href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes">
              Google API Services User Data Policy
            </a>
            , including the Limited Use requirements.
          </li>
        </ul>
      </div>
    </TermsAndConditionsLayout>
  );
}
