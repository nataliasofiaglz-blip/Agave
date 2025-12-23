import { videos } from '../../../data/videos';

export async function generateStaticParams() {
    return videos.map((v) => ({
        id: v.id,
    }));
}

export default async function PlayerPage({ params }) {
    const { id } = await params;
    const video = videos.find(v => v.id === id) || videos[0];

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '70vh', background: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <iframe
                    width="100%"
                    height="100%"
                    src={video.videoUrl}
                    title={video.title}
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            <div style={{ padding: '2rem', background: 'var(--bg-surface)', flex: 1 }}>
                <div className="container">
                    <h1 style={{ color: 'white', marginBottom: '0.5rem' }}>{video.title}</h1>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{video.trainer} • {video.category}</p>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px' }}>Clase de {video.category} diseñada para mejorar tu rendimiento. Sigue las instrucciones del instructor y mantén tu ritmo.</p>
                </div>
            </div>
        </div>
    )
}
