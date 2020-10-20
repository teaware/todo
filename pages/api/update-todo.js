import { table } from "./utils/airtable";
import auth0 from "./utils/auth0";
import ownsRecord from "./middleware/owns-record";

const handler = async (req, res) => {
  const { user } = await auth0.getSession(req);
  const { id, fields } = req.body;

  try {
    const newFields = { ...fields, userId: user.sub };
    const updatedRecord = await table.update([{ id, fields: newFields }]);
    res.statusCode = 200;
    res.json(updatedRecord);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.json({ msg: "Something went wrong" });
  }
};

export default auth0.requireAuthentication(ownsRecord(handler));
