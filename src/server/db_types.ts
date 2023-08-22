interface Account {
  id: string; userId: string;
  providerType: string;
  providerId: string;
  providerAccountId: string;
  refreshToken?: string | null;
  accessToken?: string | null;
  accessTokenExpires?: string | null;
  createdAt: string;
  updatedAt: string;
  user: User;
}

interface Session {
  id: string;
  userId: string;
  expires: string;
  sessionToken: string;
  accessToken: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  emailVerified?: string | null;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
  accounts: Account[];
  sessions: Session[];
}

interface VerificationRequest {
  id: string;
  identifier: string;
  token: string;
  expires: string;
  createdAt: string;
  updatedAt: string;
}

type GeneratorClient = {
  provider: string;
};

type DatasourceDB = {
  provider: string;
  url: string;
};

// interface PrismaSchema {
//   generator: GeneratorClient;
//   datasource: DatasourceDB;
//   model: {
//     Account: Account;
//     Session: Session;
//     User: User;
//     VerificationRequest: VerificationRequest;
//   };
// }
//
