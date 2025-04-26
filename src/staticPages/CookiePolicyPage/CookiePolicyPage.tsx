import React from 'react';
import TermsAndConditionsLayout from '../../lib/Layout/TermsAndConditionsLayout/TermsAndConditionsLayout';
import styles from './CookiePolicyPage.module.scss';

export default function CookiePolicyPage() {
  return (
    <TermsAndConditionsLayout title="Tech Scrum Cookie Policy">
      <div className={styles.container}>
        <p>
          TechScrum.com makes use of cookies and other tracking technologies on our company website
          (ie: TechScrum.com), within our Software as a Service (SaaS) product offerings TechScrum,
          Desk, Spaces, CRM, our mobile or desktop apps and all our integrations with third party
          apps and services. This is a brief explanation of the cookies and other tracking
          technologies used.
        </p>
        <h2>Cookies</h2>
        <p>
          Cookies are small, usually randomly encoded, text files that help you navigate through a
          website. They are generated on the sites that you visit, as well as by third-parties that
          websites work with, to manage key elements of their business-user functionality. In most
          cases they do not involve or use personal information in any way.
        </p>
        <p>
          Cookies are used extensively online and have become part of the fabric and make-up of what
          has made the internet work effectively for consumers and businesses. Without cookies, many
          areas of functionality (for example, user logins, shopping baskets and other customization
          features) would not work as expected.
        </p>
        <p>
          Further information on cookies can be found at the{' '}
          <a href="https://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm">
            EU Internet Handbook{' '}
          </a>
          or <a href="https://www.allaboutcookies.org/verify"> AllAboutCookies.org</a>.
        </p>
        <h2>Cookie types</h2>
        <h3>Session cookies</h3>
        <p>
          Session cookies are temporary cookies that are not stored on your computer or mobile
          device. They are used as part of the login, authentication and session management flows of
          the SaaS platform websites. Certain session cookies are also used to understand, for
          example, if a user interacting with our company website is a new visitor or a visitor
          returning as part of the same browsing session. These session cookies are erased when you
          close your browser, or after extended inactivity.
        </p>
        <h3>Persistent cookies</h3>
        <p>
          Persistent cookies are those placed on your computer or mobile device for a pre-determined
          length of time when you visit this site. They are used on both the SaaS platform and
          company websites, including, for example, to understand (through Google Analytics or
          Marketo services) what areas of our websites and platform are most popular, and how
          customers and users engage with them.
        </p>
        <h2>Cookie management</h2>
        <p>
          You have the ability to accept or decline the use of cookies. Most web browsers
          automatically accept cookies, but you can usually modify your browser setting to decline
          all cookies, if you prefer. Alternatively, many web browsers can be configured to notify
          you each time a cookie is tendered, and permit you to accept or decline them on an
          individual basis or on a site-by-site basis. If you choose to decline cookies from
          TechScrum.com’s websites, you may experience some unexpected behaviours or impact to the
          use of the hosted SaaS software.
        </p>
        <h2>Other tracking technologies</h2>
        <p>
          Other tracking technologies are used on TechScrum.com’s company website and SaaS platform
          sites. These are primarily used to understand if customers or users are interacting with
          any marketing-type emails sent from our systems. Examples include:
        </p>
        <ul>
          <li>
            Flash Locally Stored Objects (eg ‘Flash’ cookies) – these follow the same principle as
            normal standard cookies in that they allow information to be stored on a user’s machine.
          </li>
          <li>
            Transparent GIF or web beacons- these mechanisms can be used to deliver a cookie to your
            browser. They can also be used in email marketing to identify to the sender if an email
            has been opened.
          </li>
        </ul>
      </div>
    </TermsAndConditionsLayout>
  );
}
