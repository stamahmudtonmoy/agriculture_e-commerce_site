// import React from "react";
// import { render, screen, waitFor } from "@testing-library/react";
// import { BrowserRouter as Router } from "react-router-dom";
// import axios from "axios";
// import MockAdapter from "axios-mock-adapter";
// import Products from "../path/to/Products"; // Update the import path accordingly
// import { ToastProvider } from "react-toast-notifications";

// // Create a mock Axios instance
// const mock = new MockAdapter(axios);

// describe("Products Component", () => {
//  afterEach(() => {
//    mock.reset(); // Reset mock after each test
//  });

//  test("renders products list successfully", async () => {
//    // Mock the API response
//    mock.onGet("/api/v1/product/get-product").reply(200, {
//      products: [
//        {
//          _id: "1",
//          slug: "product-1",
//          name: "Product 1",
//          description: "Description 1",
//        },
//       {
//          _id: "2",
//          slug: "product-2",
//          name: "Product 2",
//          description: "Description 2",
//        },
//      ],
//    });
//
//    // Render the component
//    render(
//      <ToastProvider>
//        <Router>
//          <Products />
//        </Router>
//      </ToastProvider>
//    );
//
//    // Verify the loading state and then the rendered products
//    await waitFor(() => {
//      expect(screen.getByText("All Products List")).toBeInTheDocument();
//    });
//
//    // Verify product elements
//    expect(screen.getByText("Product 1")).toBeInTheDocument();
//    expect(screen.getByText("Product 2")).toBeInTheDocument();
//    expect(screen.getByText("Description 1")).toBeInTheDocument();
//    expect(screen.getByText("Description 2")).toBeInTheDocument();
//  });

//  test("displays error toast on API failure", async () => {
//    // Mock a failed API response
//    mock.onGet("/api/v1/product/get-product").reply(500);
//
//    // Mock toast implementation (optional)
//    jest.spyOn(console, "error").mockImplementation(() => {}); // Suppress console.error
//
//    render(
//      <ToastProvider>
//        <Router>
//          <Products />
//        </Router>
//      </ToastProvider>
//    );
//
//    // Wait for the error toast to appear
//    await waitFor(() => {
//      expect(screen.getByText("Someething Went Wrong")).toBeInTheDocument();
//    });
//
//    console.error.mockRestore(); // Restore console.error
//  });
// });
