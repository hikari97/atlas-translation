export interface LegalSection {
  readonly heading: string;
  readonly paragraphs: readonly string[];
}

export interface LegalDocument {
  readonly description: string;
  readonly lastUpdated: string;
  readonly sections: readonly LegalSection[];
  readonly title: string;
}

export const PRIVACY_POLICY: LegalDocument = {
  title: 'Privacy Policy',
  description: 'How Atlas Studio handles account information, uploaded images, and browser storage.',
  lastUpdated: 'August 13, 2026',
  sections: [
    {
      heading: 'Scope',
      paragraphs: [
        'This Privacy Policy explains how Atlas Studio handles information when you create an account, use the image translation editor, or access the website.',
      ],
    },
    {
      heading: 'Information we handle',
      paragraphs: [
        'Account registration requires a name, email address, and password. Passwords are stored as hashes rather than readable text. The service also handles the images, language choices, prompts, and editing context you submit for translation.',
        'The browser stores your authentication token and basic account profile in local storage so you can remain signed in and access protected features.',
      ],
    },
    {
      heading: 'How images are processed',
      paragraphs: [
        'The stateless image editor receives an uploaded image in memory, forwards the image and translation instructions to the AI provider selected in the editor, and returns translated and inpainted results to your browser. This workflow does not create a project or image-library record.',
        'Selected AI providers and hosting infrastructure may process request data under their own terms and retention practices. Do not upload material you are not permitted to share with those providers.',
      ],
    },
    {
      heading: 'How information is used',
      paragraphs: [
        'Information is used to authenticate accounts, operate image translation and inpainting, return results, protect the service, and diagnose failed requests. Atlas Studio does not use the current website to serve behavioural advertising.',
      ],
    },
    {
      heading: 'Sharing and disclosure',
      paragraphs: [
        'Image content and instructions are shared with the AI provider you select because that processing is necessary to produce the requested result. Information may also be disclosed when required by law or when reasonably necessary to protect users, the service, or others.',
      ],
    },
    {
      heading: 'Retention and your choices',
      paragraphs: [
        'Account information remains in the account database while the account is active. Stateless image inputs and generated results are not intentionally added to a permanent Atlas Studio image archive. Your browser keeps the local authentication token and profile until you sign out, clear site data, or the token expires.',
        'You can avoid image processing by not uploading an image, choose which available AI provider receives an image, download results to your device, and clear local browser data at any time.',
      ],
    },
    {
      heading: 'Security and policy changes',
      paragraphs: [
        'Atlas Studio uses reasonable technical measures designed to protect account and request data, but no online service can guarantee absolute security. This policy may be updated as the service, providers, or legal requirements change. The date above identifies the current version.',
      ],
    },
  ],
};

export const TERMS_AND_CONDITIONS: LegalDocument = {
  title: 'Terms and Conditions',
  description: 'The rules that apply when you access and use Atlas Studio.',
  lastUpdated: 'August 13, 2026',
  sections: [
    {
      heading: 'Agreement',
      paragraphs: [
        'By creating an account or using Atlas Studio, you agree to these Terms and Conditions. If you do not agree, do not use the service.',
      ],
    },
    {
      heading: 'The service',
      paragraphs: [
        'Atlas Studio provides tools for image text detection, translation, inpainting, editing, and download. Features, supported providers, model availability, and usage limits may change as the service develops.',
      ],
    },
    {
      heading: 'Accounts',
      paragraphs: [
        'You must provide accurate registration information and keep your credentials secure. You are responsible for activity performed through your account and should sign out or clear local site data on shared devices.',
      ],
    },
    {
      heading: 'Your content',
      paragraphs: [
        'You retain any rights you hold in images and other content you submit. You grant Atlas Studio the limited permission needed to transmit, process, transform, and return that content for the feature you request.',
        'You must have the rights and permissions required to upload and process your content. You are responsible for reviewing downloaded results before publishing or distributing them.',
      ],
    },
    {
      heading: 'Acceptable use',
      paragraphs: [
        'You may not use the service to violate law, infringe intellectual-property or privacy rights, distribute malicious material, bypass access controls, disrupt the service, or submit content that you are not authorised to process.',
      ],
    },
    {
      heading: 'AI-generated results',
      paragraphs: [
        'Translations, detected text, colour estimates, inpainting, and other generated results may be inaccurate or incomplete. Results are provided as editing assistance and must not be treated as professional, legal, medical, or other expert advice.',
      ],
    },
    {
      heading: 'Availability and third-party providers',
      paragraphs: [
        'Some features depend on third-party AI providers and infrastructure. Atlas Studio does not control their availability, output, or separate terms. The service may be modified, suspended, or limited for maintenance, security, provider changes, or misuse.',
      ],
    },
    {
      heading: 'Disclaimers and liability',
      paragraphs: [
        'To the extent permitted by applicable law, the service is provided without warranties of uninterrupted availability, error-free output, or fitness for a particular purpose. Atlas Studio is not responsible for decisions, publications, losses, or claims arising from unreviewed AI output or content submitted without permission.',
      ],
    },
    {
      heading: 'Changes to these terms',
      paragraphs: [
        'These terms may be updated when the service or applicable requirements change. Continued use after an updated version becomes effective means you accept the revised terms.',
      ],
    },
  ],
};

export const COOKIE_POLICY: LegalDocument = {
  title: 'Cookie Policy',
  description: 'How Atlas Studio uses browser storage and whether the website sets cookies.',
  lastUpdated: 'August 13, 2026',
  sections: [
    {
      heading: 'Current cookie use',
      paragraphs: [
        'Atlas Studio does not currently set first-party cookies for authentication, analytics, or advertising. This policy also explains similar browser storage used by the application.',
      ],
    },
    {
      heading: 'Local storage',
      paragraphs: [
        'After login or registration, Atlas Studio stores an authentication token and basic account profile in your browser local storage. This storage is necessary to keep you signed in and make authenticated requests. Unlike a cookie, local-storage data is not automatically attached to every browser request.',
      ],
    },
    {
      heading: 'Analytics and advertising',
      paragraphs: [
        'The current website does not include behavioural advertising cookies or third-party analytics cookies. Requests sent to external AI providers are server-side processing requests rather than browser tracking cookies.',
      ],
    },
    {
      heading: 'Managing stored data',
      paragraphs: [
        'Signing out removes Atlas Studio authentication data through the application. You can also remove local storage and any future cookies using your browser settings. Clearing this data will sign you out and may reset browser-only preferences.',
      ],
    },
    {
      heading: 'Policy changes',
      paragraphs: [
        'If Atlas Studio introduces cookies or additional browser storage, this policy will be updated to describe their purpose and available controls. The date above identifies the current version.',
      ],
    },
  ],
};
