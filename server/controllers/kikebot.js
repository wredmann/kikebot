import { google } from 'googleapis';
import dotenv from 'dotenv';
import twilio from 'twilio';
dotenv.config();

const {
    ACCOUNT_SID: accountSid,
    AUTH_TOKEN: TwilloAuthToken,
    APIKEY: googleApiKey,
    CX: cx
} = process.env;

twilio(accountSid, TwilloAuthToken)
const { MessagingResponse } = twilio.twiml;
const customsearch = google.customsearch('v1');

class KikeBot {
    /**
     * @memberof WhatsappBot
     * @param {object} req - Request sent to the route
     * @param {object} res - Response sent from the controller
     * @param {object} next - Error handler
     * @returns {object} - object representing response message
     */
    static async googleSearch(req, res, next) {
      const twiml = new MessagingResponse();
      const q = req.body.Body;
      const options = { cx, q, auth: googleApiKey };
      console.log(options)
  
      try {
        const result = await customsearch.cse.list(options);
        const firstResult = result.data.items[0];
        const searchData = firstResult.snippet;
        const link = firstResult.link;
        console.log(result);
        twiml.message(`${searchData} ${link}`);
  
        res.set('Content-Type', 'text/xml');
  
        return res.status(200).send(twiml.toString());
      } catch (error) {
        return next(error);
      }
    }
  }

  export default KikeBot;