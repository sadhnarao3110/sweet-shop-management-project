const sweetItems: any[] = [];

const addSweetItem = (req: any, res: any) => {
  const { name, category, price, quantity } = req.body;

  if (!name || !category || price == null || quantity == null) {
    return res.status(400).json({ error: "All sweet details required" });
  }

  const newSweet = {
    id: sweetItems.length + 1,
    name,
    category,
    price,
    quantity
  };

  sweetItems.push(newSweet);

  return res.status(201).json({
    message: "Sweet added successfully",
    sweet: newSweet
  });
};


const getAllSweets = (req: any, res: any) => {
  return res.status(200).json(sweetItems);
};

const updateSweetItem = (req: any, res: any) => {
  const sweetId = Number(req.params.id);
  const { name, category, price, quantity } = req.body;

  const sweet = sweetItems.find((s) => s.id === sweetId);

  if (!sweet) {
    return res.status(404).json({ error: "Sweet not found" });
  }

  if (name) sweet.name = name;
  if (category) sweet.category = category;
  if (price != null) sweet.price = price;
  if (quantity != null) sweet.quantity = quantity;

  return res.json({
    message: "Sweet updated successfully",
    sweet
  });
};


const deleteSweetItem = (req: any, res: any) => {
  const sweetId = Number(req.params.id);

  const index = sweetItems.findIndex((s) => s.id === sweetId);

  if (index === -1) {
    return res.status(404).json({ error: "Sweet not found" });
  }

  sweetItems.splice(index, 1);

  return res.json({ message: "Sweet deleted successfully" });
};

const purchaseSweet = (req: any, res: any) => {
  const sweetId = Number(req.params.id);

  const sweet = sweetItems.find((s) => s.id === sweetId);

  if (!sweet) {
    return res.status(404).json({ error: "Sweet not found" });
  }

  if (sweet.quantity <= 0) {
    return res.status(400).json({ error: "Sweet out of stock" });
  }

  sweet.quantity -= 1;

  return res.json({
    message: "Sweet purchased successfully",
    sweet
  });
};

// =====================
// RESTOCK SWEET (ADMIN)
// =====================
const restockSweet = (req: any, res: any) => {
  const sweetId = Number(req.params.id);
  const { quantity } = req.body;

  const sweet = sweetItems.find((s) => s.id === sweetId);

  if (!sweet) {
    return res.status(404).json({ error: "Sweet not found" });
  }

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ error: "Invalid restock quantity" });
  }

  sweet.quantity += quantity;

  return res.json({
    message: "Sweet restocked successfully",
    sweet
  });
};
module.exports = {
  addSweetItem,
  getAllSweets,
  updateSweetItem,
  deleteSweetItem,
  purchaseSweet,
  restockSweet
};

export {};
