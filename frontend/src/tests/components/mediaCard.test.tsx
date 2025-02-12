import React from "react";
import { render, screen } from "@testing-library/react";
import MediaCard from "../../components/mediaCard"; // Make sure it's the correct import

const mockProductItem = {
  images: ["https://via.placeholder.com/150"],
  title: "Test Product",
  rating: 4.5,
  reviews: [{}, {}, {}], // Mock reviews (3 reviews)
  price: 29.99,
};

describe("MediaCard Component", () => {
  it("renders the product card correctly with the provided props", () => {
    render(<MediaCard productItem={mockProductItem} />);

    // Check if the title is rendered
    expect(screen.getByText("Test Product")).toBeInTheDocument();

    // Check if the image is rendered
    const img = screen.getAllByRole("img");
    expect(img[0]).toHaveAttribute("title", mockProductItem.title);

    // // Check if the rating is rendered
    // const rating = screen.getByRole("textbox"); // Rating component renders as a textbox
    // expect(rating).toHaveValue(mockProductItem.rating.toString());

    // // Check if reviews count is displayed correctly
    // expect(screen.getByText("3 Reviews")).toBeInTheDocument();

    // // Check if the price is displayed correctly
    expect(screen.getByText("$29.99")).toBeInTheDocument();
  });

  // it("should render the correct number of reviews", () => {
  //   render(<MediaCard productItem={mockProductItem} />);
  //   expect(screen.getByText("3 Reviews")).toBeInTheDocument();
  // });

  // it("should render the correct product price", () => {
  //   render(<MediaCard productItem={mockProductItem} />);
  //   expect(screen.getByText("$29.99")).toBeInTheDocument();
  // });

  // it("renders the rating with the correct value and precision", () => {
  //   render(<MediaCard productItem={mockProductItem} />);
    
  //   // Rating component is rendered with correct precision and value
  //   const rating = screen.getByRole("textbox"); // Rating component renders as a textbox
  //   expect(rating).toHaveValue(mockProductItem.rating.toString());
  // });

  // it("should have the correct alt text for the image", () => {
  //   render(<MediaCard productItem={mockProductItem} />);
  //   const img = screen.getByRole("img");
  //   expect(img).toHaveAttribute("alt", mockProductItem.title);
  // });

  // it("renders the card component with correct styles", () => {
  //   render(<MediaCard productItem={mockProductItem} />);
  //   const card = screen.getByRole("article"); // The root Card component
  //   expect(card).toHaveStyle("max-width: 345px"); // Check max-width
  // });
});
