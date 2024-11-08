import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AdoptionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    reason: '',
  });
  const [cat, setCat] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchCat = async () => {
        try {
          const response = await fetch(`/api/cats/${id}`);
          const data = await response.json();
          setCat(data);
        } catch (error) {
          console.error('Erro ao buscar detalhes do gato:', error);
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
    try {
      const response = await fetch('/api/adoption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, catId: id }),
      });
      if (response.ok) {
        alert('Proposta enviada com sucesso!');
        router.push('/catalog');
      } else {
        alert('Erro ao enviar a proposta.');
      }
    } catch (error) {
      console.error('Erro ao enviar a proposta:', error);
    }
  };

  return (
    <div>
      <h2>Proposta de Adoção para {cat?.name}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Seu Nome"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          name="contact"
          placeholder="Contato"
          value={formData.contact}
          onChange={handleChange}
        />
        <textarea
          name="reason"
          placeholder="Por que deseja adotar?"
          value={formData.reason}
          onChange={handleChange}
        />
        <button type="submit">Enviar Proposta</button>
      </form>
    </div>
  );
};

export default AdoptionForm;
