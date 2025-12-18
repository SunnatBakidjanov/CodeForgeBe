export const sendVerifyCodeTemplate = ({ verifyCode }: { verifyCode: string }) => {
    const codeForgeLink = 'https://sunnatbakidjanov.codes/';
    const cidEmailImg = 'https://i.sunnatbakidjanov.codes/imgs/send-code-codeforge.png';

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
                                            <table bgcolor="#000000" align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation" style="color: #ffffff; font-family: Arial, Helvetica, sans-serif; background-color: #000000; margin: 0; padding: 0; min-width: 300px; width: 100%; max-width: 600px; font-style: normal !important;">
                                                <tbody>
                                                    <tr>
                                                        <td bgcolor="#000000" style="padding: 0px 20px; background-color: #000000;">
                                                            <table align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                                                <tbody>
                                                                    <tr>
                                                                        <td align="left" style="padding: 40px 0 0 0; text-align: center;">
                                                                            <a href="${codeForgeLink}" style="font-family: Arial, Helvetica, sans-serif; text-align: center; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; font-style: normal; font-size: 36px; color: #ffffff; text-decoration: none;">
                                                                                <b>Code<span style="color:#ff6900;">Forge</span></b>
                                                                            </a>
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td align="center" style="padding: 20px 30px 0px 30px;">
                                                                            <table width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                                                                <tr>
                                                                                    <td height="2" bgcolor="#ffffff" style="background-color:#ffffff; font-size:0; line-height:0;">
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
                                            <table bgcolor="#000000" align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation" style="color: #ffffff; font-family: Arial, Helvetica, sans-serif; background-color: #000000; margin: 0; padding: 0; min-width: 300px; width: 100%; max-width: 600px;">
                                                <tbody>
                                                    <tr>
                                                        <td bgcolor="#000000" style="padding: 0 0 0 0; background-color: #000000;">
                                                            <table align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                                                <tbody>
                                                                    <tr>
                                                                        <td align="center" style="padding: 0px 0px 0px 0px; text-align: center;">
                                                                            <img src="${cidEmailImg}" alt="CodeForge verification" width="600" height="420" style="display: block; width: 100%; max-width: 600px; height: auto; text-decoration: none;">
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
                                            <table bgcolor="#1b1b1e" align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation" style="color: #ffffff; font-family: Arial, Helvetica, sans-serif; background-color: #1b1b1e; margin: 0; padding: 0; min-width: 300px; width: 100%; max-width: 600px;">
                                                <tbody>
                                                    <tr>
                                                        <td bgcolor="#1b1b1e" style="padding: 0px; background-color: #1b1b1e;">
                                                            <table align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                                                <tbody>
                                                                    <tr>
                                                                        <td align="left" style="padding: 40px 15px 0 15px; text-align: center;">
                                                                            <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; font-style: normal; font-size: 26px; color: #ffffff; text-decoration: none; font-weight: bold; line-height: 23px;">Verification needed</p>
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td align="left" style="padding: 30px 15px 0px 15px; text-align: center;">
                                                                           <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; font-style: normal; font-size: 16px; color: #ffffff; text-decoration: none; line-height: 23px;">
                                                                                We've received a request to verify your email.
                                                                                <br>
                                                                                Your verification <b><span style="color: #ff6900;">code</span></b> has been <b><span style="color: #ff6900;">forged</span></b> and is ready for use:
                                                                           </p>
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td align="center" style="padding: 40px 0px 0px 0px;">
                                                                            <table bgcolor="#000000" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0; padding: 12px 80px; background-color: #000000; text-align: center; border-radius: 6px; border: 1px solid #ff6900;">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td align="left" width="100%" style="font-family:Arial, Verdana, sans-serif; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; font-style: normal; font-size:32px; color: #ffffff;">
                                                                                            <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; font-style: normal; font-size: 26px; color: #ffffff; text-decoration: none; line-height: 23px;"><b>${verifyCode}</b></p>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>

                                                                    <tr>
                                                                        <td align="center" style="padding: 40px 15px 40px 15px;">
                                                                            <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; font-style: normal; font-size: 16px; color: #ffffff; text-decoration: none; line-height: 23px;">
                                                                                Use it within <b><span style="color: #ff6900;">15 minutes</span></b> to prove your identity.
                                                                                <br>
                                                                                The <b><span style="color: #ff6900;">Forge</span></b> awaits your action!
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
                                            <table  bgcolor="#000000" align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation" style="color: #ffffff; font-family: Arial, Helvetica, sans-serif; background-color: #000000; margin: 0; padding: 0; min-width: 300px; width: 100%; max-width: 600px;">
                                                <tbody>
                                                    <tr>
                                                        <td bgcolor="#000000" style="padding: 0px; background-color: #000000;">
                                                            <table align="center" border="0" width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                                                <tr>
                                                                    <td align="left" style="padding: 50px 15px 0 15px; text-align: center;">
                                                                            <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; font-style: normal; font-size: 16px; color: #ffffff; text-decoration: none; line-height: 23px;">
                                                                                If you did <b><span style="color: #ff6900;">not request</span></b> this code, please <b><span style="color: #ff6900;">ignore</span></b> this <b><span style="color: #ff6900;">email</span></b>.
                                                                                <br>
                                                                                For your security, <span style="color: #ff6900; font-weight: bold;">never share</span> this code with anyone.
                                                                           </p>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td align="center" style="padding: 35px 30px 0px 30px;">
                                                                        <table width="100%" cellspacing="0" cellpadding="0" role="presentation">
                                                                            <tr>
                                                                                <td height="2" bgcolor="#ffffff" style="background-color:#ffffff; font-size:0; line-height:0;">
                                                                                    &nbsp;
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td align="leftt" style="padding: 20px 15px 50px 15px; text-align: center;">
                                                                            <p style="margin: 0; font-family: Arial, Helvetica, sans-serif; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; font-style: normal; font-size: 16px; color: #ffffff; text-decoration: none; line-height: 23px;">
                                                                                <b>© Code<span style="color: #ff6900;">Forge</span> — <span style="color: #ff6900;">Crafted</span> Interfaces. <span style="color: #ff6900;">Forged</span> for Developers.</b>
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
