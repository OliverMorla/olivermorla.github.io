// storage-adapter-import-placeholder

import path from "path";
import sharp from "sharp";

import { fileURLToPath } from "url";

import { buildConfig } from "payload";
import { s3Storage } from "@payloadcms/storage-s3";
// import { resendAdapter } from "@payloadcms/email-resend";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";

import { FAQ } from "./collections/FAQ";
import { Logo } from "./collections/Logo";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Images } from "./collections/Images";
import { Projects } from "./collections/Projects";
import { Services } from "./collections/Services";
import { Warranty } from "./collections/Warranty";
import { Documents } from "./collections/Documents";
import { Testimonials } from "./collections/Testimonials";
import { PrivacyPolicy } from "./collections/PrivacyPolicy";
import { TermsOfService } from "./collections/TermsOfService";
import { Certifications } from "./collections/Certifications";
import { Resume } from "./collections/Resume";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  // email: resendAdapter({
  //   defaultFromAddress: "dev@mydomain.com", // TODO: change to your domain
  //   defaultFromName: "Payload CMS",
  //   apiKey: process.env.RESEND_API_KEY || "",
  // }),
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Testimonials,
    PrivacyPolicy,
    TermsOfService,
    Projects,
    Services,
    Pages,
    Images,
    Logo,
    Warranty,
    Documents,
    FAQ,
    Certifications,
    Resume,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
    s3Storage({
      collections: {
        media: {
          prefix: "public/media/",
        },
        logo: {
          prefix: "public/logo/",
        },
        documents: {
          prefix: "public/documents/",
        },
      },
      bucket: process.env.S3_BUCKET || "",
      config: {
        forcePathStyle: true,
        region: process.env.S3_REGION || "",
        endpoint: process.env.S3_ENDPOINT || "",
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
      },
    }),
  ],
});
