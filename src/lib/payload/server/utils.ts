import { AccessArgs } from "payload";

const isAdmin = ({ req }: AccessArgs) => {
  if (!process.env.PAYLOAD_ADMIN_EMAIL_LIST) {
    throw new Error("Missing Environment Variable: PAYLOAD_ADMIN_EMAIL_LIST");
  }

  if (!req.user?.email) return false;

  const emailList = process.env.PAYLOAD_ADMIN_EMAIL_LIST.split(",");

  if (emailList.includes(req.user.email)) {
    return true;
  }

  return false;
};

export { isAdmin };
