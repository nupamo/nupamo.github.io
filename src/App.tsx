import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Search,
  ArrowLeft,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Routes, Route, useNavigate, useParams, useLocation, useSearchParams } from 'react-router-dom';

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
  draft?: string | boolean;
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
    back: "뒤로 가기"
  },
  en: {
    description: "Organizing personal records and projects related to VRChat. ✨",
    search: "Search...",
    viewDetail: "View Detail",
    footer: "© 2026 nupamo. Built with React & Pamomo. ✨",
    back: "Back"
  },
  jp: {
    description: "VRChatに関連する個人の記録とプロジェクトを整理しています。 ✨",
    search: "検索...",
    viewDetail: "詳細を見る",
    footer: "© 2026 nupamo. Built with React & Pamomo. ✨",
    back: "戻る"
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

function HomePage({ posts, t }: { posts: Post[], t: any }) {
  const [activeTab, setActiveTab] = useState<'all' | 'project' | 'photo'>('all');
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const navigate = useNavigate();

  const handleSearchChange = (val: string) => {
    if (val) {
      setSearchParams({ search: val });
    } else {
      setSearchParams({});
    }
  };

  const filteredPosts = useMemo(() => {
    const searchLower = searchQuery.toLowerCase();
    return posts.filter(post => {
      const matchesTab = activeTab === 'all' || post.category === activeTab;
      const matchesSearch = post.title.toLowerCase().includes(searchLower) ||
        post.tags?.some(tag => {
          const tagLower = tag.toLowerCase();
          return tagLower.includes(searchLower) || `#${tagLower}`.includes(searchLower);
        });
      return matchesTab && matchesSearch;
    });
  }, [posts, activeTab, searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-4xl mx-auto px-6 py-12 md:py-20"
    >
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
            <a href="https://x.com/nupamo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-white/10 transition-all text-sm font-bold text-slate-300">
              <ExternalLink size={16} /> Twitter
            </a>
          </motion.div>
        </div>
      </header>

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
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full bg-surface/50 border border-white/5 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-all text-sm"
            />
          </div>
        </div>

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
                    navigate(`/post/${post.id}`);
                  }
                }}
                className="group glass rounded-3xl overflow-hidden cursor-pointer hover:border-primary/30 transition-colors flex flex-col h-full"
              >
                {post.category === 'photo' && post.image ? (
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={post.title} />
                  </div>
                ) : post.thumbnail ? (
                  <div className="aspect-video overflow-hidden">
                    <img src={post.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={post.title} />
                  </div>
                ) : null}

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${post.category === 'project' ? 'bg-blue-500/10 text-blue-400' :
                      'bg-purple-500/10 text-purple-400'
                      }`}>
                      {post.category}
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

      <footer className="mt-24 pt-12 border-t border-white/5 text-center">
        <p className="text-slate-600 text-xs font-mono">{t.footer}</p>
      </footer>
    </motion.div>
  );
}

function PostDetailPage({ posts, t }: { posts: Post[], t: any }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="min-h-screen bg-background pb-20"
    >
      <nav className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-white/5 px-6 py-4 mb-12">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center cursor-pointer gap-2 text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-sm">{t.back}</span>
          </button>
          <div className="flex items-center gap-3">
            <img 
              src="/profile.jpg" 
              alt="nupamo profile" 
              className="w-8 h-8 rounded-full object-cover border border-white/10" 
            />
            <div className="text-sm font-bold tracking-tight text-slate-300">
              nupamo
            </div>
          </div>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6">
        <header className="mb-10 lg:mb-14">
          <div className="flex items-center gap-3 mb-6 mix-blend-plus-lighter">
            <span className="text-primary font-bold uppercase tracking-wider text-xs">{post.category}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-500 font-mono text-xs">{post.date}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight tracking-tight text-slate-100">
            {post.title}
          </h1>
          <div className="w-full border-t border-white/5 mb-10"></div>
        </header>

        {(post.image || post.thumbnail) && (
          <figure className="mb-14 -mx-6 md:mx-0">
            <img
              src={post.image || post.thumbnail}
              alt={post.title}
              className="w-full aspect-[2/1] md:aspect-[21/9] object-cover md:rounded-2xl shadow-xl shadow-black/20"
            />
          </figure>
        )}

        <div className="prose prose-invert prose-lg md:prose-xl prose-slate max-w-none mb-16 
          prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-xl prose-img:shadow-lg">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        <footer className="pt-10 border-t border-white/5">
          <div className="flex flex-wrap gap-2 mb-10">
            {post.tags?.map(tag => (
              <button 
                key={tag} 
                onClick={() => navigate(`/?search=${encodeURIComponent('#' + tag)}`)}
                className="text-sm text-slate-400 bg-surface px-4 py-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
              >
                #{tag}
              </button>
            ))}
          </div>

          {post.link && (
            <div className="flex justify-center mb-16">
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-800 text-white hover:bg-primary hover:text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-black/20"
              >
                {t.viewDetail} <ExternalLink size={18} />
              </a>
            </div>
          )}
        </footer>
      </article>

      <div className="max-w-3xl mx-auto px-6 text-center mt-20">
        <p className="text-slate-600 text-xs font-mono">{t.footer}</p>
      </div>
    </motion.div>
  );
}


export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const location = useLocation();
  const [lang] = useState<Language>(() => {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'ko') return 'ko';
    if (browserLang === 'ja') return 'jp';
    return 'en';
  });

  const t = translations[lang];

  useEffect(() => {
    const modules = import.meta.glob('./content/*.md', { query: '?raw', import: 'default' });

    const loadPosts = async () => {
      const loadedPosts: Post[] = [];
      const now = new Date().getTime();

      for (const path in modules) {
        const rawContent = await modules[path]() as string;
        const post = parseMarkdown(path, rawContent);
        
        // Skip drafts
        if (post.draft === 'true' || post.draft === true) continue;
        
        // Skip future dates
        const postDate = new Date(post.date).getTime();
        if (postDate > now) continue;

        loadedPosts.push(post);
      }
      setPosts(loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    };

    loadPosts();
  }, []);

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage posts={posts} t={t} />} />
          <Route path="/post/:id" element={<PostDetailPage posts={posts} t={t} />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
