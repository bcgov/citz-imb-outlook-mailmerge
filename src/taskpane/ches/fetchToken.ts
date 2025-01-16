export const fetchToken = async (): Promise<Response> => {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", "CDACC9DF-533F3C5CC65");
  params.append("client_secret", "WbTyLnRUh3OlPuGTY5G8P9hZ2zFonaxr");
  params.append("scope", "openid");

  console.log("params", params.toString());

  const response = await fetch(
    "https://dev.loginproxy.gov.bc.ca/auth/realms/comsvcauth/protocol/openid-connect/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    }
  );

  return response;
};
