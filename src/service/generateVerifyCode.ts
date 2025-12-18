'dotenv/config';
import crypto from 'crypto';
import { Logger } from '../utils/Logger';

const VERIFY_CODE_CHARS = process.env.VERIFY_CODE_CHARS;

export function generateVerifyCode(): string {
    if (!VERIFY_CODE_CHARS) {
        Logger.info('VERIFY_CODE_CHARS in env is not set', 'generateVerifyCode');
        throw new Error('VERIFY_CODE_CHARS in env is not set');
    }

    let code = '';
    const bytes = crypto.randomBytes(6);

    for (let i = 0; i < 6; i++) {
        code += VERIFY_CODE_CHARS[bytes[i] % VERIFY_CODE_CHARS.length];
    }

    return code;
}
