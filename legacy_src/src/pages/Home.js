import { Component } from '../core/Component.js';
import { Header } from '../components/Header.js';
import { videos, categories } from '../data/videos.js';

export class Home extends Component {
    render() {
        const header = new Header().render();

        // Featured (Hero) - Pick random for variety
        const featured = videos[Math.floor(Math.random() * videos.length)];

        return `
            ${header}
            <div class="home-container" style="padding-bottom: 5rem;">
                <!-- Hero Section -->
                <section class="hero" style="
                    height: 70vh; 
                    background: linear-gradient(to top, var(--bg-body), transparent), url('${featured.image}') center/cover;
                    position: relative;
                    display: flex;
                    align-items: flex-end;
                    padding: var(--space-2xl);
                ">
                    <div class="hero-content" style="max-width: 600px; padding-bottom: 2rem;">
                        <span style="background:var(--accent); color:white; padding:4px 8px; border-radius:4px; font-weight:bold; margin-bottom:1rem; display:inline-block; font-size: 0.8rem; text-transform: uppercase;">Tendencia</span>
                        <h1 style="font-size: clamp(2rem, 5vw, 4rem); line-height:1.1; margin-bottom: 1rem; color: white; text-shadow: 0 4px 10px rgba(0,0,0,0.5);">${featured.title}</h1>
                        <div style="display:flex; gap:1rem; align-items:center; margin-bottom: 2rem; font-weight: 500;">
                            <span style="color:var(--primary);">${featured.level}</span>
                            <span>•</span>
                            <span>${featured.duration} min</span>
                            <span>•</span>
                            <span>${featured.trainer}</span>
                        </div>
                        <p style="font-size: 1.1rem; color: #ddd; margin-bottom: 2rem; line-height: 1.6;">
                            Entrena al máximo nivel con esta clase exclusiva. Mejora tu resistencia y fuerza con los mejores instructores.
                        </p>
                        <div class="actions" style="display:flex; gap:1rem;">
                            <button class="btn btn-primary" onclick="window.location.hash='#/player/${featured.id}'">
                                <i class="fa-solid fa-play"></i> Reproducir Ahora
                            </button>
                            <button class="btn btn-secondary">
                                <i class="fa-solid fa-plus"></i> Mi Lista
                            </button>
                        </div>
                    </div>
                </section>

                <div class="container" style="margin-top: -3rem; position: relative; z-index: 10;">
                    <!-- Categories -->
                    ${categories.map(cat => this.renderCategoryRow(cat)).join('')}
                    
                    ${this.renderCategoryRow('Recomendados para ti', videos)}
                </div>
            </div>
        `;
    }

    renderCategoryRow(title, videoList) {
        const catVideos = videoList || videos.filter(v => v.category === title);
        if (catVideos.length === 0) return '';

        return `
            <section class="category-section" style="margin-bottom: 3rem;">
                <h3 style="font-size: 1.25rem; margin-bottom: 1rem; color: var(--text-main); font-weight: 600; padding-left: 0.5rem; border-left: 4px solid var(--primary);">${title}</h3>
                <div class="scroll-row" style="display:flex; gap:1.5rem; overflow-x:auto; padding-bottom:1rem; scroll-snap-type: x mandatory;">
                    ${catVideos.map(v => this.renderVideoCard(v)).join('')}
                </div>
            </section>
        `;
    }

    renderVideoCard(video) {
        return `
            <div class="video-card card" 
                 onclick="window.location.hash='#/player/${video.id}'"
                 style="min-width: 280px; width: 280px; cursor: pointer; flex-shrink: 0; scroll-snap-align: start; background: var(--bg-surface);">
                <div style="height: 160px; overflow:hidden; position:relative;">
                    <img src="${video.image}" style="width:100%; height:100%; object-fit:cover; transition: transform 0.5s;">
                    <button style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); background:rgba(0,0,0,0.6); color:white; border-radius:50%; width:50px; height:50px; font-size:1.2rem; opacity:0; transition:0.3s;" class="play-overlay">
                        <i class="fa-solid fa-play"></i>
                    </button>
                </div>
                <div style="padding: 1.2rem;">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 0.5rem;">
                        <h4 style="font-size: 1.1rem; margin:0;">${video.title}</h4>
                        <i class="fa-regular fa-heart" style="color:var(--text-muted); cursor:pointer;"></i>
                    </div>
                    <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom: 1rem;">${video.trainer}</p>
                    <div style="display:flex; gap:0.5rem; font-size:0.75rem;">
                        <span style="background:rgba(255,255,255,0.1); padding:2px 8px; border-radius:4px;">${video.duration} min</span>
                        <span style="background:rgba(255,255,255,0.1); padding:2px 8px; border-radius:4px;">${video.category}</span>
                    </div>
                </div>
            </div>
            <style>
                .video-card:hover img { transform: scale(1.1); }
                .video-card:hover .play-overlay { opacity: 1; }
            </style>
        `;
    }
}
