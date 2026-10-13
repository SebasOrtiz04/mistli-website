var admin = require("firebase-admin");

const serviceAccount = {
    type:process.env.JSONADMIN_type,
    project_id:process.env.JSONADMIN_project_id,
    private_key_id:process.env.JSONADMIN_private_key_id,
    private_key:process.env.JSONADMIN_private_key?.replace(/\\n/g, "\n").trim(),
    client_email:process.env.JSONADMIN_client_email,
    client_id:process.env.JSONADMIN_client_id,
    auth_uri:process.env.JSONADMIN_auth_uri,
    token_uri:process.env.JSONADMIN_token_uri,
    auth_provider_x509_cert_url:process.env.JSONADMIN_auth_provider_x509_cert_url,
    client_x509_cert_url:process.env.JSONADMIN_client_x509_cert_url,
    universe_domain:process.env.JSONADMIN_universe_domain
};

interface TimestampLike {
  toDate?: () => Date;
}

type NewsPublicDateValue = TimestampLike | Date | string | number | null | undefined;

interface NewsPublicData {
  date?: NewsPublicDateValue;
}

interface NewsPublicItem {
  id: string;
  lastModified?: Date;
}


const app = admin.apps.length
  ? admin.app()
  : admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

const db = app.firestore();

export async function getNoticias(): Promise<NewsPublicItem[]> {
  try {
    const snap = await db.collection("newsPublic").get();
    return snap.docs.map((d: { id: string; data: () => unknown }): NewsPublicItem => {
      const data = d.data() as NewsPublicData;
      // Usa el campo de fecha que tengas: updatedAt, fecha, createdAt...
      const raw: NewsPublicData["date"] | undefined =
        data.date;
      const date: Date | undefined =
        raw && typeof raw === "object" && "toDate" in raw && typeof raw.toDate === "function"
          ? raw.toDate()
          : raw
            ? new Date(raw as Date | string | number)
            : undefined;
      return { id: d.id, lastModified: date };
    });
  } catch (e) {
    console.error("sitemap: error leyendo noticias", e);
    // return [];
      throw e;

  }
}
