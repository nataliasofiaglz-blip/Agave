import { Component } from '../core/Component.js';
import { Header } from '../components/Header.js';
import { equipmentList } from '../data/exercises.js';
import { WorkoutGenerator } from '../services/WorkoutGen.js';

export class Generator extends Component {
    constructor() {
        super();
        this.step = 1;
        this.selection = {
            equipment: ['bodyweight'], // Default
            focus: [],
            goal: 'strength',
            duration: 30
        };
        this.generator = new WorkoutGenerator();
        this.result = null;
    }

    addEventListeners() {
        // Toggle Buttons logic
        this.parent.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const value = btn.dataset.value;
                const type = btn.dataset.type;

                if (type === 'equipment') {
                    if (this.selection.equipment.includes(value)) {
                        this.selection.equipment = this.selection.equipment.filter(i => i !== value);
                    } else {
                        this.selection.equipment.push(value);
                    }
                } else if (type === 'focus') {
                    if (this.selection.focus.includes(value)) {
                        this.selection.focus = this.selection.focus.filter(i => i !== value);
                    } else {
                        this.selection.focus.push(value);
                    }
                } else if (type === 'goal') {
                    this.selection.goal = value;
                } else if (type === 'duration') {
                    this.selection.duration = parseInt(value);
                }
                this.update();
            });
        });

        // Wizard Navigation
        const nextBtn = this.parent.querySelector('#next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.step++;
                this.update();
            });
        }

        const prevBtn = this.parent.querySelector('#prev-btn');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.step--;
                this.update();
            });
        }

        const genBtn = this.parent.querySelector('#generate-btn');
        if (genBtn) {
            genBtn.addEventListener('click', () => {
                this.generateRoutine();
            });
        }

        const downloadBtn = this.parent.querySelector('#download-pdf-btn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                this.downloadPDF();
            });
        }
    }

    downloadPDF() {
        if (!window.jspdf) {
            alert('Error: Librería PDF no cargada.');
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Header
        doc.setFontSize(22);
        doc.setTextColor(204, 255, 0); // Acid Lime (approx) or black if printing
        doc.setTextColor(0, 0, 0); // Better for printing
        doc.text("Agave Fitness", 20, 20);

        doc.setFontSize(16);
        doc.text("Tu Rutina Personalizada", 20, 30);

        // Info
        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text(`Objetivo: ${this.selection.goal.toUpperCase()}`, 20, 45);
        doc.text(`Duración: ${this.selection.duration} min`, 20, 52);
        const date = new Date().toLocaleDateString();
        doc.text(`Fecha: ${date}`, 150, 20);

        // Line
        doc.setLineWidth(0.5);
        doc.line(20, 58, 190, 58);

        // Exercises
        let y = 70;

        this.result.forEach((ex, idx) => {
            if (y > 270) {
                doc.addPage();
                y = 20;
            }

            doc.setFontSize(14);
            doc.setTextColor(0);
            doc.setFont(undefined, 'bold');
            doc.text(`${idx + 1}. ${ex.name}`, 20, y);

            doc.setFontSize(11);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(80);
            y += 7;
            doc.text(`${ex.sets} Series  |  ${ex.reps} Repeticiones  |  Descanso: ${ex.rest}`, 25, y);

            y += 12;
        });

        // Footer
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text("Generado por Agave Fitness App", 105, 290, null, null, "center");

        doc.save(`rutina_agave_${Date.now()}.pdf`);
    }

    generateRoutine() {
        this.result = this.generator.generate(this.selection);
        this.step = 4;
        this.update();
    }

    render() {
        const header = new Header().render();

        return `
            ${header}
            <div class="container" style="padding-top: 2rem; max-width: 800px;">
                <div class="card" style="padding: 2rem; min-height: 60vh;">
                    ${this.renderStep()}
                </div>
            </div>
        `;
    }

    renderStep() {
        const steps = [
            null,
            this.renderEquipmentStep(),
            this.renderFocusStep(),
            this.renderGoalStep(),
            this.renderResultStep()
        ];
        return steps[this.step];
    }

    renderEquipmentStep() {
        return `
            <h2 style="font-size: 2rem; margin-bottom: 0.5rem;">Paso 1: Tu Equipamiento</h2>
            <p style="color:var(--text-muted); margin-bottom: 2rem;">Selecciona todo lo que tienes disponible.</p>
            
            <div class="grid grid-cols-auto gap-md">
                ${equipmentList.map(eq => {
            const active = this.selection.equipment.includes(eq.id) ? 'border-color:var(--primary); background:rgba(204,255,0,0.1);' : '';
            return `
                        <button class="toggle-btn card" data-type="equipment" data-value="${eq.id}" 
                            style="padding: 1.5rem; text-align:left; border:1px solid var(--border-subtle); color: var(--text-main); ${active}">
                            <div style="font-weight:600; font-size:1.1rem; margin-bottom:0.5rem;">${eq.name}</div>
                            <div style="font-size:0.9rem; color:var(--text-muted);">
                                ${this.selection.equipment.includes(eq.id) ? '<i class="fa-solid fa-check" style="color:var(--primary);"></i> Seleccionado' : 'Click para añadir'}
                            </div>
                        </button>
                    `;
        }).join('')}
            </div>

            <div style="margin-top: 2rem; text-align: right;">
                <button id="next-btn" class="btn btn-primary">Siguiente <i class="fa-solid fa-arrow-right"></i></button>
            </div>
        `;
    }

    renderFocusStep() {
        const zones = [
            { id: 'upper', name: 'Tren Superior', icon: 'fa-dumbbell' },
            { id: 'lower', name: 'Tren Inferior', icon: 'fa-person-running' },
            { id: 'core', name: 'Core / Abdomen', icon: 'fa-cube' },
            { id: 'full', name: 'Cuerpo Completo', icon: 'fa-person' }
        ];

        return `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h2 style="font-size: 2rem;">Paso 2: ¿Qué quieres entrenar?</h2>
                <button id="prev-btn" class="btn btn-secondary">Atrás</button>
            </div>
            <p style="color:var(--text-muted); margin-bottom: 2rem;">Puedes elegir varias zonas.</p>
            
            <div class="grid grid-cols-2 gap-md">
                ${zones.map(z => {
            const active = this.selection.focus.includes(z.id) ? 'border-color:var(--primary); background:rgba(204,255,0,0.1);' : '';
            return `
                        <button class="toggle-btn card" data-type="focus" data-value="${z.id}" 
                             style="padding: 2rem; display:flex; flex-direction:column; align-items:center; gap:1rem; border:1px solid var(--border-subtle); color: var(--text-main); ${active}">
                            <i class="fa-solid ${z.icon}" style="font-size: 2rem; color: ${this.selection.focus.includes(z.id) ? 'var(--primary)' : 'var(--text-muted)'}"></i>
                            <span style="font-size:1.2rem; font-weight:600;">${z.name}</span>
                        </button>
                    `;
        }).join('')}
            </div>

            <div style="margin-top: 2rem; text-align: right;">
                <button id="next-btn" class="btn btn-primary" ${this.selection.focus.length === 0 ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>Siguiente <i class="fa-solid fa-arrow-right"></i></button>
            </div>
        `;
    }

    renderGoalStep() {
        const goals = [
            { id: 'strength', name: 'Fuerza', desc: 'Pocas repeticiones, alta carga. 5x5.' },
            { id: 'muscle', name: 'Hipertrofia', desc: 'Rango moderado para crecer. 3x10-12.' },
            { id: 'endurance', name: 'Resistencia', desc: 'Altas repeticiones, poco descanso.' },
            { id: 'definition', name: 'Definición', desc: 'Alta intensidad, mantiene ritmo cardíaco.' }
        ];

        return `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h2 style="font-size: 2rem;">Paso 3: Objetivo y Tiempo</h2>
                 <button id="prev-btn" class="btn btn-secondary">Atrás</button>
            </div>
            
            <div style="margin-bottom: 2rem;">
                <h3 style="margin-bottom:1rem; color:var(--text-secondary);">Duración</h3>
                <div class="flex gap-sm">
                    ${[15, 30, 45, 60].map(t => `
                        <button class="toggle-btn btn ${this.selection.duration === t ? 'btn-primary' : 'btn-secondary'}"
                            data-type="duration" data-value="${t}">
                            ${t} Min
                        </button>
                    `).join('')}
                </div>
            </div>

            <h3 style="margin-bottom:1rem; color:var(--text-secondary);">Meta Principal</h3>
            <div class="grid grid-cols-2 gap-md">
                ${goals.map(g => {
            const active = this.selection.goal === g.id ? 'border-color:var(--primary); background:rgba(204,255,0,0.1);' : '';
            return `
                         <button class="toggle-btn card" data-type="goal" data-value="${g.id}" 
                             style="padding: 1.5rem; text-align:left; border:1px solid var(--border-subtle); color: var(--text-main); ${active}">
                            <div style="font-weight:600; font-size:1.1rem; margin-bottom:0.25rem;">${g.name}</div>
                             <div style="font-size:0.85rem; color:var(--text-muted);">${g.desc}</div>
                        </button>
                    `;
        }).join('')}
            </div>

            <div style="margin-top: 2rem; text-align: right;">
                <button id="generate-btn" class="btn btn-primary" style="padding: 1rem 3rem; font-size:1.2rem;">
                    <i class="fa-solid fa-bolt"></i> GENERAR RUTINA
                </button>
            </div>
        `;
    }

    renderResultStep() {
        if (!this.result || this.result.length === 0) {
            return `
                <div class="text-center" style="padding: 3rem;">
                    <h2>No encontramos ejercicios exactos :(</h2>
                    <p>Intenta añadir más equipamiento o seleccionar 'Cuerpo Completo'.</p>
                    <button id="prev-btn" class="btn btn-primary" style="margin-top:1rem;">Volver</button>
                </div>
            `;
        }

        return `
            <div style="text-align:center; margin-bottom:2rem;">
                <h2 style="font-size: 2.5rem; color: var(--primary);">Tu Rutina Personalizada</h2>
                <p style="color:var(--text-muted);">Duración estimada: ${this.selection.duration} min • ${this.result.length} Ejercicios</p>
            </div>

            <div class="routine-list flex flex-col gap-md">
                ${this.result.map((ex, idx) => `
                    <div class="card" style="padding: 1.5rem; display:flex; align-items:center; gap:1.5rem;">
                        <div style="font-size: 2rem; font-weight:bold; color:var(--text-muted); width: 40px;">${idx + 1}</div>
                        <div style="flex:1;">
                            <h4 style="font-size: 1.2rem; margin-bottom:0.25rem;">${ex.name}</h4>
                            <div style="color:var(--text-muted); font-size:0.9rem;">
                                ${ex.sets} Series x ${ex.reps} Reps • Descanso: ${ex.rest}
                            </div>
                        </div>
                        <div style="text-align:right;">
                            <button class="btn btn-secondary" style="font-size:0.9rem;"><i class="fa-brands fa-youtube"></i> Ver Demo</button>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div style="margin-top: 3rem; display:flex; justify-content:center; gap:1rem;">
                <button class="btn btn-secondary" onclick="window.location.reload()"><i class="fa-solid fa-trash"></i> Descartar</button>
                <button id="download-pdf-btn" class="btn btn-primary"><i class="fa-solid fa-file-pdf"></i> Descargar PDF</button>
            </div>
        `;
    }
}
