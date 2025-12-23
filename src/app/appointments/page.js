"use client";
import { useState } from 'react';

const MOCK_SLOTS = [
    { time: '09:00', doctor: 'Dra. Ana (Nutrición)', available: true },
    { time: '10:00', doctor: 'Dr. Carlos (Fisioterapia)', available: false },
    { time: '11:00', doctor: 'Dra. Ana (Nutrición)', available: true },
    { time: '13:00', doctor: 'Dr. Carlos (Fisioterapia)', available: true },
    { time: '16:00', doctor: 'Dra. Ana (Nutrición)', available: true },
];

export default function AppointmentsPage() {
    const [activeTab, setActiveTab] = useState('book'); // 'book' or 'records'
    const [slots, setSlots] = useState(MOCK_SLOTS);

    const handleBook = (index) => {
        const newSlots = [...slots];
        newSlots[index].available = false;
        setSlots(newSlots);
        alert('Cita reservada con éxito. Te hemos enviado un correo de confirmación.');
    };

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
            <h1 className="page-title">Gestión de Salud</h1>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-subtle)' }}>
                <button
                    onClick={() => setActiveTab('book')}
                    style={{ padding: '0.5rem 1rem', borderBottom: activeTab === 'book' ? '2px solid var(--primary)' : 'none', color: activeTab === 'book' ? 'white' : 'var(--text-muted)' }}
                >
                    Reservar Cita
                </button>
                <button
                    onClick={() => setActiveTab('records')}
                    style={{ padding: '0.5rem 1rem', borderBottom: activeTab === 'records' ? '2px solid var(--primary)' : 'none', color: activeTab === 'records' ? 'white' : 'var(--text-muted)' }}
                >
                    Expediente Digital
                </button>
            </div>

            {activeTab === 'book' ? (
                <div className="grid grid-cols-auto gap-lg">
                    {slots.map((slot, idx) => (
                        <div key={idx} className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: slot.available ? 1 : 0.5 }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: slot.available ? 'white' : 'var(--text-muted)' }}>
                                {slot.time}
                            </div>
                            <div style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', textAlign: 'center' }}>
                                {slot.doctor}
                            </div>
                            <button
                                onClick={() => slot.available && handleBook(idx)}
                                disabled={!slot.available}
                                className={`btn ${slot.available ? 'btn-primary' : 'btn-secondary'}`}
                            >
                                {slot.available ? 'Reservar' : 'Ocupado'}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="animate-fade-in">
                    <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Tu Plan Actual</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}>
                            <div>
                                <h4 style={{ marginBottom: '0.25rem' }}>Plan Nutricional - Fase Hipertrofia</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Actualizado: 20 Dic 2025</p>
                            </div>
                            <button className="btn btn-secondary">
                                <i className="fa-solid fa-file-pdf"></i> Descargar PDF
                            </button>
                        </div>
                    </div>

                    <div className="card" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Historial de Medidas</h3>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                                        <th style={{ padding: '1rem' }}>Fecha</th>
                                        <th style={{ padding: '1rem' }}>Peso (kg)</th>
                                        <th style={{ padding: '1rem' }}>% Grasa</th>
                                        <th style={{ padding: '1rem' }}>Masa Muscular</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>15 Dic 2025</td>
                                        <td style={{ padding: '1rem' }}>75.5</td>
                                        <td style={{ padding: '1rem' }}>18%</td>
                                        <td style={{ padding: '1rem' }}>35kg</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>15 Nov 2025</td>
                                        <td style={{ padding: '1rem' }}>74.0</td>
                                        <td style={{ padding: '1rem' }}>19%</td>
                                        <td style={{ padding: '1rem' }}>34kg</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
