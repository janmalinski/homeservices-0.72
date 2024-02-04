export namespace AuthDto {
  export type registerDetails = {
    message: string;
  };

  export type verifyRegistrationCodeDetails = {
    message: string;
  };

  export type loginDetails = {
    message: string,
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAt: string;
  };
};

