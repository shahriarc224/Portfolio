export const skillGroups = [
  { name: 'Languages', items: ['C', 'C++', 'Java', 'JavaScript', 'TypeScript', 'Python', 'HTML5', 'CSS3'] },
  { name: 'Frameworks & Libraries', items: ['React', 'Next.js', 'Node.js', 'Express', 'Flutter', 'Tailwind CSS', 'Framer Motion'] },
  { name: 'Databases', items: ['MongoDB', 'MySQL', 'PostgreSQL'] },
  { name: 'Tools & Platforms', items: ['Git', 'GitHub', 'Docker', 'Linux', 'Arduino', 'Postman', 'Figma', 'AWS'] },
]

export const journeyEntries = [
  { title: 'Add your milestone', organization: 'Organization or institution', date: 'YEAR — YEAR', description: 'Replace this placeholder with a short description of your experience or achievement.' },
  { title: 'Add your milestone', organization: 'Organization or institution', date: 'YEAR — YEAR', description: 'Add another milestone here. Keep the title, organization, date range, and description concise.' },
  { title: 'Add your milestone', organization: 'Organization or institution', date: 'YEAR — PRESENT', description: 'Use this entry for a current activity, or remove it from the journeyEntries array.' },
]

export const socials = [
  { label: 'Facebook', href: 'https://facebook.com/your-profile' },
  { label: 'Instagram', href: 'https://instagram.com/your-profile' },
  { label: 'WhatsApp', href: 'https://wa.me/0000000000' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/your-profile' },
  { label: 'Discord', href: 'https://discord.com/users/your-id' },
  { label: 'X (Twitter)', href: 'https://x.com/your-profile' },
  { label: 'Reddit', href: 'https://reddit.com/user/your-profile' },
]

export const projects: { title: string; description: string; href: string }[] = []

export const achievements = [
  {
    title: '5th International Robo Tech Olympiad',
    description: 'Awarded 2nd Runner-up in the Project Showcase (Senior Category) at the 5th International Robo Tech Olympiad 2025.',
    status: '2nd Runner-up',
    category: 'Project Showcase · Senior',
    year: '2025',
    images: [
      { src: '/images/achievements/robotech-olympiad-team.jpg', alt: 'Team members with their 2nd Runner-up awards at the 5th International Robo Tech Olympiad' },
      { src: '/images/achievements/robotech-olympiad-award.jpg', alt: 'Award poster for 2nd Runner-up in Project Showcase Senior' },
    ],
  },
  {
    title: 'National Robotics Championship 2025',
    description: 'Placed 3rd Runner-up in the Project Showcase at the National Robotics Championship 2025.',
    status: '3rd Runner-up',
    category: 'Project Showcase',
    year: '2025',
    images: [
      { src: '/images/achievements/national-robotics-championship-2025.jpg', alt: 'Team receiving the 3rd Runner-up award at the National Robotics Championship 2025' },
      { src: '/images/achievements/national-robotics-award-poster.jpg', alt: 'Team holding the National Robotics Championship 2025 third runner-up award' },
    ],
  },
]

export const newsArticle = {
  title: 'আন্তর্জাতিক রোবোটেক অলিম্পিয়াডে বিইউবিটি শিক্ষার্থীদের সাফল্য',
  date: 'June 21, 2025',
  paragraphs: [
    'পঞ্চম আন্তর্জাতিক রোবোটেক অলিম্পিয়াড ২০২৫-এ সাফল্য অর্জন করেছে বাংলাদেশ ইউনিভার্সিটি অব বিজনেস অ্যান্ড টেকনোলজির (বিইউবিটি) শিক্ষার্থীরা। গত ২১ জুন উত্তরা ইউনিভার্সিটি ক্যাম্পাসে অনুষ্ঠিত এ প্রতিযোগিতায় দেশ-বিদেশের মোট সত্তরটি শিক্ষাপ্রতিষ্ঠানের দেড়শোর বেশি দল অংশগ্রহণ করে, যেখানে মোট ১২ ক্যাটাগরিতে প্রতিযোগিতা অনুষ্ঠিত হয়।',
    'বিইউবিটির প্রতিনিধিত্বকারী দল ‘টিম বিইউবিটি’ আইডিয়া কম্পিটিশন ও প্রজেক্ট শোকেস, এই দুটি ক্যাটাগরিতে রানার আপ হয়। আইডিয়া কম্পিটিশন বিভাগে বিইউবিটির টিমের সদস্য ছিলেন আবু হুরাইরা আনসারী তানভীর, রাকিবুল হাসান বিজয়, শাখাওয়াত হোসেন এবং আসিফ আল আমিন। অপরদিকে প্রজেক্ট শোকেস বিভাগে টিম বিইউবিটির সদস্যরা ছিলেন শাখাওয়াত হোসেন, সাকিব চৌধুরী, শাহরিয়ার চৌধুরী, সাব্বির হোসেন এবং সাজেদুল ইসলাম।',
    'বিজয়ী দুটি দল সদস্যরা বিইউবিটির উপাচার্য প্রফেসর ড. এ বি এম শওকত আলীর সাথে সৌজন্য সাক্ষাৎ করে। উপাচার্য শিক্ষার্থীদের এ সাফল্যে আন্তরিক অভিনন্দন ও শুভেচ্ছা জানিয়ে বলেন, এই অর্জন আমাদের শিক্ষা ও প্রযুক্তি চর্চার মানকে এগিয়ে নেবে এবং আশা করি ভবিষ্যতে তারা আরও বড় মঞ্চে বাংলাদেশের মুখ উজ্জ্বল করবে।',
  ],
  publications: [
    { name: 'Somokal', image: '/images/news/somokal.png', alt: 'Somokal news article about BUBT students at the Robo Tech Olympiad', href: 'https://samakal.com/education/article/301784' },
    { name: 'Aker Potrika', image: '/images/news/ajker-potrika.png', alt: 'Ajker Potrika news article about BUBT students at the Robo Tech Olympiad', href: 'https://www.ajkerpatrika.com/education/campus/ajporgtyihtp9' },
  ],
}
