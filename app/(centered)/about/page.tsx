import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Nick Treffiletti and his work in platform architecture and engineering.',
};

export default function AboutPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>About Nick Treffiletti</h1>
      
      <p>
        I&apos;m a platform architect and engineering leader with a passion for building 
        developer platforms, cloud-native infrastructure, and scalable systems.
      </p>
      
      <p>
        My work focuses on creating opinionated solutions for complex technical challenges, 
        particularly in the areas of:
      </p>
      
      <ul>
        <li>Platform architecture and design</li>
        <li>Developer experience and tooling</li>
        <li>Cloud-native operations</li>
        <li>Infrastructure automation</li>
      </ul>
      
      <p>
        Through this blog, I share insights, lessons learned, and opinionated takes 
        on the evolving landscape of platform engineering.
      </p>
      
      <h2>Connect</h2>
      
      <p>
        You can find me on{' '}
        <a href="https://linkedin.com/in/nicktreffiletti" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        ,{' '}
        <a href="https://github.com/treffiletti" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        , or{' '}
        <a href="https://medium.com/@newyorknick" target="_blank" rel="noopener noreferrer">
          Medium
        </a>
        .
      </p>
    </div>
  );
}
