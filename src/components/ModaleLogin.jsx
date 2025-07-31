export default function ModaleLogin(prop) {
  return (
    <>
      <form onSubmit={prop.onSubmit} class="mb-3">
        <label for="" class="form-label">
          Email
        </label>
        <input
          type="email"
          class="form-control"
          name="email"
          id="email"
          aria-describedby="emailHelpId"
          placeholder="abc@mail.com"
          onChange={prop.onChange}
          value={prop.email}
        />
        <small id="emailHelpId" class="form-text text-muted">
          Help text
        </small>
        <button type="submit" class="btn btn-primary">
          {" "}
          Submit
        </button>
      </form>
    </>
  );
}
