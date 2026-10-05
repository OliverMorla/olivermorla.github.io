import Input from "@/components/ui/input";
import { Rating } from "@/modules/testimonial/components/card";
import { render, screen } from "@testing-library/react";

describe("Input", () => {
  it("ties the visible label and error message to the control", () => {
    render(
      <Input name="email" label="Email" error="Enter a valid email address." />,
    );

    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Enter a valid email address.");
  });

  it("is not marked invalid without an error", () => {
    render(<Input name="firstName" label="First name" />);

    expect(screen.getByLabelText("First name")).not.toHaveAttribute(
      "aria-invalid",
    );
  });
});

describe("Rating", () => {
  it("announces the testimonial's actual rating", () => {
    render(<Rating value={4} />);

    expect(
      screen.getByRole("img", { name: "Rated 4 out of 5" }),
    ).toBeInTheDocument();
  });

  it("clamps out-of-range ratings", () => {
    render(<Rating value={9} />);

    expect(
      screen.getByRole("img", { name: "Rated 5 out of 5" }),
    ).toBeInTheDocument();
  });
});
