"use client";
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { recordVisit } from "@/actions/check-in";
import Link from 'next/link';

function CheckInContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user } = useAuth();
    const [status, setStatus] = useState('loading'); // loading, success, error, redirected, expired
    const [errorMsg, setErrorMsg] = useState("");
    const token = searchParams.get('token');

    useEffect(() => {
        const performCheckIn = async () => {
            if (!token) {
                setStatus('error');
                return;
            }

            if (!user) {
                const returnUrl = `/check-in?token=${token}`;
                router.push(`/auth?redirect=${encodeURIComponent(returnUrl)}`);
                setStatus('redirected');
                return;
            }

            const result = await recordVisit(user.id, token);

            if (result.success) {
                setStatus('success');
            } else {
                setStatus('error');
                setErrorMsg(result.error);
            }
        };

        performCheckIn();
    }, [user, token, router]);

    if (status === 'loading' || status === 'redirected') {
        return <div className="text-center">Procesando tu entrada...</div>;
    }

    if (status === 'error' || status === 'expired') {
        return (
            <div className="card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '400px', margin: '0 auto', background: 'var(--bg-surface)' }}>
                <div style={{ fontSize: '4rem', color: 'var(--accent)', marginBottom: '1rem' }}>
                    <i className="fa-solid fa-circle-xmark"></i>
                </div>
                <h2 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Error en Check-in</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    {errorMsg || "El código QR ha caducado o es inválido. Por favor, escanea el código nuevamente."}
                </p>
                <Link href="/" className="btn btn-secondary">Volver al Inicio</Link>
            </div>
        );
    }

    return (
        <div className="card animate-fade-in" style={{ padding: '3rem', textAlign: 'center', maxWidth: '400px', margin: '0 auto', background: 'var(--bg-surface)', border: '1px solid var(--primary)' }}>
            <div style={{ fontSize: '4rem', color: 'var(--primary)', marginBottom: '1rem' }}>
                <i className="fa-solid fa-circle-check"></i>
            </div>
            <h2 style={{ marginBottom: '0.5rem', color: 'var(--text-main)' }}>¡Bienvenido, {user?.name?.split(' ')[0]}!</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '1rem' }}>Check-in Exitoso</p>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Tu visita ha sido registrada en el servidor.<br />
                {new Date().toLocaleString()}
            </p>
            <div className="flex flex-col gap-sm">
                <Link href="/profile" className="btn btn-primary">Ver mi Historial</Link>
                <Link href="/" className="btn btn-secondary">Ir al Inicio</Link>
            </div>
        </div>
    );
}

export default function CheckInPage() {
    return (
        <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Suspense fallback={<div>Cargando...</div>}>
                <CheckInContent />
            </Suspense>
        </div>
    );
}
