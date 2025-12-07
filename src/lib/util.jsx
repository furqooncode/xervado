import { Cocobase } from "cocobase";

const db = new Cocobase({
  apiKey: import.meta.env.VITE_COCOBASE_APIKEY,
  projectId: import.meta.env.VITE_COCOBASE_PROJECT_ID,
});

export default db;

