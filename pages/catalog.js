import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Catalog.module.css';

const Catalog = () => {
  const [cats, setCats] = useState([
    {
      id: 1,
      name: "Charmoso",
      age: 2,
      description: "Muito fofo e carinhoso.",
      image: "/images/cats/cat1.jpg"
    },
    {
      id: 2,
      name: "Fofo",
      age: 3,
      description: "Carinhoso e brincalhão.",
      image: "/images/cats/cat2.jpg"
    },
    {
      id: 3,
      name: "Tigrinho",
      age: 1,
      description: "Curioso e amigável.",
      image: "/images/cats/cat3.jpg"
    },
    {
      id: 4,
      name: "Chantilly",
      age: 4,
      description: "Sempre alerta e protetor.",
      image: "/images/cats/cat4.jpg"
    },
    {
      id: 5,
      name: "Nero",
      age: 5,
      description: "Brinca o dia inteiro.",
      image: "/images/cats/cat5.jpg"
    },
    {
      id: 6,
      name: "Tião",
      age: 2,
      description: "Adora tirar uma soneca.",
      image: "/images/cats/cat6.jpg"
    }
  ]);

  return (
    <div className={styles.container}>
      {/* Botão de voltar para a tela principal */}
      <Link href="/" passHref>
        <button className={styles.backButton}>Voltar para a Tela Principal</button>
      </Link>
      
      <h1>Gatos Disponíveis para Adoção</h1>
      
      <div className={styles.catalog}>
        {cats.map((cat) => (
          <div key={cat.id} className={styles.catCard}>
            {/* Imagem do gato */}
            <img src={cat.image} alt={cat.name} className={styles.catImage} />
            
            {/* Nome e descrição do gato */}
            <h2 className={styles.catName}>{cat.name}</h2>
            <p className={styles.catDescription}>Idade: {cat.age} anos</p>
            <p className={styles.catDescription}>{cat.description}</p>
            
            {/* Botão de adoção com redirecionamento para o formulário */}
            <Link href={`/adoptionForm?id=${cat.id}`} passHref>
              <button className={styles.adoptButton}>Adotar {cat.name}</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
