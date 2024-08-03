import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DelModal = ({ show, onClose, current_recipe_id }) => {

    const navi = useNavigate();

    useEffect(() => {
        if (show) {
            document.body.style.pointerEvents = "none";
        } else {
            document.body.style.pointerEvents = "auto";
        }
        return () => {
            document.body.style.pointerEvents = "auto";
        };
    }, [show]);

    if (!show) return null;

    const delRecipe = () => {
        fetch(`https://localhost:7230/api/Recipe/${current_recipe_id}`, {
            method: "DELETE",
        }).then((res) => {
            if (res.ok) {
                alert(`Recipe Delete success!!`);
                onClose();
                navi("/RecipeList");
            }
        });
    }

    return (
        <div style={modalStyles.backdrop}>
            <div style={modalStyles.modal}>
                <h2>Recipe Delete</h2>
                <p>Do you want to delete this recipe?</p>
                
                <div>
                    <button onClick={delRecipe} style={{ marginRight: "20px", background:"red"}}>
                        Delete
                    </button>
                    <button onClick={onClose}>
                        Cancel
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
    pointerEvents: "auto",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    pointerEvents: "auto",
    zIndex: 1001,
  },
};

export default DelModal;
