import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Search,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// --- Types ---
interface PostMetadata {
  title: string;
  date: string;
  category: 'project' | 'photo';
  tags?: string[];
  description?: string;
  link?: string;
  thumbnail?: string;
  image?: string;
}

interface Post extends PostMetadata {
  id: string;
  content: string;
}

// --- Translations ---
const translations = {
  ko: {
    description: "VRChat과 관련된 개인 기록과 프로젝트를 정리합니다. ✨",
    search: "검색...",
    viewDetail: "상세 보기",
    footer: "© 2026 nupamo. Built with React & Pamomo. ✨",
  },
  en: {
    description: "Organizing personal records and projects related to VRChat. ✨",
    search: "Search...",
    viewDetail: "View Detail",
    footer: "© 2026 nupamo. Built with React & Pamomo. ✨",
  },
  jp: {
    description: "VRChatに関連する個人の記録とプロジェクトを整理しています。 ✨",
    search: "検索...",
    viewDetail: "詳細を見る",
    footer: "© 2026 nupamo. Built with React & Pamomo. ✨",
  }
};

type Language = keyof typeof translations;

// --- Utils ---
const parseMarkdown = (filename: string, raw: string): Post => {
  const match = raw.match(/^---([\s\S]*?)---([\s\S]*)$/);
  if (!match) return { id: filename, title: filename, date: '', category: 'project', content: raw };

  const frontmatter = match[1];
  const content = match[2].trim();

  const metadata: any = {};
  frontmatter.split('\n').forEach(line => {
    const [key, ...values] = line.split(':');
    if (key && values.length > 0) {
      const val = values.join(':').trim().replace(/^"(.*)"$/, '$1');
      if (key.trim() === 'tags') {
        metadata[key.trim()] = val.replace(/[\[\]]/g, '').split(',').map(t => t.trim());
      } else {
        metadata[key.trim()] = val;
      }
    }
  });

  return {
    id: filename.split('/').pop()?.replace('.md', '') || filename,
    ...metadata,
    content
  };
};

// --- Components ---
export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'project' | 'photo'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [lang] = useState<Language>(() => {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'ko') return 'ko';
    if (browserLang === 'ja') return 'jp';
    return 'en';
  });

  const t = translations[lang];

  useEffect(() => {
    // Vite's magic to import all md files in src/content
    const modules = import.meta.glob('./content/*.md', { query: '?raw', import: 'default' });

    const loadPosts = async () => {
      const loadedPosts: Post[] = [];
      for (const path in modules) {
        const rawContent = await modules[path]() as string;
        loadedPosts.push(parseMarkdown(path, rawContent));
      }
      // Sort by date descending
      setPosts(loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    };

    loadPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesTab = activeTab === 'all' || post.category === activeTab;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTab && matchesSearch;
    });
  }, [posts, activeTab, searchQuery]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 relative">
      {/* --- Profile Section --- */}
      <header className="flex flex-col md:flex-row items-center gap-8 mb-16 md:mb-24">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/20 p-1 bg-surface">
            <img
              src="/profile.jpg"
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </motion.div>

        <div className="text-center md:text-left">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-white neon-glow"
          >
            nupamo
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 leading-relaxed mb-6"
          >
            {t.description}
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center md:justify-start gap-4"
          >
            {/* <a href="https://github.com/nupamo" target="_blank" className="flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-white/10 transition-all text-sm font-bold text-slate-300">
              <ExternalLink size={16} /> GitHub
            </a> */}
            <a href="https://x.com/nupamo" target="_blank" className="flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-white/10 transition-all text-sm font-bold text-slate-300">
              <ExternalLink size={16} /> Twitter
            </a>
          </motion.div>
        </div>
      </header>

      {/* --- Filter & Search --- */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-8">
          <div className="flex bg-surface/50 p-1 rounded-2xl glass w-full md:w-auto">
            {(['all', 'project', 'photo'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 md:flex-none px-6 cursor-pointer py-2 rounded-xl text-sm font-black transition-all capitalize ${activeTab === tab ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:text-slate-300'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface/50 border border-white/5 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-all text-sm"
            />
          </div>
        </div>

        {/* --- List Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.4,
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
                onClick={() => {
                  if (post.link) {
                    window.open(post.link, '_blank', 'noopener,noreferrer');
                  } else {
                    setSelectedPost(post);
                  }
                }}
                className="group glass rounded-3xl overflow-hidden cursor-pointer hover:border-primary/30 transition-colors flex flex-col h-full"
              >
                {post.category === 'photo' && post.image ? (
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                ) : post.thumbnail ? (
                  <div className="aspect-video overflow-hidden">
                    <img src={post.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                ) : null}

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${post.category === 'project' ? 'bg-blue-500/10 text-blue-400' :
                      'bg-purple-500/10 text-purple-400'
                      }`}>
                      {t[post.category]}
                    </span>
                    <span className="text-[10px] text-slate-600 font-mono">{post.date}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">{post.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">{post.description}</p>

                  <div className="mt-auto flex flex-wrap gap-2">
                    {post.tags?.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] text-slate-600 bg-white/5 px-2 py-1 rounded-md italic">#{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="mt-24 pt-12 border-t border-white/5 text-center">
        <p className="text-slate-600 text-xs font-mono">{t.footer}</p>
      </footer>

      {/* --- Detail Modal --- */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-900 w-full max-w-2xl rounded-[2.5rem] border border-white/10 overflow-hidden relative z-10 max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {selectedPost.image ? (
                <div className="w-full h-64 md:h-80 overflow-hidden">
                  <img src={selectedPost.image} className="w-full h-full object-cover" />
                </div>
              ) : selectedPost.thumbnail ? (
                <div className="w-full h-64 overflow-hidden border-b border-white/5">
                  <img src={selectedPost.thumbnail} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="h-24 blue-gradient opacity-20" />
              )}

              <div className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px]">{t[selectedPost.category]}</span>
                  <div className="w-1 h-1 bg-slate-700 rounded-full" />
                  <span className="text-slate-500 font-mono text-[10px]">{selectedPost.date}</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-black mb-8 leading-tight text-white">{selectedPost.title}</h2>

                <div className="prose prose-invert max-w-none mb-10 text-slate-300 leading-relaxed">
                  <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5">
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags?.map(tag => (
                      <span key={tag} className="text-xs text-primary/70 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">#{tag}</span>
                    ))}
                  </div>

                  {selectedPost.link && (
                    <a
                      href={selectedPost.link}
                      target="_blank"
                      className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/30"
                    >
                      {t.viewDetail} <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
