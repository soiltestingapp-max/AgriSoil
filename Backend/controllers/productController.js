import Product from "../models/product.js";
import SoilReport from "../models/SoilReport.js";

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, sort, page = 1, limit = 6, search } = req.query;

    let filter = {};

    // Search filter
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    // Category filter
    if (category && category !== "All") {
      filter.category = category;
    }

    // Price filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Sorting
    let sortOption = {};
    if (sort === "price_low") sortOption.price = 1;
    if (sort === "price_high") sortOption.price = -1;
    if (sort === "latest") sortOption.createdAt = -1;

    // Pagination
    const skip = (page - 1) * limit;

    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

function buildRecommendationQueryFromReport(report) {
  const crop = (report?.recommendedCrops?.[0] || "").trim();
  const soilAnalysis = report?.soilAnalysis || {};
  const soilData = report?.soilData || {};

  const categories = new Set(["Soil Kits", "Seeds"]);
  const keywords = new Set();

  if (crop) {
    keywords.add(crop);
    keywords.add("seed");
    keywords.add("seeds");
  }

  const anyLow =
    soilAnalysis.nitrogen_status === "Low" ||
    soilAnalysis.phosphorus_status === "Low" ||
    soilAnalysis.potassium_status === "Low";

  if (anyLow) categories.add("Fertilizers");

  // pH correction often maps to fertilizers/soil amendments
  if (soilAnalysis.ph_status === "Acidic" || soilAnalysis.ph_status === "Alkaline") {
    categories.add("Fertilizers");
    keywords.add("pH");
    keywords.add("lime");
    keywords.add("sulfur");
  }

  // very rough irrigation heuristic
  if (typeof soilData.rainfall === "number" && soilData.rainfall < 60) {
    categories.add("Irrigation");
    keywords.add("drip");
    keywords.add("irrigation");
  }

  // map low nutrients to common product words
  if (soilAnalysis.nitrogen_status === "Low") keywords.add("nitrogen");
  if (soilAnalysis.phosphorus_status === "Low") keywords.add("phosphorus");
  if (soilAnalysis.potassium_status === "Low") keywords.add("potassium");

  // also mine AI suggestions for searchable terms
  for (const item of report?.fertilizerPlan || []) {
    if (typeof item?.suggestion === "string" && item.suggestion.trim()) {
      keywords.add(item.suggestion);
    }
  }

  return {
    crop,
    categories: Array.from(categories),
    keywords: Array.from(keywords),
  };
}

export const getRecommendedProducts = async (req, res) => {
  try {
    const { reportId, limit = 6 } = req.query;

    if (!reportId) {
      return res.status(400).json({ message: "reportId is required" });
    }

    const report = await SoilReport.findById(reportId);
    if (!report) return res.status(404).json({ message: "Soil report not found" });

    // Only allow owner to use their report for recommendations
    if (String(report.user) !== String(req.user.id)) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const rec = buildRecommendationQueryFromReport(report);

    const keywordRegexes = rec.keywords
      .map((k) => k && String(k).trim())
      .filter(Boolean)
      .slice(0, 12)
      .map((k) => new RegExp(k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));

    const textOr = keywordRegexes.length
      ? [
          { name: { $in: keywordRegexes } },
          { category: { $in: keywordRegexes } },
          { description: { $in: keywordRegexes } },
        ]
      : [];

    const query = {
      isActive: true,
      $and: [
        { category: { $in: rec.categories } },
        ...(textOr.length ? [{ $or: textOr }] : []),
      ],
    };

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    res.json({
      products,
      meta: {
        crop: rec.crop,
        categories: rec.categories,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
