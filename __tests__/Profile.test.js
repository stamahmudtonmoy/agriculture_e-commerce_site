// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useAuth } from "../../context/auth";
// import Profile from "../path/to/Profile"; // Update with the correct path

// jest.mock("axios");
// jest.mock("react-hot-toast");
// jest.mock("../../context/auth", () => ({
//   useAuth: jest.fn(),
// }));

// describe("Profile Component", () => {
//   const mockAuth = {
//     user: {
//       name: "John Doe",
//       email: "john@example.com",
//       phone: "1234567890",
//       address: "123 Main St",
//     },
//   };

//   beforeEach(() => {
//     useAuth.mockReturnValue([mockAuth, jest.fn()]);
//   });

//   test("renders profile form with initial user data", () => {
//     render(<Profile />);

//     // Check if input fields contain initial values
//     expect(screen.getByPlaceholderText("Enter Your Name").value).toBe("John Doe");
//     expect(screen.getByPlaceholderText("Enter Your Email ").value).toBe("john@example.com");
//     expect(screen.getByPlaceholderText("Enter Your Phone").value).toBe("1234567890");
//     expect(screen.getByPlaceholderText("Enter Your Address").value).toBe("123 Main St");
//   });

//   test("updates state on input change", () => {
//     render(<Profile />);

//     const nameInput = screen.getByPlaceholderText("Enter Your Name");
//     fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
//     expect(nameInput.value).toBe("Jane Doe");
//   });

//   test("disables the email input field", () => {
//     render(<Profile />);

//     const emailInput = screen.getByPlaceholderText("Enter Your Email ");
//     expect(emailInput).toBeDisabled();
//   });

//   test("submits the form and updates the profile", async () => {
//     axios.put.mockResolvedValue({
//       data: {
//         updatedUser: {
//           name: "Jane Doe",
//           email: "john@example.com",
//           phone: "9876543210",
//           address: "456 Elm St",
//         },
//       },
//     });

//     render(<Profile />);

//     const nameInput = screen.getByPlaceholderText("Enter Your Name");
//     const phoneInput = screen.getByPlaceholderText("Enter Your Phone");
//     const addressInput = screen.getByPlaceholderText("Enter Your Address");
//     const updateButton = screen.getByText("UPDATE");

//     fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
//     fireEvent.change(phoneInput, { target: { value: "9876543210" } });
//     fireEvent.change(addressInput, { target: { value: "456 Elm St" } });
//     fireEvent.click(updateButton);

//     // Wait for the API call
//     await waitFor(() => {
//       expect(axios.put).toHaveBeenCalledWith("/api/v1/auth/profile", {
//         name: "Jane Doe",
//         email: "john@example.com",
//         password: "",
//         phone: "9876543210",
//         address: "456 Elm St",
//       });
//     });

//     // Check that a success toast was shown
//     expect(toast.success).toHaveBeenCalledWith("Profile Updated Successfully");
//   });

//   test("handles form submission errors", async () => {
//     axios.put.mockRejectedValue(new Error("Update failed"));

//     render(<Profile />);

//     const updateButton = screen.getByText("UPDATE");
//     fireEvent.click(updateButton);

//     // Wait for the error toast
//     await waitFor(() => {
//       expect(toast.error).toHaveBeenCalledWith("Something went wrong");
//     });
//   });
// });
