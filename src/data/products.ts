export interface Review {
    id: string;
    author: string;
    rating: number;
    text: string;
}

export interface FoodItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    images?: { id: string; url: string }[];
    reviews?: Review[];
}

export const products: FoodItem[] = [
    {
        id: "1",
        name: "Special Ratlami Sev",
        description: "Our signature spicy garlic-flavored sev made with a 35-year-old secret spice blend. Perfect for tea-time or as a garnish.",
        price: 180,
        category: "Classic Sev",
        imageUrl: "/images/hero.png",
        reviews: [
            { id: "r1", author: "Rajesh K.", rating: 5, text: "Authentic taste, just like my childhood! Will buy again." },
            { id: "r2", author: "Priya S.", rating: 5, text: "Perfect spiciness and incredible crunch." },
            { id: "r3", author: "Amit M.", rating: 4, text: "Great quality sev for afternoon tea time." }
        ]
    },
    {
        id: "2",
        name: "Masala Banana Wafers",
        description: "Ultra-thin, crispy banana slices seasoned with hand-ground black pepper and rock salt. A classic guilt-free snack.",
        price: 150,
        category: "Premium Wafers",
        imageUrl: "/images/packaging.png",
        reviews: [
            { id: "r4", author: "Neha D.", rating: 5, text: "These wafers are incredibly thin and have the perfect peppery kick." },
            { id: "r5", author: "Vikram P.", rating: 4, text: "My kids absolutely love these. Very fresh packaging." }
        ]
    },
    {
        id: "3",
        name: "Nylon Khaman Mix",
        description: "Easy-to-make, fluffy and juicy Khaman Dhokla mix. Bring the authentic taste of Gujarat to your kitchen.",
        price: 120,
        category: "Specialty Mixes",
        imageUrl: "/images/quality.png",
        reviews: [
            { id: "r6", author: "Sangeeta J.", rating: 5, text: "Made this in 10 minutes and it came out super fluffy!" },
            { id: "r7", author: "Kabir R.", rating: 5, text: "As good as the fresh dhoklas from sweet shops." }
        ]
    }
];
