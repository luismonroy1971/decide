
import React from 'react';
import { BlogPost } from '../types';

interface BlogSectionProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({ posts, onSelectPost }) => {
  return (
    <section id="blog" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-900">Nuestro Blog</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Te informamos y educamos para que tomes la mejor decisión.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden group">
              <div className="overflow-hidden">
                <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"/>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-blue-900 mb-3">{post.title}</h3>
                <p className="text-slate-600 text-sm mb-4">{post.summary}</p>
                <a href="#" onClick={(e) => { e.preventDefault(); onSelectPost(post); }} className="font-semibold text-brand-accent-600 hover:text-brand-accent-500 transition-colors">Leer más &rarr;</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
