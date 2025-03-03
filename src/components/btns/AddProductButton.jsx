import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';  // Asegúrate de tener react-bootstrap instalado
import Swal from 'sweetalert2'; // Importamos SweetAlert2

const AddProductButton = ({ onAddProduct }) => {
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    costPrice: '',
    stock: ''
  });

  // Abrir el modal
  const handleShow = () => setShowModal(true);

  // Cerrar el modal
  const handleClose = () => {
    setShowModal(false);
    setNewProduct({
      name: '',
      price: '',
      costPrice: '',
      stock: ''
    });
  };

  // Manejar cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Enviar el nuevo producto
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.costPrice || !newProduct.stock) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos del formulario.',
        confirmButtonText: 'Aceptar'
      });
    } else {
      onAddProduct(newProduct); // Llamar a la función para agregar el producto
      handleClose(); // Cerrar el modal después de enviar el producto
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Agregar Producto
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Precio</label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
                required
                min="0"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="costPrice" className="form-label">Costo</label>
              <input
                type="number"
                className="form-control"
                id="costPrice"
                name="costPrice"
                value={newProduct.costPrice}
                onChange={handleChange}
                required
                min="0"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="stock" className="form-label">Stock</label>
              <input
                type="number"
                className="form-control"
                id="stock"
                name="stock"
                value={newProduct.stock}
                onChange={handleChange}
                required
                min="0"
              />
            </div>
            <Button variant="primary" type="submit">
              Agregar Producto
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddProductButton;
