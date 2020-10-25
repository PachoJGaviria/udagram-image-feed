import {Request, Response} from 'express';

import * as jwt from 'jsonwebtoken';
import {NextFunction} from 'connect';

import {config} from '../../../config/config';

/**
 * Verify JWT
 * @param {string} token
 * @return {Promise<object>}
 */
async function verifyJWT(token: string): Promise<object> {
  return new Promise((resolve: (value?: object) => void, reject: (reason?: any) => void) => {
    jwt.verify(token, config.jwt.secret, (err: jwt.VerifyErrors | null, decoded: object | undefined) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
}

/**
 * Middleware that check if request has valid authorization
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({message: 'No authorization headers.'});
  }

  const tokenBearer = req.headers.authorization.split(' ');
  if (tokenBearer.length != 2) {
    return res.status(401).send({message: 'Malformed token.'});
  }

  const token = tokenBearer[1];
  try {
    const decoded: any = await verifyJWT(token);
    if (decoded && decoded.email) {
      return next();
    }
    return res.status(401).send({message: 'Malformed token.'});
  } catch (err) {
    return res.status(500)
        .send({auth: false, message: 'Failed to authenticate.', details: err?.message});
  }
}
