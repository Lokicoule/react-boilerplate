import { PageError } from "../components/PageError";

export const Error403Page: React.FunctionComponent = () => {
  const redirect = {
    to: "/home",
    label: "Go to home page",
  };

  return (
    <PageError
      title="403"
      description="Sorry, you are not authorized to access this page."
      redirect={redirect}
    />
  );
};
