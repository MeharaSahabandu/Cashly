const Income = require("../models/Income");

// Add Income
const addIncome = async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;

    // Validation
    if (!title || !amount || !category) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    if (amount <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number" });
    }

    const income = new Income({ title, amount, category, description, date });
    await income.save();

    res.status(201).json({ message: "Income added successfully", income });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Incomes
const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find().sort({ date: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Income
const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findByIdAndDelete(req.params.id);
    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addIncome, getIncomes, deleteIncome };
