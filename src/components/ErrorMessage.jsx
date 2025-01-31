import "../styles/errorMessage.css";

export const ErrorMessage = ({
  error = "An error ocurred while fetching data. Please try again later.",
}) => {
  return (
    <div class="error">
      <p class="error-message">{error}</p>
      <button class="error-button" onClick={() => window.location.reload()}>
        Try again
      </button>
    </div>
  );
};
