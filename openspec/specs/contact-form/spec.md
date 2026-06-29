## ADDED Requirements

### Requirement: Contact form uses floating-label inputs
The contact section SHALL render a `<section>` with `aria-label="Contact"` containing a `<form>` with floating-label input fields for: Name, Email, Subject, and Message. Floating labels SHALL animate from a placeholder position inside the input to a label position above the input when the field receives focus or contains a value.

#### Scenario: Label floats on focus
- **WHEN** a user clicks into an empty input field
- **THEN** the label animates upward to a floating position above the input border within 200ms using a CSS transition or Framer Motion

#### Scenario: Label stays floated when field has value
- **WHEN** a user types into a field and then tabs away
- **THEN** the label remains in the floated position as long as the field contains a non-empty value

#### Scenario: Label returns on empty blur
- **WHEN** a user focuses a field, types nothing, and tabs away
- **THEN** the label returns to the placeholder position inside the input

### Requirement: Contact form validates inputs before submission
The form SHALL validate: Name (non-empty), Email (valid RFC 5322 format), Subject (non-empty), Message (min 10 characters). Validation SHALL display inline error messages adjacent to each invalid field. The submit button SHALL be disabled while the form is in an invalid state.

#### Scenario: Invalid email shows error
- **WHEN** a user types an invalid email address and blurs the email field
- **THEN** an error message ("Enter a valid email address") appears below the field

#### Scenario: Submit is disabled on invalid form
- **WHEN** any required field is empty or invalid
- **THEN** the submit button has the `disabled` attribute and cannot be clicked

### Requirement: Contact form submits to a serverless API route
Form submission SHALL POST to `/api/contact` (a Next.js API route) which sends an email via Resend. On success, the form SHALL display a confirmation message and reset. On server error, the form SHALL display a generic error message without data loss.

#### Scenario: Successful submission shows confirmation
- **WHEN** all fields are valid and the user submits the form
- **THEN** a success message ("Message sent! I'll be in touch soon.") replaces the form
- **THEN** the form fields are reset to empty

#### Scenario: Server error preserves form data
- **WHEN** the `/api/contact` endpoint returns a non-2xx response
- **THEN** an error message is displayed below the submit button
- **THEN** all field values are preserved so the user does not lose their input
