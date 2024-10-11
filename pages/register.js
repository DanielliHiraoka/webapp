import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Register.module.css'; // Importando o arquivo CSS

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState(''); // Campo para o telefone
    const [preferences, setPreferences] = useState(''); // Campo para preferências de adoção
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
                body: JSON.stringify({ username, email, password, phone, preferences }), // Incluindo o telefone e as preferências
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Cadastro realizado com sucesso!');
                setMessageType('success');
                setTimeout(() => {
                    router.push('/profile'); // Redirecionar para a página de perfil
                }, 2000); // Redireciona após 2 segundos
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
                <h1>Cadastro de Adoção</h1>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Nome de Usuário"
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
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Telefone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Preferências de Adoção"
                        value={preferences}
                        onChange={(e) => setPreferences(e.target.value)}
                        rows={5} // Define o número de linhas do textarea
                        className={styles.textareaField}
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
