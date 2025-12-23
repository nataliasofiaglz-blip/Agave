"use client";
import { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function AccessPointPage() {
    const [token, setToken] = useState('');
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [baseUrl, setBaseUrl] = useState('');

    useEffect(() => {
        setBaseUrl(window.location.origin);

        const generateToken = () => {
            // Simple robust token: timestamp in ms
            const now = Date.now();
            // Encode to make it look "token-y"
            const newToken = btoa(now.toString());
            setToken(newToken);
            setLastUpdated(new Date());
        };

        generateToken();

        // Update every 15 minutes (15 * 60 * 1000)
        const interval = setInterval(generateToken, 15 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const checkInUrl = `${baseUrl}/check-in?token=${token}`;

    return (
        <div style={{
            minHeight: '100vh',
            background: 'black',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem'
        }}>
            <h1 style={{ color: 'var(--primary)', fontSize: '3rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '4px' }}>
                Agave Fitness Access
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.5rem', marginBottom: '3rem' }}>
                Escanea para registrar tu visita
            </p>

            <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '20px',
                boxShadow: '0 0 50px rgba(204, 255, 0, 0.3)'
            }}>
                {token && (
                    <QRCodeCanvas
                        value={checkInUrl}
                        size={300}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                        level={"M"}
                        marginSize={4}
                    />
                )}
            </div>

            <div style={{ marginTop: '3rem', color: 'var(--text-muted)' }}>
                <p>Código QR seguro se actualiza automáticamente cada 15 minutos.</p>
                <p style={{ fontSize: '0.8rem', marginTop: '1rem' }}>Última actualización: {lastUpdated.toLocaleTimeString()}</p>
            </div>
        </div>
    );
}
