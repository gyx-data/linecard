"use server";

import { getDbPool, ensureUsersTable } from "@/lib/db";
import crypto from "crypto";

export async function loginUser(formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  if (!email || !password) {
    return { success: false, error: "Veuillez remplir tous les champs." };
  }

  try {
    const db = getDbPool();
    await ensureUsersTable(db);

    // Hasher le mot de passe pour la comparaison
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    // Rechercher l'utilisateur
    const [rows] = await db.query(
      "SELECT id, firstName, lastName, country, email FROM users WHERE email = ? AND password = ? LIMIT 1",
      [email, hashedPassword]
    ) as any[];

    if (!rows || rows.length === 0) {
      return { success: false, error: "Adresse e-mail ou mot de passe incorrect." };
    }

    const user = rows[0];

    return { 
      success: true, 
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        country: user.country,
        email: user.email
      } 
    };
  } catch (error) {
    console.error("Database login error:", error);
    return { success: false, error: "Erreur serveur lors de la connexion." };
  }
}
