import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const userId = "john_doe_17091999";
const email = "john@xyz.com";
const rollNumber = "ABCD123";
const operationCode = "OPERATION_CODE_12345";

// POST /api/data endpoint
app.post("/api/data", (req, res) => {
  const { data } = req.body;

  console.log(data);
  if (!data || !Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: "Invalid input: 'data' must be an array.",
    });
  }

  const numbersArray = [];
  const alphabetsArray = [];
  const lowercaseAlphabets = [];

  data.forEach((item) => {
    if (!isNaN(item)) {
      // Check if item is a number
      numbersArray.push(item);
    } else if (/[a-zA-Z]/.test(item)) {
      // Check if item is an alphabet
      alphabetsArray.push(item);
      if (/[a-z]/.test(item)) {
        lowercaseAlphabets.push(item);
      }
    }
  });

  const highestLowercase =
    lowercaseAlphabets.length > 0
      ? lowercaseAlphabets.sort().reverse()[0]
      : null;

  const response = {
    is_success: true,
    user_id: userId,
    email,
    roll_number: rollNumber,
    numbers: numbersArray,
    alphabets: alphabetsArray,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
  };

  res.status(200).json(response);
});

// GET /api/data endpoint
app.get("/api/data", (req, res) => {
  res.json({ operation_code: operationCode });
});

app.post("/bfhl", (req, res) => {
  const { first_name, last_name, dob } = req.body;

  if (!first_name || !last_name || !dob) {
    return res.status(400).json({
      is_success: false,
      message: "Missing required fields: first_name, last_name, dob",
    });
  }

  // Format dob to ddmmyyyy
  const formattedDob = dob.split("-").reverse().join("");
  const user_id = `${first_name.toLowerCase()}_${last_name.toLowerCase()}_${formattedDob}`;

  // Respond with user_id and success status
  res.status(200).json({
    user_id,
    is_success: true,
  });
});

// GET /bfhl endpoint
app.get("/bfhl", (req, res) => {
  // Hardcoded response
  res.status(200).json({
    operation_code: 1,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
