export type Book = {
  _id: string;
  images: string[];
  available: number;
  title: string | undefined;
  category: string;
  condition: string;
  classType: string;
  subject: string;
  price: number;
  author: string;
  edition: string;
  description: string;
  finalPrice: number;
  shippingCharge: number;
  paymentMode: string;
  paymentDetails: {
    upiId?: string;

    bankDetails?: {
      accountNumber: string;

      ifscCode: string;

      bankName: string;
    };
  };
  createdAt: Date;
  seller: {
    name: string;
    contact: string;
    location:string
  };
};
