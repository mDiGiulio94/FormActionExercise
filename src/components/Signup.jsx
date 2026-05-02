import { useDebugValue } from "react";
import { isEmail, isNotEmpty, isEqualToOtherValue, isMinLength, hasMinLength } from "../util/validation";

export default function Signup() {

// il formData conterrà tutte le informazioni del form, con i nomi dei campi come chiavi e i valori inseriti dall'utente come valori
  const signupAction = (formData) => {
    // gli input vanno sempre nominati
    const enteredEmail = formData.get("email");
    const enteredPassword = formData.get("password");
    const enteredConfirmPassword = formData.get("confirm-password");
    const enteredFirstName = formData.get("first-name");
    const enteredLastName = formData.get("last-name");
    const selectedRole = formData.get("role");
    const acquisitionChannels = formData.getAll("acquisition");

    let error = [];

    if(isEmail(enteredEmail)) {
      error.push('Invalid Email Address')
    }
    if(isNotEmpty(enteredPassword) || !hasMinLength(enteredPassword, 6)) {
      error.push('Password cannot be empty')
    }
    if(!isEqualToOtherValue(enteredPassword, enteredConfirmPassword)) {
      error.push('Passwords do not match')
    }
    if(!isNotEmpty(enteredFirstName) || !isNotEmpty(enteredLastName)  ) {
      error.push('Please enter your first and last name')
    }

    if(!isNotEmpty(selectedRole)) {
      error.push('Please select a role')
    }

    if(!terms){
      error.push('You must agree to the terms and conditions')
    }

    if(acquisitionChannels.length === 0) {
      error.push('Please select at least one acquisition channel')
    }

  }



  return (
    <form action={signupAction}>
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
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role">
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
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />I
          agree to the terms and conditions
        </label>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}
