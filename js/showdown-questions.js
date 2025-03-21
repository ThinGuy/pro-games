/**
 * Questions database for Ubuntu Pro Showdown trivia game
 * 
 * Each question includes:
 * - text: The question text
 * - category: Category of the question (Ubuntu Pro Fundamentals, Security & Compliance, etc.)
 * - difficulty: easy, medium, or hard
 * - answers: Array of possible answers
 * - correctIndex: Index of the correct answer (0-based)
 * - knowledge: Text for the knowledge card shown after answering
 * - learnMoreUrl: Optional URL for the "Learn More" button
 */

const QUESTION_CATEGORIES = {
  FUNDAMENTALS: 'Ubuntu Pro Fundamentals',
  SECURITY: 'Security & Compliance',
  DEPLOYMENT: 'Deployment & Management',
  LICENSING: 'Open Source Licensing'
};

const DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
};

const questions = [
  // Ubuntu Pro Fundamentals - Easy
  {
    text: 'What is Ubuntu Pro?',
    category: QUESTION_CATEGORIES.FUNDAMENTALS,
    difficulty: DIFFICULTY.EASY,
    answers: [
      'A premium set of entitlements including extended security and support for Ubuntu',
      'A specialized version of Ubuntu for programming',
      'A cloud-only version of Ubuntu',
      'A new name for Ubuntu Server'
    ],
    correctIndex: 0,
    knowledge: 'Ubuntu Pro is a premium set of entitlements that provides security patches, compliance tools, and extended support for up to 12 years, without requiring reinstallation.',
    learnMoreUrl: 'https://ubuntu.com/pro'
  },
  {
    text: 'Do you need to reinstall or redeploy Ubuntu to get Ubuntu Pro?',
    category: QUESTION_CATEGORIES.FUNDAMENTALS,
    difficulty: DIFFICULTY.EASY,
    answers: [
      'Yes, you need to download a special Ubuntu Pro ISO',
      'No, you can apply a subscription token to any Ubuntu LTS installation',
      'Yes, but only for server installations',
      'No, but you need to upgrade to the latest LTS first'
    ],
    correctIndex: 1,
    knowledge: 'You do not need to reinstall Ubuntu to get Ubuntu Pro. You can simply apply your subscription token to any existing Ubuntu LTS installation using the "pro attach" command.',
    learnMoreUrl: 'https://ubuntu.com/pro'
  },
  {
    text: 'How long does Ubuntu Pro provide security maintenance for Ubuntu LTS releases?',
    category: QUESTION_CATEGORIES.FUNDAMENTALS,
    difficulty: DIFFICULTY.EASY,
    answers: [
      '5 years',
      '10 years',
      '3 years',
      'Up to 12 years with Pro Legacy'
    ],
    correctIndex: 3,
    knowledge: 'Ubuntu Pro extends security maintenance up to 12 years with Pro Legacy support (standard LTS is 5 years, regular Pro is 10 years).',
    learnMoreUrl: 'https://ubuntu.com/pro'
  },
  {
    text: 'True or False: Ubuntu Pro is available free of charge for personal use on up to 5 machines.',
    category: QUESTION_CATEGORIES.FUNDAMENTALS,
    difficulty: DIFFICULTY.EASY,
    answers: [
      'True',
      'False'
    ],
    correctIndex: 0,
    knowledge: 'Ubuntu Pro is indeed available for free for personal use on up to 5 physical or virtual machines.',
    learnMoreUrl: 'https://ubuntu.com/pro/dashboard'
  },
  {
    text: 'Which of the following is included in Ubuntu Pro?',
    category: QUESTION_CATEGORIES.FUNDAMENTALS,
    difficulty: DIFFICULTY.EASY,
    answers: [
      'Custom desktop themes',
      'Livepatch',
      'Proprietary video drivers only',
      'Ubuntu One cloud storage'
    ],
    correctIndex: 1,
    knowledge: 'Livepatch is included in Ubuntu Pro, allowing you to apply critical kernel patches without rebooting your system.',
    learnMoreUrl: 'https://ubuntu.com/security/livepatch'
  },
  {
    text: 'What does ESM stand for in the context of Ubuntu Pro?',
    category: QUESTION_CATEGORIES.FUNDAMENTALS,
    difficulty: DIFFICULTY.EASY,
    answers: [
      'Enhanced System Management',
      'Extended Security Maintenance',
      'External Software Module',
      'Enterprise Storage Mechanism'
    ],
    correctIndex: 1,
    knowledge: 'ESM stands for Extended Security Maintenance, which provides continued security updates after the standard support window ends.',
    learnMoreUrl: 'https://ubuntu.com/security/esm'
  },

  // Ubuntu Pro Fundamentals - Medium
  {
    text: 'Which compliance framework is supported by Ubuntu Pro?',
    category: QUESTION_CATEGORIES.FUNDAMENTALS,
    difficulty: DIFFICULTY.MEDIUM,
    answers: [
      'ISO 9001',
      'FIPS 140-2',
      'SOC 2 Type III',
      'CMMI Level 5'
    ],
    correctIndex: 1,
    knowledge: 'Ubuntu Pro includes FIPS 140-2 certified cryptographic modules, essential for organizations working with U.S. government agencies.',
    learnMoreUrl: 'https://ubuntu.com/security/certifications'
  },
  {
    text: 'What is Livepatch used for in Ubuntu Pro?',
    category: QUESTION_CATEGORIES.FUNDAMENTALS,
    difficulty: DIFFICULTY.MEDIUM,
    answers: [
      'Automatically updating desktop applications',
      'Applying kernel security patches without rebooting',
      'Scanning for security vulnerabilities',
      'Backing up critical system files'
    ],
    correctIndex: 1,
    knowledge: 'Livepatch applies critical kernel security patches without requiring a system reboot, helping maintain high availability.',
    learnMoreUrl: 'https://ubuntu.com/security/livepatch'
  },
  {
    text: 'Which of the following Ubuntu releases can be upgraded to Ubuntu Pro?',
    category: QUESTION_CATEGORIES.FUNDAMENTALS,
    difficulty: DIFFICULTY.MEDIUM,
    answers: [
      'Only the most recent Ubuntu release',
      'Any currently supported Ubuntu LTS release',
      'Only Ubuntu 18.04 and newer',
      'Any version of Ubuntu including non-LTS releases'
    ],
    correctIndex: 1,
    knowledge: 'Any currently supported Ubuntu LTS (Long Term Support) release can be upgraded to Ubuntu Pro.',
    learnMoreUrl: 'https://ubuntu.com/pro'
  },

  // Ubuntu Pro Fundamentals - Hard
  {
    text: 'Which of the following is NOT included in Ubuntu Pro for free personal use?',
    category: QUESTION_CATEGORIES.FUNDAMENTALS,
    difficulty: DIFFICULTY.HARD,
    answers: [
      'FIPS compliance modules',
      'Technical support',
      'Livepatch',
      'Extended Security Maintenance'
    ],
    correctIndex: 1,
    knowledge: 'While Ubuntu Pro includes many features for free personal use, technical support requires a paid subscription.',
    learnMoreUrl: 'https://ubuntu.com/pro'
  },
  {
    text: 'What happens if an Ubuntu Pro subscription expires?',
    category: QUESTION_CATEGORIES.FUNDAMENTALS,
    difficulty: DIFFICULTY.HARD,
    answers: [
      'The system becomes completely unsupported',
      'The system automatically reverts to the previous Ubuntu version',
      'All Ubuntu Pro packages are automatically removed',
      'You lose access to Ubuntu Pro services but your system continues to function with standard Ubuntu support'
    ],
    correctIndex: 3,
    knowledge: 'When an Ubuntu Pro subscription expires, you lose access to Pro services, but your system continues to function with standard Ubuntu support.',
    learnMoreUrl: 'https://ubuntu.com/pro'
  },

  // Security & Compliance - Easy
  {
    text: 'What is CIS in the context of Ubuntu Pro?',
    category: QUESTION_CATEGORIES.SECURITY,
    difficulty: DIFFICULTY.EASY,
    answers: [
      'Canonical Infrastructure Service',
      'Center for Internet Security',
      'Corporate Information System',
      'Critical Installation Software'
    ],
    correctIndex: 1,
    knowledge: 'CIS (Center for Internet Security) provides security benchmarks and hardening guidelines that Ubuntu Pro helps implement.',
    learnMoreUrl: 'https://ubuntu.com/security/certifications/docs/usg'
  },
  {
    text: 'True or False: Ubuntu Pro includes the ability to apply security patches to the running kernel without rebooting.',
    category: QUESTION_CATEGORIES.SECURITY,
    difficulty: DIFFICULTY.EASY,
    answers: [
      'True',
      'False'
    ],
    correctIndex: 0,
    knowledge: 'This is true — Ubuntu Pro includes Livepatch, which allows kernel security patches to be applied without rebooting the system.',
    learnMoreUrl: 'https://ubuntu.com/security/livepatch'
  },
  {
    text: 'Which Ubuntu Pro feature helps organizations meet government security requirements?',
    category: QUESTION_CATEGORIES.SECURITY,
    difficulty: DIFFICULTY.EASY,
    answers: [
      'Desktop customization',
      'FIPS certification',
      'Software store curation',
      'Hardware optimization'
    ],
    correctIndex: 1,
    knowledge: 'FIPS (Federal Information Processing Standards) certification helps organizations meet U.S. government security requirements.',
    learnMoreUrl: 'https://ubuntu.com/security/certifications/docs/fips'
  },

  // Security & Compliance - Medium
  {
    text: 'What is a DISA STIG?',
    category: QUESTION_CATEGORIES.SECURITY,
    difficulty: DIFFICULTY.MEDIUM,
    answers: [
      'Digital Information Security Application',
      'Security configuration guidelines developed by the Defense Information Systems Agency',
      'Distributed Infrastructure Security Agreement',
      'Desktop Intrusion Scanning and Auditing Tool'
    ],
    correctIndex: 1,
    knowledge: 'DISA STIGs are Security Technical Implementation Guides developed by the Defense Information Systems Agency for securing information systems.',
    learnMoreUrl: 'https://ubuntu.com/security/certifications/docs/disa-stig'
  },
  {
    text: 'Which component of Ubuntu Pro helps with automated security compliance scanning?',
    category: QUESTION_CATEGORIES.SECURITY,
    difficulty: DIFFICULTY.MEDIUM,
    answers: [
      'Snapcraft',
      'Landscape',
      'AppArmor',
      'Canonical Livepatch'
    ],
    correctIndex: 1,
    knowledge: 'Landscape helps with automated security compliance scanning, allowing you to monitor and manage multiple Ubuntu systems.',
    learnMoreUrl: 'https://landscape.canonical.com/'
  },

  // Security & Compliance - Hard
  {
    text: 'What is the difference between the CIS and DISA STIG hardening profiles in Ubuntu Pro?',
    category: QUESTION_CATEGORIES.SECURITY,
    difficulty: DIFFICULTY.HARD,
    answers: [
      'CIS is industry-focused while DISA STIG is specifically for U.S. Department of Defense systems',
      'CIS is for desktop systems while DISA STIG is for servers',
      'CIS is proprietary while DISA STIG is open source',
      'CIS focuses on network security while DISA STIG focuses on application security'
    ],
    correctIndex: 0,
    knowledge: 'CIS benchmarks are industry-standard security configurations, while DISA STIGs are specifically designed for U.S. Department of Defense systems.',
    learnMoreUrl: 'https://ubuntu.com/security/certifications'
  },
  {
    text: 'True or False: Ubuntu Pro\'s FIPS certification means that all software running on the system is automatically FIPS compliant.',
    category: QUESTION_CATEGORIES.SECURITY,
    difficulty: DIFFICULTY.HARD,
    answers: [
      'True',
      'False'
    ],
    correctIndex: 1,
    knowledge: 'This is false. Only the cryptographic modules are FIPS certified, not all software running on the system.',
    learnMoreUrl: 'https://ubuntu.com/security/certifications/docs/fips'
  },

  // Deployment & Management - Easy
  {
    text: 'How do you check if a system is using Ubuntu Pro?',
    category: QUESTION_CATEGORIES.DEPLOYMENT,
    difficulty: DIFFICULTY.EASY,
    answers: [
      'Check System Settings',
      'Run pro status in the terminal',
      'Look for the Pro icon on the desktop',
      'Run apt list ubuntu-pro'
    ],
    correctIndex: 1,
    knowledge: 'The command "pro status" in the terminal will show you if a system is using Ubuntu Pro and what services are enabled.',
    learnMoreUrl: 'https://ubuntu.com/pro/dashboard'
  },
  {
    text: 'True or False: You need to reinstall Ubuntu to get Ubuntu Pro.',
    category: QUESTION_CATEGORIES.DEPLOYMENT,
    difficulty: DIFFICULTY.EASY,
    answers: [
      'True',
      'False'
    ],
    correctIndex: 1,
    knowledge: 'False. You can enable Ubuntu Pro on existing Ubuntu LTS installations without reinstalling.',
    learnMoreUrl: 'https://ubuntu.com/pro'
  },
  {
    text: 'How do you enable Ubuntu Pro on an existing Ubuntu LTS system?',
    category: QUESTION_CATEGORIES.DEPLOYMENT,
    difficulty: DIFFICULTY.EASY,
    answers: [
      'Reinstall the system with the Pro ISO',
      'Use the pro attach command with your token',
      'Run the Ubuntu Pro installer package',
      'Change repositories to Pro in sources.list'
    ],
    correctIndex: 1,
    knowledge: 'You can enable Ubuntu Pro on an existing Ubuntu LTS system using the "pro attach" command followed by your subscription token.',
    learnMoreUrl: 'https://ubuntu.com/pro'
  },

  // Deployment & Management - Medium
  {
    text: 'True or False: Ubuntu Pro can be deployed in air-gapped environments.',
    category: QUESTION_CATEGORIES.DEPLOYMENT,
    difficulty: DIFFICULTY.MEDIUM,
    answers: [
      'True',
      'False'
    ],
    correctIndex: 0,
    knowledge: 'True, Ubuntu Pro can be deployed in air-gapped environments using offline methods.',
    learnMoreUrl: 'https://discourse.ubuntu.com/t/ubuntu-pro-faq/34042'
  },
  {
    text: 'What is Landscape in the context of Ubuntu Pro?',
    category: QUESTION_CATEGORIES.DEPLOYMENT,
    difficulty: DIFFICULTY.MEDIUM,
    answers: [
      'A web-based control panel for desktop customization',
      'A systems management tool for managing multiple Ubuntu systems',
      'A VM management interface',
      'A container orchestration platform'
    ],
    correctIndex: 1,
    knowledge: 'Landscape is a systems management tool that allows you to manage, monitor, and update multiple Ubuntu systems efficiently.',
    learnMoreUrl: 'https://landscape.canonical.com/'
  },

  // Deployment & Management - Hard
  {
    text: 'What is the correct command to enable FIPS mode on Ubuntu Pro?',
    category: QUESTION_CATEGORIES.DEPLOYMENT,
    difficulty: DIFFICULTY.HARD,
    answers: [
      'sudo apt install fips',
      'sudo pro enable fips',
      'sudo pro fips-enable',
      'sudo pro compliance --enable=fips'
    ],
    correctIndex: 1,
    knowledge: 'The correct command to enable FIPS mode on an Ubuntu Pro system is "sudo pro enable fips".',
    learnMoreUrl: 'https://ubuntu.com/security/certifications/docs/fips'
  },
  {
    text: 'How can you verify that Livepatch is working properly on an Ubuntu Pro system?',
    category: QUESTION_CATEGORIES.DEPLOYMENT,
    difficulty: DIFFICULTY.HARD,
    answers: [
      'Check the system logs for "livepatch" entries',
      'Run canonical-livepatch status',
      'Run pro verify livepatch',
      'Check the Livepatch dashboard in System Settings'
    ],
    correctIndex: 1,
    knowledge: 'You can verify that Livepatch is working properly by running the command "canonical-livepatch status" which shows the current status and patch information.',
    learnMoreUrl: 'https://ubuntu.com/security/livepatch'
  },

  // Open Source Licensing - Easy
  {
    text: 'What is intellectual property?',
    category: QUESTION_CATEGORIES.LICENSING,
    difficulty: DIFFICULTY.EASY,
    answers: [
      'Physical property owned by intellectual organizations',
      'Ownership over something intangible, like ideas, songs, or computer code',
      'Patents only',
      'Products created by AI'
    ],
    correctIndex: 1,
    knowledge: 'Intellectual property refers to ownership over intangible creations like ideas, songs, stories, or computer code.',
    learnMoreUrl: 'https://ubuntu.com/blog/introduction-to-open-source-licensing'
  },
  {
    text: 'True or False: Copyright protection begins automatically when you create something original.',
    category: QUESTION_CATEGORIES.LICENSING,
    difficulty: DIFFICULTY.EASY,
    answers: [
      'True',
      'False'
    ],
    correctIndex: 0,
    knowledge: 'True. Copyright protection begins automatically the moment you create an original work in a fixed form.',
    learnMoreUrl: 'https://ubuntu.com/blog/introduction-to-open-source-licensing'
  },
  {
    text: 'What does a license do in the context of software?',
    category: QUESTION_CATEGORIES.LICENSING,
    difficulty: DIFFICULTY.EASY,
    answers: [
      'Transfers complete ownership to the user',
      'Describes how the copyrighted work can be used',
      'Prevents any copying of the software',
      'Only regulates commercial use'
    ],
    correctIndex: 1,
    knowledge: 'A license is a message from the copyright owner describing how their work can be used by others.',
    learnMoreUrl: 'https://ubuntu.com/blog/introduction-to-open-source-licensing'
  },

  // Open Source Licensing - Medium
  {
    text: 'What is the difference between "free" as in "free speech" and "free" as in "free beer" in the context of software?',
    category: QUESTION_CATEGORIES.LICENSING,
    difficulty: DIFFICULTY.MEDIUM,
    answers: [
      '"Free speech" refers to open source while "free beer" refers to freeware',
      '"Free speech" refers to freedom/liberty while "free beer" refers to price/cost',
      '"Free speech" means you can say what you want while "free beer" means you can do what you want',
      'They are different terms for the same concept'
    ],
    correctIndex: 1,
    knowledge: '"Free as in speech" refers to liberty/freedom (libre), while "free as in beer" refers to zero cost (gratis). Open source software is often free in both senses.',
    learnMoreUrl: 'https://ubuntu.com/blog/introduction-to-open-source-licensing'
  },
  {
    text: 'What is a copyleft license?',
    category: QUESTION_CATEGORIES.LICENSING,
    difficulty: DIFFICULTY.MEDIUM,
    answers: [
      'A license that explicitly rejects copyright law',
      'A license that requires derivative works to also be open source',
      'A license that prevents any copying of software',
      'A license that only applies to graphical works'
    ],
    correctIndex: 1,
    knowledge: 'A copyleft license requires that derivative works also be published under a copyleft license, ensuring that the software remains open source even when modified.',
    learnMoreUrl: 'https://ubuntu.com/blog/introduction-to-open-source-licensing'
  },

  // Open Source Licensing - Hard
  {
    text: 'What is a Contributor License Agreement (CLA)?',
    category: QUESTION_CATEGORIES.LICENSING,
    difficulty: DIFFICULTY.HARD,
    answers: [
      'A license that contributors must purchase',
      'An agreement that gives a project certain rights to use contributions',
      'An agreement that prevents contributors from working on competing projects',
      'A certification that contributors are qualified developers'
    ],
    correctIndex: 1,
    knowledge: 'A Contributor License Agreement (CLA) gives a project certain rights to use contributions, often allowing the project to monetize or change licensing in the future.',
    learnMoreUrl: 'https://ubuntu.com/blog/introduction-to-open-source-licensing'
  },
  {
    text: 'What is the main difference between the GPL and MIT license?',
    category: QUESTION_CATEGORIES.LICENSING,
    difficulty: DIFFICULTY.HARD,
    answers: [
      'GPL is for operating systems while MIT is for applications',
      'GPL requires derivative works to also be open source, while MIT allows inclusion in proprietary software',
      'GPL is free while MIT requires payment',
      'GPL allows commercial use while MIT doesn't'
    ],
    correctIndex: 1,
    knowledge: 'GPL is a copyleft license requiring derivative works to also be open source, while MIT is a permissive license allowing code to be used in proprietary software.',
    learnMoreUrl: 'https://ubuntu.com/blog/introduction-to-open-source-licensing'
  }
];

// Export the questions array and constants for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { questions, QUESTION_CATEGORIES, DIFFICULTY };
}
