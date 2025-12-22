import { Component } from '../core/Component.js';
import { Header } from '../components/Header.js';
import { videos } from '../data/videos.js';

export class Player extends Component {
    render() {
        const hashParts = window.location.hash.split('/');
        const videoId = hashParts[2]; // #/player/v1
        const video = videos.find(v => v.id === videoId);

        const header = new Header().render();

        if (!video) {
            return `
                ${header}
                <div class="container" style="padding-top:5rem; text-align:center;">
                    <h2>Video no encontrado</h2>
                    <a href="#/" class="btn btn-primary">Volver al inicio</a>
                </div>
            `;
        }

        return `
            ${header}
            <div style="height: calc(100vh - 80px); display:flex; flex-direction:column; background:black;">
                <div style="flex:1; width:100%; display:flex; justify-content:center; align-items:center; background:black;">
                    <iframe width="100%" height="100%" 
                        src="${video.videoUrl}?autoplay=1" 
                        title="${video.title}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen 
                        style="max-width: 1200px; max-height: 80vh; border:none;">
                    </iframe>
                </div>
                <div style="padding: 2rem; background: var(--bg-surface);">
                    <div class="container">
                        <h1 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${video.title}</h1>
                        <p style="color:var(--text-muted);">Entrenador: ${video.trainer} • ${video.category}</p>
                    </div>
                </div>
            </div>
        `;
    }
}
