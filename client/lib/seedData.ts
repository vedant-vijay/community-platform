import { collection, addDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

const sampleUsers = [
  {
    uid: 'user1',
    name: 'Alex Thompson',
    email: 'alex@example.com',
    bio: 'Full-stack developer passionate about creating innovative solutions. Love working with React, Node.js, and cloud technologies. Always learning and sharing knowledge with the community.'
  },
  {
    uid: 'user2',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    bio: 'Product Manager with 8+ years of experience in tech startups. Helping teams build products that users love. Advocate for user-centered design and data-driven decisions.'
  },
  {
    uid: 'user3',
    name: 'Marcus Johnson',
    email: 'marcus@example.com',
    bio: 'UI/UX Designer crafting beautiful and intuitive digital experiences. Specialized in mobile app design and user research. Coffee enthusiast and design system advocate.'
  },
  {
    uid: 'user4',
    name: 'Emily Rodriguez',
    email: 'emily@example.com',
    bio: 'Data Scientist turning complex data into actionable insights. Expertise in machine learning, Python, and data visualization. Passionate about using data to solve real-world problems.'
  },
  {
    uid: 'user5',
    name: 'David Kim',
    email: 'david@example.com',
    bio: 'DevOps Engineer automating and optimizing development workflows. Expert in AWS, Docker, and Kubernetes. Believer in continuous integration and deployment best practices.'
  }
];

const samplePosts = [
  {
    content: "Just launched our new mobile app! 🚀 It's been an incredible journey working with an amazing team. The app focuses on helping remote teams stay connected and productive. Can't wait to see how the community uses it!",
    authorId: 'user1',
    authorName: 'Alex Thompson'
  },
  {
    content: "Great discussion at today's product strategy meeting! We're implementing user feedback from our latest feature release. It's amazing how much insight we can gain from listening to our users. Building in public really works! 💡",
    authorId: 'user2',
    authorName: 'Sarah Chen'
  },
  {
    content: "Working on a new design system for our company. The goal is to create consistent, accessible, and beautiful components that our entire team can use. Design systems are truly game-changers for product development! 🎨",
    authorId: 'user3',
    authorName: 'Marcus Johnson'
  },
  {
    content: "Fascinating insights from our latest A/B test results! Our new onboarding flow increased user retention by 23%. Data-driven decisions really make a difference. Always test your assumptions! 📊",
    authorId: 'user4',
    authorName: 'Emily Rodriguez'
  },
  {
    content: "Successfully migrated our entire infrastructure to Kubernetes! The deployment process is now 3x faster and much more reliable. The learning curve was steep, but totally worth it. DevOps automation FTW! ⚙️",
    authorId: 'user5',
    authorName: 'David Kim'
  },
  {
    content: "Attended an amazing conference on emerging web technologies today. The keynote on WebAssembly was mind-blowing! The future of web development looks incredibly exciting. Can't wait to experiment with these new tools! 🌐",
    authorId: 'user1',
    authorName: 'Alex Thompson'
  },
  {
    content: "Mentoring junior developers has been one of the most rewarding parts of my career. Seeing them grow and solve complex problems independently is just incredible. The tech community is amazing! 👥",
    authorId: 'user2',
    authorName: 'Sarah Chen'
  },
  {
    content: "User research session revealed some surprising insights about how people interact with our interface. Sometimes what we think is intuitive isn't always the case. User testing saves the day again! 🔍",
    authorId: 'user3',
    authorName: 'Marcus Johnson'
  },
  {
    content: "Machine learning model deployment was successful! Our recommendation engine is now serving personalized content to over 100k users. The impact on engagement metrics has been phenomenal. AI is transforming everything! 🤖",
    authorId: 'user4',
    authorName: 'Emily Rodriguez'
  },
  {
    content: "Implemented automated testing for our CI/CD pipeline. Build failures are now caught instantly, and deployments are rock solid. Automation isn't just about efficiency—it's about confidence and reliability! ✅",
    authorId: 'user5',
    authorName: 'David Kim'
  }
];

export async function seedDatabase() {
  try {
    console.log('Starting to seed database...');

    // Add sample users
    for (const user of sampleUsers) {
      await setDoc(doc(db, 'users', user.uid), user);
      console.log(`Added user: ${user.name}`);
    }

    // Add sample posts with current timestamp
    for (const post of samplePosts) {
      await addDoc(collection(db, 'posts'), {
        ...post,
        createdAt: serverTimestamp()
      });
      console.log(`Added post by: ${post.authorName}`);
    }

    console.log('Database seeding completed successfully!');
    return true;
  } catch (error) {
    console.error('Error seeding database:', error);
    return false;
  }
}
