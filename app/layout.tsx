import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/contexts/QueryProvider";


const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata: Metadata = {
    title: "SuperXBoss - Premium Auto Parts & Vehicle Spares Online Store",
    description: "India's trusted online destination for genuine auto parts, vehicle spares, car accessories, and motorcycle components. Premium quality parts with warranty and fast delivery.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body cz-shortcut-listen="true" className={`${outfit.className} antialiased text-gray-700`}>
                <QueryProvider>
                    {children}  
                </QueryProvider>
            </body>
        </html>
    );
}
