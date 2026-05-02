import { useActionState } from "react";
import {
  isEmail,
  isNotEmpty,
  isEqualToOtherValue,
  hasMinLength,
} from "../util/validation";

export default function Signup() {
  const signupAction = (prevFormState, formData) => {
    const enteredEmail = formData.get("email");
    const enteredPassword = formData.get("password");
    const enteredConfirmPassword = formData.get("confirm-password");
    const enteredFirstName = formData.get("first-name");
    const enteredLastName = formData.get("last-name");
    const selectedRole = formData.get("role");
    const acquisitionChannels = formData.getAll("acquisition");
    const terms = formData.get("terms");

    let errors = [];

    if (!isEmail(enteredEmail)) {
      errors.push("Invalid email address");
    }

    if (!isNotEmpty(enteredPassword) || !hasMinLength(enteredPassword, 6)) {
      errors.push("Password must be at least 6 characters long");
    }

    if (!isEqualToOtherValue(enteredPassword, enteredConfirmPassword)) {
      errors.push("Passwords do not match");
    }

    if (!isNotEmpty(enteredFirstName) || !isNotEmpty(enteredLastName)) {
      errors.push("Please enter your first and last name");
    }

    if (!isNotEmpty(selectedRole)) {
      errors.push("Please select a role");
    }

    if (!terms) {
      errors.push("You must agree to the terms and conditions");
    }

    if (acquisitionChannels.length === 0) {
      errors.push("Please select at least one acquisition channel");
    }

    if (errors.length > 0) {
      return { errors };
    }

    return { errors: null };
  };

  const [formState, formAction, pending] = useActionState(signupAction, {
    errors: null,
  });

  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" />
        </div>
      </div>

      <div className="control">
        <label htmlFor="role">What best describes your role?</label>
        <select id="role" name="role">
          <option value="">Select a role</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>

        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="other"
            name="acquisition"
            value="other"
          />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />
          I agree to the terms and conditions
        </label>
      </div>

      {formState.errors && (
        <ul className="error">
          {formState.errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button" disabled={pending}>
          {pending ? "Submitting..." : "Sign up"}
        </button>
      </p>
    </form>
  );
}