declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
      teamSlug: string;
      admin?: boolean;
    };
  }
}
