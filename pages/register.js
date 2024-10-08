import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Register.module.css'; // Importando o arquivo CSS

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' ou 'error'
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage('');  // Limpar mensagens anteriores
        setMessageType('');

        try {
            const response = await fetch('http://127.0.0.1:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Cadastro realizado com sucesso!');
                setMessageType('success');
                setTimeout(() => {
                    router.push('/login');
                }, 2000); // Redireciona para a página de login após 2 segundos
            } else {
                setMessage(data.message || 'Ocorreu um erro ao realizar o cadastro.');
                setMessageType('error');
            }
        } catch (error) {
            setMessage('Erro ao conectar ao servidor.');
            setMessageType('error');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h1>Registro de Usuário</h1>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Registrar</button>
                </form>
                {message && (
                    <p className={`${styles.message} ${messageType === 'success' ? styles.successMessage : styles.errorMessage}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}
