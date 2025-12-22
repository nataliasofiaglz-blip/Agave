import { Component } from '../core/Component.js';
import { Header } from '../components/Header.js';

export class Progress extends Component {
    render() {
        const header = new Header().render();
        return `
            ${header}
            <div class="container" style="padding-top: 3rem;">
                <h2 style="font-size: 2rem; margin-bottom: 2rem;">Tu Progreso</h2>
                
                <div class="grid grid-cols-3 gap-lg" style="margin-bottom: 3rem;">
                    <div class="card" style="padding: 2rem; text-align:center;">
                        <i class="fa-solid fa-fire" style="font-size:2rem; color:var(--accent); margin-bottom:1rem;"></i>
                        <div style="font-size:3rem; font-weight:700;">3</div>
                        <div style="color:var(--text-muted);">Días Racha</div>
                    </div>
                    <div class="card" style="padding: 2rem; text-align:center;">
                        <i class="fa-solid fa-dumbbell" style="font-size:2rem; color:var(--primary); margin-bottom:1rem;"></i>
                        <div style="font-size:3rem; font-weight:700;">8</div>
                        <div style="color:var(--text-muted);">Entrenamientos</div>
                    </div>
                    <div class="card" style="padding: 2rem; text-align:center;">
                        <i class="fa-solid fa-clock" style="font-size:2rem; color:#4facfe; margin-bottom:1rem;"></i>
                        <div style="font-size:3rem; font-weight:700;">12.5</div>
                        <div style="color:var(--text-muted);">Horas Totales</div>
                    </div>
                </div>

                <div class="card" style="padding: 2rem;">
                    <h3>Historial Reciente</h3>
                    <ul style="margin-top: 1rem;">
                        <li style="padding: 1rem 0; border-bottom: 1px solid var(--border-subtle); display:flex; justify-content:space-between;">
                            <span><i class="fa-solid fa-check-circle" style="color:var(--primary); margin-right:0.5rem;"></i> Full Body Strength</span>
                            <span style="color:var(--text-muted);">Hace 2 días</span>
                        </li>
                        <li style="padding: 1rem 0; border-bottom: 1px solid var(--border-subtle); display:flex; justify-content:space-between;">
                            <span><i class="fa-solid fa-check-circle" style="color:var(--primary); margin-right:0.5rem;"></i> HIIT Explosivo</span>
                            <span style="color:var(--text-muted);">Hace 3 días</span>
                        </li>
                    </ul>
                </div>
            </div>
        `;
    }
}
