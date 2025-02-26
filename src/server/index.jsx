export const registerUser = async (body) => {
  let status;
  try {
    const response = await fetch(
      "https://take-home-test-api.nutech-integrasi.com/registration",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        // {
        //     email: "user@nutech-integrasi.com",
        //     first_name: "User",
        //     last_name: "Nutech",
        //     password: "abcdef1234"
        //   }
      }
    );

    status = await response.json();
    console.log("Response:", status);
  } catch (error) {
    console.error("Error:", error);
  }
  return status;
};

export const loginUser = () => {
    
}
