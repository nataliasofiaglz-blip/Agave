import Link from 'next/link';
import { videos, categories } from '../data/videos';

export default function Home() {
  const featured = videos[0];

  return (
    <div className="home-container" style={{ paddingBottom: '5rem' }}>
      {/* Hero */}
      <section className="hero" style={{
        height: '70vh',
        background: `linear-gradient(to top, var(--bg-body), transparent), url('${featured.image}') center/cover`,
        position: 'relative', display: 'flex', alignItems: 'flex-end', padding: 'var(--space-2xl)'
      }}>
        <div className="hero-content" style={{ maxWidth: '600px', paddingBottom: '2rem' }}>
          <span style={{ background: 'var(--accent)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold', marginBottom: '1rem', display: 'inline-block', fontSize: '0.8rem', textTransform: 'uppercase' }}>Tendencia</span>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '1rem', color: 'white', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
            {featured.title}
          </h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem', fontWeight: 500 }}>
            <span style={{ color: 'var(--primary)' }}>{featured.level}</span>
            <span>•</span>
            <span>{featured.duration} min</span>
            <span>•</span>
            <span>{featured.trainer}</span>
          </div>
          <p style={{ fontSize: '1.1rem', color: '#ddd', marginBottom: '2rem', lineHeight: 1.6 }}>
            Entrena al máximo nivel con esta clase exclusiva. Mejora tu resistencia y fuerza con los mejores instructores.
          </p>
          <div className="actions" style={{ display: 'flex', gap: '1rem' }}>
            <Link href={`/player/${featured.id}`} className="btn btn-primary">
              <i className="fa-solid fa-play"></i> Reproducir Ahora
            </Link>
            <button className="btn btn-secondary">
              <i className="fa-solid fa-plus"></i> Mi Lista
            </button>
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '-3rem', position: 'relative', zIndex: 10 }}>
        {categories.map(cat => (
          <CategoryRow key={cat} title={cat} videoList={videos.filter(v => v.category === cat)} />
        ))}
        <CategoryRow title="Recomendados para ti" videoList={videos} />
      </div>
    </div>
  );
}

function CategoryRow({ title, videoList }) {
  if (videoList.length === 0) return null;
  return (
    <section className="category-section" style={{ marginBottom: '3rem' }}>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-main)', fontWeight: 600, paddingLeft: '0.5rem', borderLeft: '4px solid var(--primary)' }}>{title}</h3>
      <div className="scroll-row" style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem', scrollSnapType: 'x mandatory' }}>
        {videoList.map(v => <VideoCard key={v.id} video={v} />)}
      </div>
    </section>
  )
}

function VideoCard({ video }) {
  return (
    <Link href={`/player/${video.id}`} className="video-card card" style={{ minWidth: '280px', width: '280px', cursor: 'pointer', flexShrink: 0, scrollSnapAlign: 'start', background: 'var(--bg-surface)', textDecoration: 'none', display: 'block' }}>
      <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
        <img src={video.image} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
      </div>
      <div style={{ padding: '1.2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <h4 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--text-main)' }}>{video.title}</h4>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{video.trainer}</p>
        <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.75rem' }}>
          <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px', color: 'white' }}>{video.duration} min</span>
          <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px', color: 'white' }}>{video.category}</span>
        </div>
      </div>
    </Link>
  )
}
