import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/AdoptionForm.module.css'; // Adicione um arquivo CSS para estilos personalizados.

const AdoptionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    reason: '',
  });
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // Novo estado para mensagem de sucesso
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchCat = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:5000/api/cats/${id}`);
          if (!response.ok) {
            throw new Error("Erro ao buscar os dados do gato.");
          }
          const data = await response.json();
          setCat(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchCat();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.contact || !formData.reason) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/adoption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, catId: id }),
      });

      if (response.ok) {
        setSuccessMessage('Proposta enviada com sucesso!'); // Define a mensagem de sucesso
        setFormData({
          name: '',
          contact: '',
          reason: '',
        }); // Reseta o formulário
      } else {
        alert('Erro ao enviar a proposta.');
      }
    } catch (error) {
      console.error('Erro ao enviar a proposta:', error);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => router.push('/catalog')}>Voltar ao Catálogo</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {cat ? (
        <>
          <h2 className={styles.title}>Proposta de Adoção para {cat.name}</h2>
          {successMessage && ( // Exibe a mensagem de sucesso se ela existir
            <p className={styles.successMessage}>{successMessage}</p>
          )}
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              className={styles.input}
              name="name"
              placeholder="Seu Nome"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              className={styles.input}
              name="contact"
              placeholder="Contato"
              value={formData.contact}
              onChange={handleChange}
              required
            />
            <textarea
              className={styles.textarea}
              name="reason"
              placeholder="Por que deseja adotar?"
              value={formData.reason}
              onChange={handleChange}
              required
            />
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.submitButton}>
                Enviar Proposta
              </button>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => router.push('/catalog')}
              >
                Cancelar
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>Carregando dados do gato...</p>
      )}
    </div>
  );
};

export default AdoptionForm;
