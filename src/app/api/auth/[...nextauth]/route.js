import NextAuth from "next-auth";
import { authOptions } from "@/utils/authOptions";

// Exportar manejadores GET y POST
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST};
