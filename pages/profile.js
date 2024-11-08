import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Profile.module.css';  

export default function Profile() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [preferences, setPreferences] = useState('');
    const [address, setAddress] = useState('');  
    const [city, setCity] = useState('');        
    const [state, setState] = useState('');      
    const [postalCode, setPostalCode] = useState(''); 
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Carregar dados do perfil do usuário
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/profile', {
                    method: 'GET',
                    credentials: 'include'
                });
                const data = await response.json();
                if (response.ok) {
                    setUsername(data.username);
                    setEmail(data.email);
                    setPhone(data.phone);
                    setPreferences(data.preferences);
                    setAddress(data.address);       
                    setCity(data.city);             
                    setState(data.state);           
                    setPostalCode(data.postal_code); 
                } else {
                    if (response.status === 401) {
                        setError('Usuário não autenticado. Redirecionando para o login...');
                        setTimeout(() => router.push('/login'), 2000);
                    } else {
                        setMessage(data.message || 'Erro ao carregar perfil.');
                    }
                }
            } catch (error) {
                setMessage('Erro ao se conectar ao servidor.');
            }
        };
        fetchProfile();
    }, [router]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    username, email, phone, preferences, address, city, state, postalCode  
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Perfil atualizado com sucesso!');
            } else {
                setMessage(data.message || 'Erro ao atualizar perfil.');
            }
        } catch (error) {
            setMessage('Erro ao se conectar ao servidor.');
        }
    };

    return (
        <div className={styles.profileContainer}>
            <h1>Minha Conta</h1>
            {error ? (
                <p className={styles.errorMessage}>{error}</p>
            ) : (
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
                    <label>Telefone:</label>
                    <input
                        className={styles.inputField}
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <label>Endereço:</label> 
                    <input
                        className={styles.inputField}
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <label>Cidade:</label> 
                    <input
                        className={styles.inputField}
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <label>Estado:</label> 
                    <input
                        className={styles.inputField}
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                    <label>CEP:</label> 
                    <input
                        className={styles.inputField}
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                    <label>Preferências de Adoção:</label>
                    <textarea
                        className={styles.inputField}
                        value={preferences}
                        onChange={(e) => setPreferences(e.target.value)}
                    />
                    <div className={styles.buttonContainer}>
                        <button className={styles.saveButton} type="submit">Salvar Alterações</button>
                        <button className={styles.backButton} type="button" onClick={() => router.push('/')}>
                            Voltar para Home
                        </button>
                    </div>
                </form>
            )}
            {message && <p>{message}</p>}
        </div>
    );
}
