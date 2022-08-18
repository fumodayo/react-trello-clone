import { HttpStatusCode } from "*/utilities/constants";
import { CardService } from "*/services/card.service";

const createNew = async (req, res) => {
  try {
    const result = await CardService.createNew(req.body);
    res.status(HttpStatusCode.OK).json(result);
  } catch (error) {
    // error thì client res.status
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message,
    });
  }
};

export const CardController = { createNew };
