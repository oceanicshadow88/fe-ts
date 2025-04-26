import React from 'react';
import TermsAndConditionsLayout from '../../lib/Layout/TermsAndConditionsLayout/TermsAndConditionsLayout';
import styles from './RefundPolicyPage.module.scss';

export default function RefundPolicyPage() {
  return (
    <TermsAndConditionsLayout title="Refund Policy">
      <div className={styles.container}>
        <p>
          If you use the free version of TechScrum, you will never be charged. However, you can
          upgrade your account at any time.
        </p>
        <p>
          You can also select a 30-day trial version when you sign up for any of the paid accounts
          If you cancel within this 30-day trial, you will not be charged We do not ask for payment
          details to start a 30-day trial.
        </p>

        <p>
          When your 30-day free trial period expires, you will be asked to create a paid
          subscription on the Subscription page of your TechScrum installation to continue using the
          paid service You will be charged monthly approximately 30-days from the date you make the
          first payment.
        </p>

        <p>
          If you decide not to continue on the plan you picked for your 30-day trial, your account
          will automatically be downgraded to the free account which you can use forever without
          charge.
        </p>

        <p>
          To cancel your subscription on a paid plan, you must cancel your PayPal Subscription from
          within PayPal. Once your paypal account has been cancelled, your monthly payment will be
          cancelled You can cancel your account at any time simply by logging in, going to the
          Subscription page and clicking the ‘ Cancel my account ’link.
        </p>

        <p>
          If you opt to pay once a year in advance, there is no part refund if you decide to stop
          using your account during the year. Once you pay for a year upfront your account will be
          live for 12 months. After the 12 months you can either re-new for a whole year, pay month
          by month, or drop to a free account.
        </p>
      </div>
    </TermsAndConditionsLayout>
  );
}
