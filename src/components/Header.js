"use client";
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { usePathname } from 'next/navigation';

export default function Header() {
    const { user, logout } = useAuth();
    const pathname = usePathname();

    const isActive = (path) => pathname === path ? 'active' : '';
    const linkStyle = (path) => ({
        color: isActive(path) === 'active' ? 'var(--text-main)' : 'var(--text-secondary)',
        fontWeight: 500,
        transition: 'color 0.2s',
        cursor: 'pointer'
    });

    return (
        <header className="header" style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem',
            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100,
            borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
            <Link href="/" className="logo" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className="fa-solid fa-leaf"></i> AGAVE
            </Link>

            <nav className="nav-links" style={{ display: 'flex', gap: '2rem' }}>
                <Link href="/" style={linkStyle('/')}>Inicio</Link>
                <Link href="/vod" style={linkStyle('/vod')}>Entrenar (VOD)</Link>
                <Link href="/appointments" style={linkStyle('/appointments')}>Citas</Link>
                <Link href="/classes" style={linkStyle('/classes')}>Clases</Link>
            </nav>

            <div className="user-profile">
                {user ? (
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Link href="/profile" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ width: '35px', height: '35px', background: 'var(--bg-surface-hover)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <i className="fa-solid fa-user"></i>
                            </div>
                            <span className="hidden-mobile">{user.name.split(' ')[0]}</span>
                        </Link>
                        <button onClick={logout} style={{ color: 'var(--accent)', fontSize: '1.1rem' }} title="Cerrar Sesión">
                            <i className="fa-solid fa-right-from-bracket"></i>
                        </button>
                    </div>
                ) : (
                    <Link href="/auth" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>
                        Ingresar
                    </Link>
                )}
            </div>
        </header>
    );
}
