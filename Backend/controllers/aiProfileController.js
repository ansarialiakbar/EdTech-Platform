export const getProfileMatches = async (req, res) => {
    try {
      const { field, grade, interest } = req.body;
  
      // Dummy AI logic (Replace with real AI integration)
      const suggestions = [
        `Best university for ${field} with GPA ${grade}`,
        `Top courses for ${interest}`
      ];
  
      res.json({ suggestions });
    } catch (error) {
      res.status(500).json({ message: "Error matching profile", error });
    }
  };
  