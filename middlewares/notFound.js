const notFound = (req, res) => {
    res.status(404).json({
      message: "Route not found",
      error: "The route you're looking for does not exist.",
    });
  };
  
  module.exports = notFound;
  