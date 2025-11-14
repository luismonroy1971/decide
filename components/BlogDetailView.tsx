
import React from 'react';
import { BlogPost } from '../types';
import Icon from './Icon';

interface BlogDetailViewProps {
  post: BlogPost;
  onBack: () => void;
}

const BlogDetailView: React.FC<BlogDetailViewProps> = ({ post, onBack }) => {
  return (
    <div className="bg-white animate-fade-in pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="flex items-center text-brand-blue-800 font-semibold mb-8 hover:text-brand-accent-600 transition-colors">
            <Icon name="ChevronLeft" className="w-5 h-5 mr-2" />
            Volver al Blog
        </button>
        
        <article className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-brand-blue-900 mb-4">{post.title}</h1>
            <p className="text-lg text-slate-500 mb-8">{post.summary}</p>
            <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover rounded-lg shadow-lg aspect-[16/9] mb-8"/>
            <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </article>
      </div>
    </div>
  );
};

export default BlogDetailView;
