import { useEffect, useState } from "react";
import { getAllSweets, purchaseSweet } from "../services/sweetService";

import gulabJamun from "../assets/gulab-jamun.jpg";
import kajuKatli from "../assets/kaju-katli.jpg";
import rasgulla from "../assets/rasgulla.jpg";
import ladoo from "../assets/ladoo.jpg";
import barfi from "../assets/barfi.jpg";

const sweetImages: any = {
  "Gulab Jamun": gulabJamun,
  "Kaju Katli": kajuKatli,
  "Rasgulla": rasgulla,
  "Ladoo": ladoo,
  "Barfi": barfi
};

function Sweets({ setCartCount }: any) {
  const [sweets, setSweets] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const fetchSweets = async () => {
    const data = await getAllSweets();
    setSweets(data);
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handlePurchase = async (id: number) => {
    await purchaseSweet(id);
    setCartCount((prev: number) => prev + 1);
    fetchSweets();
  };

  const filteredSweets = sweets.filter((sweet) =>
    sweet.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* ================= SEARCH BAR ================= */}
      <div className="top-bar">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            placeholder="Search sweets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* ================= SWEETS GRID ================= */}
      <div className="grid-container">
        {filteredSweets.map((sweet) => (
          <div className="sweet-card" key={sweet.id}>
            <img
              src={sweetImages[sweet.name]}
              alt={sweet.name}
              className="sweet-img"
            />

            <h3>{sweet.name}</h3>
            <p className="category">{sweet.category}</p>
            <p className="price">₹{sweet.price}</p>
            <p className="qty">Available: {sweet.quantity}</p>

            <button
              className="add-btn"
              disabled={sweet.quantity === 0}
              onClick={() => handlePurchase(sweet.id)}
            >
              {sweet.quantity === 0 ? "Out of Stock" : "+ Add"}
            </button>
          </div>
        ))}
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="contact-footer">
        <div className="footer-content">
          <h2 className="footer-title">Sweet Shop 🍬</h2>

          <p>📍 Shop No. 9, Chandigarh – 140413</p>
          <p>📞 +91 98765 43210</p>
          <p>📧 sweetshop@gmail.com</p>
          <p>⏰ Mon – Sun : 9:00 AM – 10:00 PM</p>

          <p className="footer-quote">
            “Life is short, eat the sweets first 🍭”
          </p>

          <p className="footer-copy">
            © 2025 Sweet Shop. Made with ❤️
          </p>
        </div>
      </footer>
    </>
  );
}

export default Sweets;



