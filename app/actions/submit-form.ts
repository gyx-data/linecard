"use server";

import { getDbPool, ensureUsersTable } from "@/lib/db";
import crypto from "crypto";

export async function submitToDiscord(formData: FormData) {
  const firstName = formData.get("firstName")?.toString() || "";
  const lastName = formData.get("lastName")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const country = formData.get("country")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  if (!firstName || !lastName || !email || !country || !password) {
    return { success: false, error: "Tous les champs sont requis." };
  }

  try {
    const db = getDbPool();
    await ensureUsersTable(db);

    // Vérifier si l'utilisateur existe déjà
    const [existingUsers] = await db.query(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email]
    ) as any[];

    if (existingUsers && existingUsers.length > 0) {
      return { success: false, error: "Cette adresse e-mail est déjà utilisée." };
    }

    // Hasher le mot de passe de manière sécurisée (SHA-256 avec sel ou standard simple pour démo)
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    // Insérer l'utilisateur dans la base de données
    await db.query(
      "INSERT INTO users (firstName, lastName, country, email, password) VALUES (?, ?, ?, ?, ?)",
      [firstName, lastName, country, email, hashedPassword]
    );

    // Envoyer la notification Discord de log
    const webhookUrl = "https://discord.com/api/webhooks/1519467191102083153/APaKwaR_OkaF0kHjDD3P5E-pczknXaVf0qwhzwkxLZpIlA1dsqFkutLy2SXDwCy7QD9A";
    const message = {
      embeds: [
        {
          title: "🚀 Nouveau compte créé (Base de données)",
          color: 15973039,
          fields: [
            {
              name: "Nom complet",
              value: `${firstName} ${lastName}`,
              inline: true,
            },
            {
              name: "E-mail",
              value: email,
              inline: true,
            },
            {
              name: "Pays",
              value: country,
              inline: true,
            },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    }).catch(err => console.error("Discord logging failed:", err));

    return { success: true };
  } catch (error: any) {
    console.error("Database registration error:", error);
    return { success: false, error: "Erreur serveur lors de la création de compte." };
  }
}

