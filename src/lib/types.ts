


export type CryptoData = {
  [key: string]: {
    usd: number;
    usd_24h_change: number;
  };
};

export type Transaction = {
  id: string;
  type: "Deposit" | "Withdrawal" | "Bonus";
  asset: string;
  amount: number;
  status: "Completed" | "Pending" | "Processing";
  date: string;
};

export type User = {
    id: string;
    name: string;
    email: string;
    balance: number;
    joinDate: string;
    walletAddress?: string;
    transactions?: Transaction[];
};

export type CryptoNewsArticle = {
  id: string;
  title: string;
  url: string;
  imageurl: string;
  body: string;
  tags: string;
  categories: string;
  published_on: number;
  source_info: {
    name: string;
    lang: string;
    img: string;
  };
  source: string;
};
