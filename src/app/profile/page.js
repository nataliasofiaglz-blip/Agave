"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { getVisitHistory } from "@/actions/check-in";

export default function ProfilePage() {
    const { user } = useAuth();
    const router = useRouter();
    const [visits, setVisits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push('/auth');
            return;
        }

        const fetchHistory = async () => {
            setLoading(true);
            const history = await getVisitHistory(user.id);
            setVisits(history);
            setLoading(false);
        };

        fetchHistory();
    }, [user, router]);

    if (!user) return null;

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>
                <div style={{ width: '100px', height: '100px', background: 'var(--bg-surface-hover)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', border: '2px solid var(--primary)' }}>
                    <i className="fa-solid fa-user"></i>
                </div>
                <div>
                    <h1 style={{ marginBottom: '0.5rem', color: 'white' }}>{user.name}</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>{user.email}</p>
                    <div style={{ marginTop: '0.5rem' }}>
                        <span style={{ background: 'var(--accent)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>Miembro Premium</span>
                    </div>
                </div>
            </div>

            <h2 style={{ borderLeft: '4px solid var(--primary)', paddingLeft: '1rem', marginBottom: '2rem' }}>Historial de Visitas (Sincronizado)</h2>

            <div className="card" style={{ overflow: 'hidden' }}>
                {loading ? (
                    <div style={{ padding: '3rem', textAlign: 'center' }}>Cargando historial...</div>
                ) : visits.length > 0 ? (
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ background: 'var(--bg-surface-hover)' }}>
                            <tr>
                                <th style={{ padding: '1rem' }}>Fecha</th>
                                <th style={{ padding: '1rem' }}>Hora</th>
                                <th style={{ padding: '1rem' }}>Ubicación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visits.map((visit, idx) => {
                                const dateObj = new Date(visit.timestamp);
                                return (
                                    <tr key={visit.id || idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                                        <td style={{ padding: '1rem' }}>{dateObj.toLocaleDateString()}</td>
                                        <td style={{ padding: '1rem', color: 'var(--primary)' }}>{dateObj.toLocaleTimeString()}</td>
                                        <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{visit.location}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        <i className="fa-solid fa-shoe-prints" style={{ fontSize: '2rem', marginBottom: '1rem' }}></i>
                        <p>Aún no has registrado visitas al gimnasio.</p>
                    </div>
                )}
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <i className="fa-solid fa-cloud"></i> Tus datos ahora se guardan de forma permanente y están disponibles en cualquier dispositivo.
                </p>
            </div>
        </div>
    );
}
