import { ReactNode } from 'react';

export interface SectionItem {
  key: string;
  title: string;
  content: ReactNode;
}

export interface Section {
  category: string;
  items: SectionItem[];
}

export const privacyPolicySections: Section[] = [
  {
    category: 'Information we collect',
    items: [
      {
        key: 'personal',
        title: 'Personal Information',
        content: (
          <ul className="text-[15px] text-gray-700 space-y-2">
            {[
              'Name',
              'Email address',
              'Mailing address (for book swaps)',
              'Phone number (optional)',
              'Username and password (for account creation)',
              'Payment information (if applicable, for premium services)',
            ].map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        ),
      },
      {
        key: 'nonPersonal',
        title: 'Non-Personal Information',
        content: (
          <ul className="text-[15px] text-gray-700 space-y-2">
            {[
              'IP address',
              'Browser type and version',
              'Operating system',
              'Pages visited on the Website',
              'Time and date of visits',
              'Referring website (if applicable)',
            ].map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        ),
      },
      {
        key: 'userContent',
        title: 'User Generated Content',
        content: (
          <ul className="text-[15px] text-gray-700 space-y-2">
            {[
              'Book listings (title, author, condition, etc.)',
              'Reviews and ratings',
              'Messages exchanged with other users',
            ].map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        ),
      },
    ],
  },
  {
    category: 'Information Usages & Data Privacy',
    items: [
      {
        key: 'uses',
        title: 'Uses of information',
        content: (
          <ul className="text-[15px] text-gray-700 space-y-2">
            {[
              'To facilitate book swaps between users.',
              'To create and manage your account.',
              'To communicate with you about your account, transactions, and updates to our services.',
              'To improve the functionality and user experience of the Website.',
              'To process payments (if applicable).',
              'To send promotional emails or newsletters (only with your consent).',
              'To comply with legal obligations and resolve disputes.',
            ].map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        ),
      },
      {
        key: 'sharing',
        title: 'Sharing Information',
        content: (
          <ul className="text-[15px] text-gray-700 space-y-2">
            <li>
              <b>With Other Users:</b> Your name, mailing address, and contact information may be
              shared with other users to facilitate book swaps.
            </li>
            <li>
              <b>With Service Providers:</b> We may share information with third-party service
              providers who assist us in operating the Website (e.g., payment processors, hosting
              providers).
            </li>
            <li>
              <b>For Legal Reasons:</b> We may disclose your information if required by law or to
              protect our rights, property, or safety.
            </li>
            <li>
              <b>With Your Consent:</b> We may share your information with third parties if you give
              us explicit permission to do so.
            </li>
          </ul>
        ),
      },
      {
        key: 'security',
        title: 'Data Security',
        content: (
          <ul className="text-[15px] text-gray-700 space-y-2">
            {[
              'Using encryption for sensitive data (e.g., payment information).',
              'Regularly updating our security practices.',
              'Limiting access to personal information to authorized personnel only.',
              'However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.',
            ].map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        ),
      },
      {
        key: 'cookies',
        title: 'Cookies and Tracking Technologies',
        content: (
          <ul className="text-[15px] text-gray-700 space-y-2">
            <li>
              We use cookies and similar tracking technologies to enhance your experience on our
              Website. Cookies are small files stored on your device that help us remember your
              preferences and track usage patterns.
            </li>
            <li>
              You can disable cookies through your browser settings, but this may affect the
              functionality of the Website.
            </li>
          </ul>
        ),
      },
    ],
  },
  {
    category: 'Additional Terms',
    items: [
      {
        key: 'thirdParty',
        title: 'Third-Party Links',
        content: (
          <ul className="text-[15px] text-gray-700 space-y-2">
            <li>
              Our Website may contain links to third-party websites. We are not responsible for the
              privacy practices or content of these websites. We encourage you to review the privacy
              policies of any third-party sites you visit.
            </li>
          </ul>
        ),
      },
      {
        key: 'children',
        title: "Children's Privacy",
        content: (
          <ul className="text-[15px] text-gray-700 space-y-2">
            <li>
              Our Website is not intended for use by individuals under the age of 7. We do not
              knowingly collect personal information from children under 7. If we become aware that
              we have collected such information, we will take steps to delete it.
            </li>
          </ul>
        ),
      },
      {
        key: 'rights',
        title: 'Your Rights and Choices',
        content: (
          <ul className="text-[15px] text-gray-700 space-y-2">
            <li>
              <b>Access:</b> You can request a copy of the personal information we hold about you.
            </li>
            <li>
              <b>Correction:</b> You can update or correct your personal information through your
              account settings or by contacting us.
            </li>
            <li>
              <b>Deletion:</b> You can request that we delete your personal information, subject to
              certain legal obligations.
            </li>
            <li>
              <b>Opt-Out:</b> You can opt out of receiving promotional emails by following the
              unsubscribe link in the email.
            </li>
            <li>
              To exercise these rights, please contact us at{' '}
              <a href="mailto:info@kirjaswappi.fi" className="underline">
                info@kirjaswappi.fi
              </a>
              .
            </li>
          </ul>
        ),
      },
      {
        key: 'international',
        title: 'International Users',
        content: (
          <ul className="text-[15px] text-gray-700 space-y-2">
            <li>
              If you are accessing the Website from outside Finland, please note that your
              information may be transferred to, stored, and processed in Finland, where our servers
              are located. By using the Website, you consent to this transfer and processing.
            </li>
          </ul>
        ),
      },
      {
        key: 'changes',
        title: 'Changes to This Privacy Policy',
        content: (
          <ul className="text-[15px] text-gray-700 space-y-2">
            <li>
              We may update this Privacy Policy from time to time. Any changes will be posted on
              this page with an updated &quot;Last Updated&quot; date. We encourage you to review
              this policy periodically to stay informed about how we are protecting your
              information.
            </li>
          </ul>
        ),
      },
    ],
  },
];
