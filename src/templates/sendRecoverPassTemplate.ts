export const sendRecoverPassTemplate = ({ passwordResetLink }: { passwordResetLink: string }) => {
    const codeForgeLink = 'https://sunnatbakidjanov.codes/';
    const recoverPassImage = 'https://i.sunnatbakidjanov.codes/imgs/recover-pass-img.png';

    return `
        <div bgcolor="#e5e7eb" style="margin:0; padding:0; min-width:100%; background-color:#e5e7eb">
        <center style="width: 100%; table-layout: fixed; background-color: #e5e7eb; padding-top: 0px; padding-bottom: 0px;">
            <table align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation">
                <tbody>
                    <tr>
                        <td align="center" style="padding: 0px 0px 0px 0px;">
                            <table align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                <tbody>
                                    <tr>
                                        <td align="center" style="padding: 0px 0px 0px 0px;">
                                            <table bgcolor="#000000" align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation" style="color: #ffffff; font-family: Arial, Verdana, sans-serif; background-color: #000000; margin: 0; padding: 0; min-width: 300px; width: 100%; max-width: 600px;">
                                                <tbody>
                                                    <tr>
                                                        <td bgcolor="#000000" style="padding: 0px 20px; background-color: #000000;">
                                                            <table align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                                                <tbody>
                                                                    <tr>
                                                                        <td align="left" style="padding: 40px 0 0 0; text-align: center;">
                                                                            <a href="${codeForgeLink}" style="font-family: Arial, Verdana, sans-serif; text-align: center; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; font-style: normal; font-size: 36px; color: #ffffff; text-decoration: none; font-weight: bold;">
                                                                                Code<span style="color:#ff6900;">Forge</span>
                                                                            </a>
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td align="center" style="padding: 20px 20px 0px 20px;">
                                                                            <table width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                                                                <tr>
                                                                                    <td height="1" bgcolor="#e5e7eb" style="background-color:#e5e7eb; font-size:0; line-height:0;">
                                                                                        &nbsp;
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                <tbody>
                                    <tr>
                                        <td align="center" style="padding: 0px 0px 0px 0px;">
                                            <table bgcolor="#000000" align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation" style="color: #ffffff; font-family: Arial, Verdana, sans-serif; background-color: #000000; margin: 0; padding: 0; min-width: 300px; width: 100%; max-width: 600px;">
                                                <tbody>
                                                    <tr>
                                                        <td bgcolor="#000000" style="padding: 0px; background-color: #000000;">
                                                            <table align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                                                <tbody>
                                                                    <tr>
                                                                        <td align="center" style="padding: 0px 0px 0px 0px; text-align: center;">
                                                                            <img src="${recoverPassImage}" alt="CodeForge verification" width="600" height="420" style="display: block; width: 100%; max-width: 600px; height: auto; text-decoration: none;">
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                <tbody>
                                    <tr>
                                        <td align="center" style="padding: 0px 0px 0px 0px;">
                                            <table bgcolor="#18191b" align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation" style="color: #ffffff; font-family: Arial, Verdana, sans-serif; background-color: #18191b; margin: 0; padding: 0; min-width: 300px; width: 100%; max-width: 600px;">
                                                <tbody>
                                                    <tr>
                                                        <td bgcolor="#18191b" style="padding: 0px; background-color: #18191b;">
                                                            <table align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                                                <tbody>
                                                                    <tr>
                                                                        <td align="left" style="padding: 40px 15px 0 15px; text-align: center;">
                                                                            <p style="margin: 0; font-family: Arial, Verdana, sans-serif; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; font-style: normal; font-size: 26px; color: #ffffff; text-decoration: none; font-weight: bold; line-height: 24px;">Password Reset Request</p>
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td align="left" style="padding: 30px 15px 0px 15px; text-align: center;">
                                                                           <p style="margin: 0; font-family: Arial, Verdana, sans-serif; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; font-size: 16px; color: #ffffff; text-decoration: none; line-height: 24px;">
                                                                                We received a request to <span style="color: #ff6900;"></span> the password for your CodeForge account.
                                                                                <br>
                                                                                To continue, follow the link below and <span style="color: #ff6900;">reforge</span> your <span style="color: #ff6900;">password</span>
                                                                           </p>
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td align="center" style="padding: 25px 40px 0px 40px;">
                                                                            <table width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                                                                <tr>
                                                                                    <td height="1" bgcolor="#e5e7eb" style="background-color:#e5e7eb; font-size:0; line-height:0;">
                                                                                        &nbsp;
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td align="center" style="padding: 40px 0px 0px 0px;">
                                                                            <table align="center" border="0" cellspacing="0" cellpadding="0">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td align="center" width="100%" style="padding: 0px 0px 0px 0px; text-align: center;">
                                                                                            <a href="${passwordResetLink}" style="background-color: #000000; padding: 10px 60px; border: 1px solid #ff6900; border-radius: 12px; font-family:Arial, Verdana, sans-serif; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; font-style: normal; font-size:22px; color: #ffffff; text-decoration: none;">
                                                                                                Reset Password
                                                                                            </a>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td align="center" style="padding: 40px 40px 0px 40px;">
                                                                            <table width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                                                                <tr>
                                                                                    <td height="1" bgcolor="#e5e7eb" style="background-color:#e5e7eb; font-size:0; line-height:0;">
                                                                                        &nbsp;
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td align="center" style="padding: 30px 15px 40px 15px;">
                                                                            <p style="margin: 0; font-family: Arial, Verdana, sans-serif; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; font-style: normal; font-size: 16px; color: #ffffff; text-decoration: none; line-height: 24px;">
                                                                                This link is valid for <span style="color: #ff6900;">15 minutes</span>.
                                                                                <br>
                                                                                Return to the <span style="color: #ff6900;">Forge</span> and reforge your password.
                                                                           </p>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                <tbody>
                                    <tr>
                                        <td align="center" style="padding: 0px 0px 0px 0px;">
                                            <table  bgcolor="#000000" align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation" style="color: #ffffff; font-family: Arial, Verdana, sans-serif; background-color: #000000; margin: 0; padding: 0; min-width: 300px; width: 100%; max-width: 600px;">
                                                <tbody>
                                                    <tr>
                                                        <td bgcolor="#000000" style="padding: 0px; background-color: #000000;">
                                                            <table align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                                                <tr>
                                                                    <td align="left" style="padding: 50px 15px 0 15px; text-align: center;">
                                                                            <p style="margin: 0; font-family: Arial, Verdana, sans-serif; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; font-style: normal; font-size: 16px; color: #ffffff; text-decoration: none; line-height: 24px;">
                                                                                If you did <span style="color: #ff6900;">not request</span> a password reset, please <span style="color: #ff6900;">ignore</span> this email.
                                                                                For your security, <span style="color: #ff6900;">never share</span> this link with anyone.
                                                                           </p>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td align="center" style="padding: 60px 60px 0px 60px;">
                                                                        <table width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                                                            <tr>
                                                                                <td height="1" bgcolor="#e5e7eb" style="background-color:#e5e7eb; font-size:0; line-height:0;">
                                                                                    &nbsp;
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td align="leftt" style="padding: 20px 15px 50px 15px; text-align: center;">
                                                                            <p style="margin: 0; font-family: Arial, Verdana, sans-serif; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; font-style: italic; font-size: 16px; color: #ffffff; text-decoration: none; line-height: 24px;">
                                                                                © ${new Date().getFullYear()} Forge Systems — where craftsmanship meets code.
                                                                           </p>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </center>
    </div>
    `;
};
