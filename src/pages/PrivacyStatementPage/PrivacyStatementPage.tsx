import React from 'react';
import { Link } from 'react-router-dom';
import TermsAndConditionsLayout from '../../lib/Layout/TermsAndConditionsLayout/TermsAndConditionsLayout';
import styles from './PrivacyStatementPage.module.scss';

export default function PrivacyStatementPage() {
  return (
    <TermsAndConditionsLayout title="Privacy Statement">
      <div className={styles.container}>
        <h2>What is a Privacy Statement and Why is It Important</h2>
        <p>
          We know your personal information is important to you and it is also important to
          TechScrum.com. This Privacy Statement tells you what we use your personal information for
          and explains your rights around how we use it. Please read this Privacy Statement to
          understand how and why we use your personal information.
        </p>
        <p>
          If you give us personal information about someone else, please make sure you have their
          permission and please make them aware of this Privacy Statement as it also applies to
          them.
        </p>
        <h2>Who Controls Your Information</h2>
        <p>
          For the purposes of the applicable data protection legislation, Digital Crew Limited t/a
          TechScrum.com is the data controller. You will find our contact details in the Contact us
          section below.
        </p>
        <h2>Information We May Collect and Process</h2>
        <p>We may collect and process the following categories of data:</p>
        <h3>Information you give us</h3>
        <ul>
          <li>Full name;</li>
          <li>E-mail address;</li>
          <li>Telephone numbers;</li>
          <li>Payment details;</li>
          <li>Business address;</li>
          <li>Job title.</li>
        </ul>
        <h3>Cookies</h3>
        <p>
          For more information on our use of cookies, please read our{' '}
          <Link to="/cookie-policy">Cookie Policy</Link>.
        </p>
        <p>
          We may also process other information, which is not personal data within the meaning of
          data protection law.
        </p>
        <h3>Why We Collect and Process Your Information</h3>
        <p>
          Without collecting and using the information you provide to us or we obtain about you, it
          would not be possible for us to provide you with our products and/or services.
        </p>
        <p>We use information held about you in the following ways:</p>
        <p>
          <p className={styles.highlightedText}>Information you give to us. </p>
          We will use this information:
        </p>
        <ul>
          <li>
            <p>
              To carry out our obligations arising from any contracts entered into between you and
              us and to provide you with the information, products and services that you request
              from us;
            </p>
          </li>
          <li>
            <p>
              To provide you with information about new products or services we offer that are
              similar to those that you have already purchased or enquired about;
            </p>
          </li>
          <li>
            <p>
              To contact you from time to time for market research purposes. We may contact you by
              email, phone, fax or mail.
            </p>
          </li>
        </ul>
        <p>
          <p className={styles.highlightedText}>Information we collect about you. </p>
          We will use this information:
        </p>
        <ul>
          <li>
            <p>
              To administer our products and services and for internal operations, including
              troubleshooting, data analysis, testing, research, statistical and survey purposes;
            </p>
          </li>
          <li>
            <p>
              To improve our products and services to ensure that content is presented in the most
              effective manner for you;
            </p>
          </li>
          <li>
            <p>As part of our efforts to keep our products and services safe and secure;</p>
          </li>
          <li>
            <p>
              To measure or understand the effectiveness of marketing and product information we
              serve to you and others, and to help deliver the most relevant information to you.
            </p>
          </li>
        </ul>
        <p>
          We must have lawful basis to collect and use your personal information, the below sets
          these out:
        </p>
        <p>
          <p className={styles.highlightedText}>Needed for your contract. </p>Personal information
          about you and other users registered to under the same subscription plan is held and used
          to:
        </p>
        <ul>
          <li>
            <p>Provide you with a quote;</p>
          </li>
          <li>
            <p>Provide you with information about the product or service;</p>
          </li>
          <li>
            <p>Receive payment;</p>
          </li>
          <li>
            <p>Provide customer care and service.</p>
          </li>
        </ul>
        <p>
          <p className={styles.highlightedText}>Required by law: </p>
          We use your personal information to comply with any law and regulations where we are
          required to do so.
        </p>
        <p>
          <p className={styles.highlightedText}>Our legitimate interest: </p>
          We use your personal information for our legitimate interests as shown below. We have
          taken account of any privacy risks and ensured that your data protection rights are not
          affected. We believe these uses benefit our customers. If you have any questions please
          contact us at privacy@techscrum.com.
        </p>
        <ul>
          <li>
            <p>
              Training: for customer service training and compliance purposes. We let you know if a
              call is being recorded at the start of the call so you can decide whether to continue
              with the call or not;
            </p>
          </li>
          <li>
            <p>
              Statistical Analysis: we combine and group personal information for analysis to help
              us understand our customers and develop better products and services.
            </p>
          </li>
        </ul>
        <p>
          <p className={styles.highlightedText}>With your consent: </p>
          For certain of our uses, we rely on your consent to collect and use your personal
          information. You are given the choice to provide consent or not. When we collect your
          consent, we explain what we need it for and how you can change your mind in the future.
        </p>
        <h2>Who We Share Your Personal Information With</h2>
        <p>We may share your information with selected third parties including:</p>
        <ul>
          <li>
            <p>
              Business partners, suppliers and sub-contractors for the performance of any contract
              we enter into with them or you;
            </p>
          </li>
          <li>
            <p>
              Communication companies that require the data to select and serve relevant marketing
              information to you and others;
            </p>
          </li>
          <li>
            <p>
              Third-party service providers to provide website and application development, hosting;
            </p>
          </li>
          <li>
            <p>Data storage partners and who provide virtual infrastructure;</p>
          </li>
          <li>
            <p>Partners who provide payment processing facilities on our behalf;</p>
          </li>
          <li>
            <p>
              Analytics and search engine providers that assist us in the improvement and
              optimisation of our products or services.
            </p>
          </li>
        </ul>
        <p>
          If a service provider needs to access information about you to perform services on our
          behalf, they do so under close instruction from us, including policies and procedures
          designed to protect your information.
        </p>
        <p>We may disclose your personal information to third parties:</p>
        <ul>
          <li>
            <p>
              In the event that we dispose of or buy any business or assets, in which case we may
              disclose your personal data to the prospective seller or buyer of such business or
              assets;
            </p>
          </li>
          <li>
            <p>
              If Techscrum.com or substantially all of its assets are acquired by a third party, in
              which case personal data held by it about its customers will be one of the transferred
              assets;
            </p>
          </li>
          <li>
            <p>
              If we are under a duty to disclose or share your personal data in order to comply with
              any legal obligation, or in order to enforce or apply our terms of use and other
              agreements; or to protect the rights, property, or safety of Techscrum.com, its
              customers, or others.
            </p>
          </li>
        </ul>
        <h2>Data Retention Periods</h2>
        <p>
          It is our aim to only hold your data for as long as this is necessary. While you continue
          as a customer with us we will retain your data as detailed above in this statement. The
          retention period will be 24 months from the date of termination of our terms of service.
          We have a high number of customers who re-engage with our service after a period of
          absence from the end of their contract. This retention period allows for the data to be
          reused where necessary. However, you can request that your Data is deleted at anytime
          within this period. We will respond to your request and complete the full deletion within
          30 days.
        </p>
        <p>
          Specific legal periods are in place for payments details, tax and invoicing data, and this
          would be retained in accordance with the law (which is currently six years).
        </p>
        <h2>Security</h2>
        <p>
          We are committed to protecting the security of your personal data. We use a variety of
          security technologies and procedures to help protect your personal data from unauthorised
          access and use. For more detailed and technical information please see our{' '}
          <Link to="/security-page">Security Page</Link>.
        </p>
        <p>
          As effective as modern security practices are, no physical or electronic security system
          is entirely secure. The transmission of information via the internet is also not
          completely secure. We cannot guarantee the complete security of our databases, nor can we
          guarantee that information you supply will not be intercepted while being transmitted to
          us over the Internet. We will continue to revise policies and implement additional
          security features as new technologies become available.
        </p>
        <p>
          Although we will do our best to protect your personal data, we cannot guarantee the
          security of your personal data transmitted to us. Any transmission of data is at your own
          risk. Once we receive your personal data, we use appropriate security measures to seek to
          prevent unauthorised access.
        </p>
        <h2>Where Your Data Is Stored</h2>
        <p>
          We store your information in the location of your choice, either in the EU or in the USA,
          which you have indicated at the initial contract stage. Physical files are stored in
          secured premises at our business address. Electronic files are stored on secure servers or
          in the cloud. We use cloud solutions for web hosting or proprietary software solutions
          delivered through the Cloud. Your data will not be transferred between our servers without
          your permission.
        </p>
        <h2>Your Rights</h2>
        <p>As an individual, under EU law you have the right to request that we:</p>
        <ul>
          <li>
            <p>
              Provide you with information as to whether we process your data and details relating
              to our processing, and that we provide you with a copy of your data (‘access right’);
            </p>
          </li>
          <li>
            <p>
              Rectify and/or update any inaccurate data we might have about you without undue delay
              (‘right to rectification’);
            </p>
          </li>
          <li>
            <p>The right to object to processing of data relating to you (‘right to object’);</p>
          </li>
          <li>
            <p>
              Under certain circumstances, be restricted from processing your data (‘right to
              restriction’);
            </p>
          </li>
          <li>
            <p>
              Under certain circumstances, erase your personal data without undue delay (i.e. the
              “right to erasure”). and under certain circumstances, furnish you with the personal
              data which you provided us within a structured, commonly used and machine readable
              format (‘right to data portability’).
            </p>
          </li>
        </ul>
        <p>
          Where we process your data solely on the basis of your consent, you are entitled to
          withdraw your consent at any time. This will not affect the lawfulness of our processing
          before the withdrawal.
        </p>
        <p>
          You also have the right to lodge a complaint with the Data Protection Commission at any
          time.
        </p>
        <p>
          The exercise of your rights might be subject to certain conditions and we might require
          further information from you before we can respond to your request.
        </p>
        <p>
          You may exercise your rights by contacting our Data Protection Officer at the address or
          e-mail address provided below.
        </p>
        <h2>Changes to This Statement</h2>
        <p>
          We reserve the right to change this Statement from time to time in our sole discretion. If
          we make any changes, we will publish those changes on our website. At the bottom of this
          document you will find the date on which this Statement was last updated.
        </p>
        <h2>Contact Us</h2>
        <p>
          Questions, comments, requests and complaints regarding this Statement and the information
          we hold are welcome and should be addressed to us at privacy@techscrum.com. We endeavour
          to deal with all requests promptly and efficiently.
        </p>
        <p>
          Data Protection Officer, Billy Mahony, privacy@techscrum.com, Business Address –
          Techscrum.com, Techscrum Campus 1, Park House, Blackpool Retail Park, Blackpool, Co. Cork,
          Ireland, T23 F902, Telephone number +353 21 430 7675 from the USA Tel. +1 844 819 8453
        </p>
      </div>
    </TermsAndConditionsLayout>
  );
}
