import type { NextApiRequest, NextApiResponse } from "next";

/**
 * 
 * @param req 
 * @param res 
 * 
 * This endpoint will return success response with an object that complies
 * with OpenSea NFT standard. The object contains an image link to a giphy
 * and the name of the asset.
 * 
 * This handler can be used by making a get request to this link
 * http://localhost:3000/api/tokens/1
 * 
 * Check: https://docs.opensea.io/docs/metadata-standards
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const tokenId = req.query.id as string;

  res.status(200).json({
    image: `https://media.giphy.com/media/X7IoVUJXtO3wk/giphy.gif`,
    name: `Giphy #${tokenId}`,
  });
}

export default handler;
