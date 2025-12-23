"use client";
import { useState } from 'react';
import Link from 'next/link';
import { videos, categories } from '../../data/videos';

export default function VODPage() {
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [durationFilter, setDurationFilter] = useState("All");

    const filteredVideos = videos.filter(v => {
        const catMatch = selectedCategory === "Todos" || v.category === selectedCategory;
        const durMatch = durationFilter === "All" ||
            (durationFilter === "<20" && v.duration < 20) ||
            (durationFilter === "20-40" && v.duration >= 20 && v.duration <= 40) ||
            (durationFilter === ">40" && v.duration > 40);
        return catMatch && durMatch;
    });

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
                <div>
                    <h1 className="page-title" style={{ marginBottom: '0.5rem' }}>Biblioteca de Clases</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Explora cientos de entrenamientos a tu ritmo.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <select className="form-input" style={{ width: 'auto', marginBottom: 0 }} value={durationFilter} onChange={e => setDurationFilter(e.target.value)}>
                        <option value="All">Cualquier Duración</option>
                        <option value="<20">Rápidas (&lt; 20 min)</option>
                        <option value="20-40">Estándar (20-40 min)</option>
                        <option value=">40">Largas (&gt; 40 min)</option>
                    </select>
                </div>
            </div>

            {/* Category Pills */}
            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2rem' }}>
                <button
                    onClick={() => setSelectedCategory("Todos")}
                    className={`btn ${selectedCategory === "Todos" ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}
                >
                    Todos
                </button>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-auto gap-lg">
                {filteredVideos.map(video => (
                    <Link key={video.id} href={`/player/${video.id}`} className="card video-card" style={{ cursor: 'pointer', textDecoration: 'none', display: 'block' }}>
                        <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                            <img src={video.image} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                            <div className="play-overlay" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0,0,0,0.6)', color: 'white', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                <i className="fa-solid fa-play"></i>
                            </div>
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <h4 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--text-main)' }}>{video.title}</h4>
                                <i className="fa-regular fa-heart" style={{ color: 'var(--text-muted)' }}></i>
                            </div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>con {video.trainer}</p>
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                                <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--text-main)' }}>{video.duration} min</span>
                                <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--text-main)' }}>{video.category}</span>
                                <span style={{ background: 'var(--primary)', color: 'black', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', marginLeft: 'auto' }}>
                                    <i className="fa-solid fa-lock"></i> Premium
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {filteredVideos.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                    <i className="fa-solid fa-dumbbell" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i>
                    <p>No se encontraron clases con estos filtros.</p>
                </div>
            )}
        </div>
    );
}
