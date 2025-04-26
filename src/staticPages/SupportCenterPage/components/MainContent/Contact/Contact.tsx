import React from 'react';
import styles from './Contact.module.scss';
import ContactForm from '../../../../ContactPage/ContactForm/ContactForm';

export default function Contact() {
  return (
    <div className={styles.contact}>
      <div className={styles.contactContainer}>
        <div className={styles.workTime}>
          <p>TechScrum’s Support team is available Monday through Friday,</p>
          <p>9.00am - 5.00pm IST, limited weekend cover.</p>
        </div>
        <div className={styles.contactDetail}>
          <div className={styles.contactDetailForm}>
            <ContactForm />
          </div>
          <div className={styles.emailContainer}>
            <h4>Email us</h4>
            <p>
              Send us an email at
              <a href="info@techscrumapp.com">info@techscrumapp.com</a>
            </p>
            <h4>Join a webinar</h4>
            <p>Join our live webinars to see our products in action.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
