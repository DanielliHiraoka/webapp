import React, { useState, useEffect } from 'react';  // Adicionando a importação do React
import { useRouter } from 'next/router';
import styles from '../styles/Profile.module.css';  // Importando o arquivo CSS

export default function Profile() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Carregar dados do perfil do usuário
        const fetchProfile = async () => {
            const response = await fetch('http://127.0.0.1:5000/api/profile', {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
                setUsername(data.username);
                setEmail(data.email);
            } else {
                setMessage(data.message);
            }
        };
        fetchProfile();
    }, []);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:5000/api/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        setMessage(data.message);
    };

    return (
        <div className={styles.profileContainer}>
            <h1>Perfil do Usuário</h1>
            <form onSubmit={handleUpdateProfile}>
                <label>Nome de Usuário:</label>
                <input
                    className={styles.inputField}
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label>Email:</label>
                <input
                    className={styles.inputField}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Nova Senha:</label>
                <input
                    className={styles.inputField}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className={styles.submitButton} type="submit">Atualizar Perfil</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
