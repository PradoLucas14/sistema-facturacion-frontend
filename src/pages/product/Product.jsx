import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddProductButton from '../../components/btns/AddProductButton'; // Importa el botón de agregar producto
import Swal from 'sweetalert2'; // Importamos SweetAlert2

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Obtener los productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data);  // Inicializamos los productos filtrados
      } catch (err) {
        setError('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtrar los productos según el texto de búsqueda
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  // Agregar un nuevo producto
  const handleAddProduct = async (newProduct) => {
    try {
      const response = await axios.post('http://localhost:3001/api/products', newProduct);
      const addedProduct = response.data;

      // Actualizar productos y productos filtrados con el nuevo producto
      setProducts(prevProducts => [...prevProducts, addedProduct]);
      setFilteredProducts(prevFiltered => [...prevFiltered, addedProduct]);

      // Alerta de éxito
      Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: 'El producto se ha agregado correctamente.',
        confirmButtonText: 'Aceptar'
      });
    } catch (err) {
      setError('Error al agregar el producto');
      
      // Alerta de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al agregar el producto. Intenta de nuevo.',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <div className="container">
      <h1>Productos</h1>

      {/* Barra de búsqueda */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar por nombre"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* Botón para agregar un producto */}
      <AddProductButton onAddProduct={handleAddProduct} />

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Costo</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product._id}> {/* Usamos _id como key para MongoDB */}
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>${product.costPrice}</td>
                <td>{product.stock}</td>
                <td>
                  <button className="btn btn-primary">Editar</button>
                  <button className="btn btn-danger" style={{ marginLeft: '10px' }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Product;
