import React from "react";

/**
 * CategoryForm component for creating a new category.
 *
 * @param {Object} props - The component's props.
 * @param {function} props.handleSubmit - Function to handle form submission.
 * @param {string} props.value - The value of the input field.
 * @param {function} props.setValue - Function to update the input field's value.
 * @returns {JSX.Element} A React component that renders a category creation form.
 */
const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
