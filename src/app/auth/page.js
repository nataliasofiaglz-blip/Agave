"use client";
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { loginAction, register } from "@/actions/auth";

function AuthContent() {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get('redirect');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const formData = new FormData(e.target);

        const result = isLogin ? await loginAction(formData) : await register(formData);

        if (result.error) {
            setError(result.error);
            setLoading(false);
        } else {
            login(result.user);
            if (redirectUrl) {
                router.push(redirectUrl);
            } else {
                router.push('/');
            }
        }
    };

    return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            {/* Background Element */}
            <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: -1, opacity: 0.3, background: 'radial-gradient(circle at center, var(--primary-hover), transparent 70%)' }}></div>

            <div className="card animate-fade-in" style={{ padding: '3rem', width: '100%', maxWidth: '450px', backdropFilter: 'blur(20px)', background: 'rgba(18,18,18,0.8)' }}>
                <h2 className="text-center" style={{ marginBottom: '2rem', color: 'var(--primary)', fontSize: '2rem' }}>
                    {isLogin ? 'Bienvenido' : 'Únete a Agave'}
                </h2>

                {error && (
                    <div style={{ background: 'rgba(255, 51, 102, 0.15)', color: 'var(--accent)', padding: '0.75rem', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>
                        <i className="fa-solid fa-circle-exclamation"></i> {error}
                    </div>
                )}

                {redirectUrl && !error && (
                    <div style={{ background: 'rgba(204, 255, 0, 0.1)', color: 'var(--primary)', padding: '0.75rem', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>
                        <i className="fa-solid fa-circle-info"></i> Inicia sesión para continuar.
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    {!isLogin && (
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Nombre completo</label>
                            <input name="name" placeholder="Ej. Juan Pérez" className="form-input" required />
                        </div>
                    )}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Correo electrónico</label>
                        <input name="email" type="email" placeholder="tu@email.com" className="form-input" required />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Contraseña</label>
                        <input name="password" type="password" placeholder="••••••••" className="form-input" required />
                    </div>

                    <button type="submit" disabled={loading} className="btn btn-primary w-full" style={{ marginTop: '1rem' }}>
                        {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
                    </button>
                </form>
                <div className="text-center" style={{ marginTop: '2rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
                    <button onClick={() => { setIsLogin(!isLogin); setError(""); }} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s', background: 'none', border: 'none', cursor: 'pointer' }}>
                        {isLogin ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Inicia sesión'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function AuthPage() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <Suspense fallback={<div>Cargando...</div>}>
                <AuthContent />
            </Suspense>
        </Suspense>
    );
}
