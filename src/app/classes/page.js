"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getClasses, bookClass, seedClasses } from "@/actions/classes";

export default function ClassesPage() {
    const { user } = useAuth();
    const [classes, setClasses] = useState([]);
    const [showQR, setShowQR] = useState(false);
    const [loading, setLoading] = useState(true);

    const refreshClasses = async () => {
        setLoading(true);
        // Ensure some initial data exists for demo
        await seedClasses();
        const data = await getClasses();
        setClasses(data);
        setLoading(false);
    };

    useEffect(() => {
        refreshClasses();
    }, []);

    const handleReserve = async (classId) => {
        if (!user) {
            alert("Por favor, inicia sesión para reservar.");
            return;
        }

        const result = await bookClass(user.id, classId);
        if (result.success) {
            alert('Lugar reservado correctamente.');
            refreshClasses();
        } else {
            alert(result.error);
        }
    };

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
            <h1 className="page-title">Clases Presenciales</h1>

            <div className="card" style={{ padding: '2rem', marginBottom: '3rem', background: 'linear-gradient(45deg, var(--bg-surface), #1a1a1a)', border: '1px solid var(--primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <i className="fa-solid fa-qrcode" style={{ color: 'var(--primary)' }}></i> Check-in Rápido
                        </h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Escanea el código QR al llegar al gimnasio.</p>
                    </div>
                    <button onClick={() => setShowQR(true)} className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                        <i className="fa-solid fa-camera"></i> Escanear/Mostrar QR
                    </button>
                </div>
            </div>

            <h3 style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--accent)', paddingLeft: '1rem' }}>Próximas Clases - Hoy</h3>

            <div className="flex flex-col gap-md">
                {loading ? (
                    <div style={{ padding: '2rem', textAlign: 'center' }}>Actualizando disponibilidad...</div>
                ) : classes.map(cls => {
                    const availableSpots = cls.totalSpots - cls._count.bookings;
                    return (
                        <div key={cls.id} className="card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', textAlign: 'center', minWidth: '80px' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{cls.time}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cls.duration}</div>
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{cls.name}</h4>
                                    <p style={{ color: 'var(--text-secondary)' }}>con {cls.trainer}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                <div className="text-center">
                                    <span style={{ display: 'block', fontWeight: 'bold', fontSize: '1.2rem', color: availableSpots > 0 ? 'var(--primary)' : 'var(--accent)' }}>
                                        {availableSpots}
                                    </span>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Lugares</span>
                                </div>
                                {availableSpots > 0 ? (
                                    <button onClick={() => handleReserve(cls.id)} className="btn btn-secondary" style={{ width: '120px' }}>
                                        Reservar
                                    </button>
                                ) : (
                                    <button className="btn btn-secondary" style={{ width: '120px', opacity: 0.5 }} disabled>
                                        Clase Llena
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* QR Modal Overlay */}
            {showQR && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="card animate-fade-in" style={{ padding: '3rem', textAlign: 'center', background: 'white', color: 'black' }}>
                        <h2 style={{ marginBottom: '1rem' }}>Tu Pase de Acceso</h2>
                        <div style={{ width: '200px', height: '200px', background: 'black', margin: '0 auto 1.5rem auto' }}>
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.origin + '/check-in?token=' + btoa(Date.now().toString()))}`} alt="QR" />
                        </div>
                        <p style={{ marginBottom: '2rem', color: '#666' }}>Muestra este código en recepción o escanea el QR del centro.</p>
                        <button onClick={() => setShowQR(false)} className="btn" style={{ background: '#000', color: '#fff' }}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}
