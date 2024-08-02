import React from "react";
import { useState } from "react";

const Modal = ({ show, onClose, onAdd }) => {
  const [ingredientName, setIngredientName] = useState("");
  if (!show) return null;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const addIngre = () => {
    if (ingredientName) {
      fetch(`https://localhost:7230/api/Ingredient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: capitalizeFirstLetter(ingredientName),
        }),
      }).then((res) => {
        if (res.ok) {
          alert(`Ingredient save success!!`);
          setIngredientName("");
          onAdd(capitalizeFirstLetter(ingredientName));
          onClose();
        } else if (res.status === 422) {
          alert("Already Exist same Ingredient.");
        }
      });
    }
  };

  const handleAddClick = () => {
    if (ingredientName) {
      const isConfirmed = confirm(
        "Are you sure you want to add this ingredient?"
      );
      if (isConfirmed) {
        addIngre();
      }
    } else {
      alert("Please enter an ingredient name.");
    }
  };

  return (
    <div style={modalStyles.backdrop}>
      <div style={modalStyles.modal}>
        <h2>Add Ingredient</h2>
        <p>Here you can add a new ingredient.</p>
        <div className="input_area">
          <input
            type="text"
            value={ingredientName}
            onChange={(e) => setIngredientName(e.target.value)}
            placeholder="Enter ingredient name"
          />
        </div>
        <div>
          <button
            onClick={handleAddClick}
            style={{ marginRight: "20px" }}
            type="button"
          >
            Add
          </button>
          <button onClick={onClose} type="button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const modalStyles = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
};

export default Modal;
