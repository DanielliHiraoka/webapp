import React from 'react';

const Home = () => {
  const products = [
    { id: 1, name: 'Produto 1', price: 29.99 },
    { id: 2, name: 'Produto 2', price: 49.99 },
    { id: 3, name: 'Produto 3', price: 19.99 },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Loja Online</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
            <h3>{product.name}</h3>
            <p>Preço: R${product.price.toFixed(2)}</p>
            <button>Comprar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
