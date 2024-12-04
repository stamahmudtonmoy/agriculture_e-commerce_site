// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { BrowserRouter as Router } from "react-router-dom";
// import axios from "axios";
// import MockAdapter from "axios-mock-adapter";
// import UpdateProduct from "../path/to/UpdateProduct"; // Update the path to the component
// import { ToastProvider } from "react-toast-notifications";
//
// // Mock Axios instance
// const mock = new MockAdapter(axios);
//
// describe("UpdateProduct Component", () => {
//  beforeEach(() => {
//    mock.reset();
//  });
//
//  test("renders update product form with pre-filled data", async () => {
//    // Mock the single product API response
//    mock.onGet("/api/v1/product/get-product/test-slug").reply(200, {
//      product: {
//        _id: "123",
//        name: "Test Product",
//        description: "Test Description",
//        price: 100,
//        quantity: 10,
//        shipping: true,
//        category: { _id: "cat1", name: "Category 1" },
//      },
//    });
//
//    // Mock the categories API response
//    mock.onGet("/api/v1/category/get-category").reply(200, {
//      success: true,
//      category: [{ _id: "cat1", name: "Category 1" }, { _id: "cat2", name: "Category 2" }],
//    });
//
//    render(
//      <ToastProvider>
//        <Router>
//          <UpdateProduct />
//        </Router>
//      </ToastProvider>
//    );
//
//    // Wait for the product data to be fetched and displayed
//    await waitFor(() => {
//      expect(screen.getByDisplayValue("Test Product")).toBeInTheDocument();
//      expect(screen.getByDisplayValue("Test Description")).toBeInTheDocument();
//      expect(screen.getByDisplayValue("100")).toBeInTheDocument();
//      expect(screen.getByDisplayValue("10")).toBeInTheDocument();
//    });
//
//    // Check category dropdown
//    expect(screen.getByText("Category 1")).toBeInTheDocument();
//   expect(screen.getByText("Category 2")).toBeInTheDocument();
//  });
//
//  test("updates a product successfully", async () => {
//    // Mock APIs
//    mock.onGet("/api/v1/product/get-product/test-slug").reply(200, {
//      product: {
//        _id: "123",
//        name: "Test Product",
//        description: "Test Description",
//        price: 100,
//        quantity: 10,
//        shipping: true,
//        category: { _id: "cat1", name: "Category 1" },
//      },
//    });
//
//    mock.onPut("/api/v1/product/update-product/123").reply(200, {
//      success: true,
//    });
//
//    render(
//      <ToastProvider>
//        <Router>
//         <UpdateProduct />
//        </Router>
//      </ToastProvider>
//    );
//
//    // Wait for data to load
//    await waitFor(() => {
//      expect(screen.getByDisplayValue("Test Product")).toBeInTheDocument();
//    });
//
//    // Update input fields
//   fireEvent.change(screen.getByPlaceholderText("write a name"), {
//      target: { value: "Updated Product" },
//    });
//
//    fireEvent.click(screen.getByText("UPDATE PRODUCT"));
//
//    // Verify success toast
//    await waitFor(() => {
//      expect(screen.getByText("Product Updated Successfully")).toBeInTheDocument();
//    });
//  });
//
//  test("deletes a product successfully", async () => {
//    // Mock APIs
//    mock.onGet("/api/v1/product/get-product/test-slug").reply(200, {
//     product: {
//        _id: "123",
//        name: "Test Product",
//        description: "Test Description",
//       price: 100,
//        quantity: 10,
//        shipping: true,
//        category: { _id: "cat1", name: "Category 1" },
//      },
//    });
//
//    mock.onDelete("/api/v1/product/delete-product/123").reply(200, {
//      success: true,
//    });
//
//    // Mock window.prompt
//    const mockPrompt = jest.spyOn(window, "prompt").mockReturnValue("Yes");
//
//    render(
//      <ToastProvider>
//        <Router>
//          <UpdateProduct />
//        </Router>
//      </ToastProvider>
//    );
//
//    // Wait for data to load
//  await waitFor(() => {
//      expect(screen.getByDisplayValue("Test Product")).toBeInTheDocument();
//    });
//
//    // Click delete button
//    fireEvent.click(screen.getByText("DELETE PRODUCT"));
//
//    // Verify delete confirmation
//    await waitFor(() => {
//      expect(screen.getByText("Product DEleted Succfully")).toBeInTheDocument();
//  });
//
//    mockPrompt.mockRestore();
//  });
//
//  test("shows error toast when API fails", async () => {
//   // Mock APIs with failure responses
//    mock.onGet("/api/v1/product/get-product/test-slug").reply(500);
//    mock.onGet("/api/v1/category/get-category").reply(500);
//
//    render(
//      <ToastProvider>
//        <Router>
//          <UpdateProduct />
//        </Router>
//       </ToastProvider>
//    );
//
//    // Wait for error toast
//    await waitFor(() => {
//      expect(screen.getByText("Something wwent wrong in getting catgeory")).toBeInTheDocument();
//    });
//  });
// });
