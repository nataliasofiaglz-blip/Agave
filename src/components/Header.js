export class Header {
    render() {
        return `
            <header class="header">
                <style>
                    .header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 1rem 2rem;
                        background: rgba(0,0,0,0.8);
                        backdrop-filter: blur(10px);
                        position: sticky;
                        top: 0;
                        z-index: 100;
                        border-bottom: 1px solid rgba(255,255,255,0.1);
                    }
                    .logo {
                        font-size: 1.5rem;
                        font-weight: 700;
                        color: var(--primary);
                        letter-spacing: -1px;
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                    }
                    .nav-links {
                        display: flex;
                        gap: 2rem;
                    }
                    .nav-link {
                        color: var(--text-secondary);
                        font-weight: 500;
                        transition: color 0.2s;
                    }
                    .nav-link:hover, .nav-link.active {
                        color: var(--text-main);
                    }
                </style>
                <div class="logo">
                    <i class="fa-solid fa-leaf"></i> AGAVE
                </div>
                <nav class="nav-links">
                    <a href="#/" class="nav-link">Entrenar</a>
                    <a href="#/generate" class="nav-link">Crear Rutina</a>
                    <a href="#/progress" class="nav-link">Progreso</a>
                </nav>
                <div class="user-profile">
                    <div style="width:35px; height:35px; background:var(--bg-surface-hover); border-radius:50%; display:flex; align-items:center; justify-content:center;">
                        <i class="fa-solid fa-user"></i>
                    </div>
                </div>
            </header>
        `;
    }
}
